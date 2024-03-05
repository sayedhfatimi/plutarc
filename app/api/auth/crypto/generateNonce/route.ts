import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { publicAddress } = body;

  const nonce = crypto.randomBytes(32).toString('hex');

  // Set the expiry of the nonce to 1 hour
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

  // Create or update the nonce for the given user
  await prisma.user.upsert({
    where: { publicAddress },
    create: {
      publicAddress,
      cryptoLoginNonce: {
        create: {
          nonce,
          expires,
        },
      },
    },
    update: {
      cryptoLoginNonce: {
        upsert: {
          create: {
            nonce,
            expires,
          },
          update: {
            nonce,
            expires,
          },
        },
      },
    },
  });

  const data = {
    nonce,
    expires: expires.toISOString(),
  };

  return NextResponse.json(data, { status: 200 });
}
