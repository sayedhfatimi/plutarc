'use server';
import { supportedExchanges } from '@/lib/consts/terminal/supportedExchanges';

export default async function getTickerList(exchange: string) {
  const exchangeObj = supportedExchanges.filter(
    (items) => items.key === exchange,
  )[0];
  const tickerUrl = exchangeObj.restURL + exchangeObj.tickerEndpoint;

  try {
    const res = await fetch(tickerUrl).then((res) => res.json());
    return res;
  } catch (error) {
    return { error };
  }
}
