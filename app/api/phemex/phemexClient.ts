import ccxt from "ccxt";

export const ccxtClient = new ccxt["phemex"]({
  apiKey: process.env.PHEMEX_ID,
  secret: process.env.PHEMEX_SECRET,
});
