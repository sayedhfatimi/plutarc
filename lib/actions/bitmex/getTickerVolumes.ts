'use server';
import { supportedExchanges } from '@/lib/consts/terminal/supportedExchanges';

export default async function getTickerVolumes(exchange: string) {
  const exchangeObj = supportedExchanges.filter(
    (items) => items.key === exchange,
  )[0];
  const tickerUrl = exchangeObj.restURL + exchangeObj.volumeEndpoint;

  try {
    const res = await fetch(tickerUrl).then((res) => res.json());
    return res;
  } catch (error) {
    return { error };
  }
}
