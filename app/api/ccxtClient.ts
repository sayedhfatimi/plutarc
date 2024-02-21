import ccxt from "ccxt";

export const ccxtClient = (exchange: string, apiKey: string, secret: string) =>
  new ccxt[exchange]({ apiKey, secret });
