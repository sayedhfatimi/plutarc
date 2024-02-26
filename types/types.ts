import { createAPISchema } from '@/schemas/createAPISchema';
import { Fee } from 'ccxt';
import { z } from 'zod';

export type UserAPICredential = z.infer<typeof createAPISchema>;

export interface thTrade {
  info: {
    createdAt: Date;
    symbol: string;
    currency: string;
    action: number;
    tradeType: number;
    execQtyRq: number;
    execPriceRp: number;
    side: number;
    orderQtyRq: number;
    priceRp: number;
    execValueRv: number;
    feeRateRr: number;
    execFeeRv: number;
    ordType: number;
    execId: string;
    execStatus: number;
    posSide: number;
    ptFeeRv: number;
    ptPriceRp: number;
  };
  id: string;
  symbol: string;
  timestamp: number;
  datetime: string;
  type: string;
  side: string;
  price: number;
  amount: number;
  cost: number;
  fee: Fee;
  fees: Fee[];
}

export interface BalancesData {
  currency: string;
  balanceEv: number;
  lockedTradingBalanceEv: number;
  lockedWithdrawEv: number;
  lastUpdateTimeNs: string;
  walletVid: number;
}

export interface BalanceData {
  info: {
    code: number;
    msg: string;
    data: BalancesData[];
  };
}
