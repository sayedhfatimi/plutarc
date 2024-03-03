import { auth } from '@/auth';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const apiKey = await prisma.userAPICredentials.findUnique({
    where: { id: params.id },
  });

  if (!apiKey)
    return NextResponse.json({ error: 'Key does not exist.' }, { status: 404 });

  await prisma.userAPICredentials.delete({
    where: { id: apiKey.id },
  });

  return NextResponse.json({});
}
