import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/(auth)/authOptions';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
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
