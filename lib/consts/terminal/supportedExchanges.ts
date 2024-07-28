import binanceIcon from '@/public/images/exchangeIcons/binance.png';
import bitmexIcon from '@/public/images/exchangeIcons/bitmex.png';
import coinbaseIcon from '@/public/images/exchangeIcons/coinbase.png';
import phemexIcon from '@/public/images/exchangeIcons/phemex.png';
import type { StaticImageData } from 'next/image';

export const SUPPORTED_EXCHANGES: {
  key: string;
  value: string;
  text: string;
  icon: StaticImageData;
  restURL: string;
  tickerEndpoint?: string;
  volumeEndpoint?: string;
}[] = [
  {
    key: 'binance',
    value: 'BINANCE',
    text: 'Binance',
    icon: binanceIcon,
    restURL: 'https://api.binance.com',
    tickerEndpoint: '/api/v3/ticker',
  },
  {
    key: 'bitmex',
    value: 'BITMEX',
    text: 'BitMex',
    icon: bitmexIcon,
    restURL: 'https://www.bitmex.com/api/v1',
    tickerEndpoint: '/instrument/active',
    volumeEndpoint: '/instrument/usdVolume',
  },
  {
    key: 'coinbase',
    value: 'COINBASE',
    text: 'Coinbase',
    icon: coinbaseIcon,
    restURL: 'https://api.coinbase.com/api/v3/brokerage',
  },
  {
    key: 'phemex',
    value: 'PHEMEX',
    text: 'Phemex',
    icon: phemexIcon,
    restURL: 'https://api.phemex.com',
    tickerEndpoint: '/public/products',
  },
];
