import ccxt, { exchanges } from 'ccxt';

export const ccxtClient = (
  exchange: keyof typeof exchanges,
  apiKey: string,
  secret: string,
) => new ccxt[exchange]({ apiKey, secret });
