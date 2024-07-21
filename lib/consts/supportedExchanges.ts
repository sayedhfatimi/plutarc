import binanceIcon from '@/public/images/exchangeIcons/binance.png';
import bitmexIcon from '@/public/images/exchangeIcons/bitmex.png';
import coinbaseIcon from '@/public/images/exchangeIcons/coinbase.png';
import phemexIcon from '@/public/images/exchangeIcons/phemex.png';
import { StaticImageData } from 'next/image';

export const supportedExchanges: {
  key: string;
  value: string;
  text: string;
  icon: StaticImageData;
}[] = [
  { key: 'binance', value: 'BINANCE', text: 'Binance', icon: binanceIcon },
  { key: 'bitmex', value: 'BITMEX', text: 'BitMex', icon: bitmexIcon },
  { key: 'coinbase', value: 'COINBASE', text: 'Coinbase', icon: coinbaseIcon },
  { key: 'phemex', value: 'PHEMEX', text: 'Phemex', icon: phemexIcon },
];
