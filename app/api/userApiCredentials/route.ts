import { createAPISchema } from "@/schemas/createAPISchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = createAPISchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { userId, label, exchange, apiKey, apiSecret } = body;

  const newApi = await prisma.userAPICredentials.create({
    data: {
      userId,
      label,
      exchange,
      apiKey,
      apiSecret,
    },
  });

  return NextResponse.json(newApi, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const apiKeys = await prisma.userAPICredentials.findMany({
    where: { userId: session!.user!.id },
  });

  return NextResponse.json(apiKeys, { status: 200 });
}
