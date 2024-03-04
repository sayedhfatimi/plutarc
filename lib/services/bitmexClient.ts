const bitmexWs = new WebSocket('wss://ws.bitmex.com/realtime');

export interface Welcome {
  table: string;
  action: string;
  data: Datum[];
}

export interface Datum {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
  timestamp: Date;
}

export class bitmexClient {}
