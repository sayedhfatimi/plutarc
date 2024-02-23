import { NextRequest, NextResponse } from 'next/server';
import { ccxtClient } from '../../ccxtClient';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/(auth)/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const { exchange, apiKey, apiSecret } = body;

  const data = await ccxtClient(exchange, apiKey, apiSecret).fetchMyTrades();

  return NextResponse.json(data, { status: 200 });
}
