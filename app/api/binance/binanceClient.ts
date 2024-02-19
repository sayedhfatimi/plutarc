import ccxt from "ccxt";

export const ccxtClient = new ccxt["binance"]({
  apiKey: process.env.BINANCE_ID,
  secret: process.env.BINANCE_SECRET,
});
