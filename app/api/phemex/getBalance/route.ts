import { NextRequest, NextResponse } from "next/server";
import { ccxtClient } from "../phemexClient";

export async function GET(request: NextRequest) {
  const data = await ccxtClient.fetchBalance();

  return NextResponse.json(data, { status: 200 });
}
