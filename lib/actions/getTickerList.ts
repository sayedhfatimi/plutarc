'use server';
import { supportedExchanges } from '../consts/terminal/supportedExchanges';

export default async function getTickerList(exchange: string) {
  const tickerUrl =
    supportedExchanges.filter((items) => items.key === exchange)[0].restURL +
    supportedExchanges.filter((items) => items.key === exchange)[0]
      .tickerEndpoint;

  try {
    const res = await fetch(tickerUrl).then((res) => res.json());
    return res;
  } catch (error) {
    return { error };
  }
}
