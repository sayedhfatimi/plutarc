import { auth } from '@/lib/auth/auth';
import { NextRequest, NextResponse } from 'next/server';
import { ccxtClient } from '../../ccxtClient';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const { exchange, apiKey, apiSecret } = body;

  const data = await ccxtClient(exchange, apiKey, apiSecret).fetchBalance();

  return NextResponse.json(data, { status: 200 });
}
