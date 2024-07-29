import oneinch from '@/public/images/cryptoIcons/1inch.svg';
import aave from '@/public/images/cryptoIcons/aave.svg';
import avax from '@/public/images/cryptoIcons/avax.svg';
import bmex from '@/public/images/cryptoIcons/bmex.svg';
import bnb from '@/public/images/cryptoIcons/bnb.svg';
import btc from '@/public/images/cryptoIcons/btc.svg';
import eth from '@/public/images/cryptoIcons/eth.svg';
import ltc from '@/public/images/cryptoIcons/ltc.svg';
import sol from '@/public/images/cryptoIcons/sol.svg';
import trx from '@/public/images/cryptoIcons/trx.svg';
import usdt from '@/public/images/cryptoIcons/usdt.svg';
import type { StaticImageData } from 'next/image';

export const CryptoIconMap: { [key: string]: StaticImageData } = {
  xbt: btc,
  btc: btc,
  gwei: eth,
  eth: eth,
  usdt: usdt,
  trx: trx,
  bmex: bmex,
  aave: aave,
  avax: avax,
  '1inch': oneinch,
  bnb: bnb,
  ltc: ltc,
  sol: sol,
};
