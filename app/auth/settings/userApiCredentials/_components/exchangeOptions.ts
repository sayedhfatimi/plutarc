import { Exchange } from '@prisma/client';

export const exchangeOptions: {
  key: string;
  value: keyof typeof Exchange;
  text: string;
}[] = [
  { key: 'phemex', value: 'PHEMEX', text: 'Phemex' },
  { key: 'binance', value: 'BINANCE', text: 'Binance' },
  { key: 'bitmex', value: 'BITMEX', text: 'BitMex' },
];
