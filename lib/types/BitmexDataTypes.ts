// Generic WebSocket Response
export type TBitmexWebSocketResponse<T> = {
  table: string;
  action: 'partial' | 'update' | 'insert' | 'delete';
  data: T[];
  keys?: string[];
  types?: { [key: string]: string };
  filter?: { account?: number; symbol?: string };
};

// orderBookL2_25 types
export type TorderBookL2 = {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
  timestamp: string;
  transactTime: string;
};

export type TorderBookL2_25 = TorderBookL2;

// recent trades types
export type TRecentTrades = {
  timestamp: string;
  symbol: string;
  side: string;
  size: number;
  price: number;
  tickDirection: string;
  trdMatchID: string;
  grossValue: number;
  homeNotional: number;
  foreignNotional: number;
  trdType: string;
};

export type TInstrument = {
  symbol: string;
  rootSymbol: string;
  state: string;
  typ: string;
  listing: string;
  front: string;
  expiry: string;
  settle: string;
  listedSettle: string;
  positionCurrency: string;
  underlying: string;
  quoteCurrency: string;
  underlyingSymbol: string;
  reference: string;
  referenceSymbol: string;
  calcInterval: string;
  publishInterval: string;
  publishTime: string;
  maxOrderQty: number;
  maxPrice: number;
  lotSize: number;
  tickSize: number;
  multiplier: number;
  settlCurrency: string;
  underlyingToPositionMultiplier: number;
  underlyingToSettleMultiplier: number;
  quoteToSettleMultiplier: number;
  isQuanto: boolean;
  isInverse: boolean;
  initMargin: number;
  maintMargin: number;
  riskLimit: number;
  riskStep: number;
  limit: number;
  taxed: boolean;
  deleverage: boolean;
  makerFee: number;
  takerFee: number;
  settlementFee: number;
  fundingBaseSymbol: string;
  fundingQuoteSymbol: string;
  fundingPremiumSymbol: string;
  fundingTimestamp: string;
  fundingInterval: string;
  fundingRate: number;
  indicativeFundingRate: number;
  rebalanceTimestamp: string;
  rebalanceInterval: string;
  prevClosePrice: number;
  limitDownPrice: number;
  limitUpPrice: number;
  totalVolume: number;
  volume: number;
  volume24h: number;
  prevTotalTurnover: number;
  totalTurnover: number;
  turnover: number;
  turnover24h: number;
  homeNotional24h: number;
  foreignNotional24h: number;
  prevPrice24h: number;
  vwap: number;
  highPrice: number;
  lowPrice: number;
  lastPrice: number;
  lastPriceProtected: number;
  lastTickDirection:
    | 'PlusTick'
    | 'ZeroPlusTick'
    | 'MinusTick'
    | 'ZeroMinusTick';
  lastChangePcnt: number;
  bidPrice: number;
  midPrice: number;
  askPrice: number;
  impactBidPrice: number;
  impactMidPrice: number;
  impactAskPrice: number;
  hasLiquidity: boolean;
  openInterest: number;
  openValue: number;
  fairMethod: string;
  fairBasisRate: number;
  fairBasis: number;
  fairPrice: number;
  markMethod: string;
  markPrice: number;
  indicativeSettlePrice: number;
  settledPriceAdjustmentRate: number;
  settledPrice: number;
  instantPnl: boolean;
  minTick: number;
  timestamp: string;
};

export type TPosition = {
  account: number;
  symbol: string;
  currency: string;
  underlying: string;
  quoteCurrency: string;
  commission: number;
  initMarginReq: number;
  maintMarginReq: number;
  riskLimit: number;
  leverage: number;
  crossMargin: boolean;
  deleveragePercentile: number;
  rebalancedPnl: number;
  prevRealisedPnl: number;
  prevUnrealisedPnl: number;
  openingQty: number;
  openOrderBuyQty: number;
  openOrderBuyCost: number;
  openOrderBuyPremium: number;
  openOrderSellQty: number;
  openOrderSellCost: number;
  openOrderSellPremium: number;
  currentQty: number;
  currentCost: number;
  currentComm: number;
  realisedCost: number;
  unrealisedCost: number;
  grossOpenPremium: number;
  isOpen: boolean;
  markPrice: number;
  markValue: number;
  riskValue: number;
  homeNotional: number;
  foreignNotional: number;
  posState: string;
  posCost: number;
  posCross: number;
  posComm: number;
  posLoss: number;
  posMargin: number;
  posMaint: number;
  posInit: number;
  initMargin: number;
  maintMargin: number;
  realisedPnl: number;
  unrealisedPnl: number;
  unrealisedPnlPcnt: number;
  unrealisedRoePcnt: number;
  avgCostPrice: number;
  avgEntryPrice: number;
  breakEvenPrice: number;
  marginCallPrice: number;
  liquidationPrice: number;
  bankruptPrice: number;
  timestamp: string;
};

export type TWallet = {
  account: number;
  currency: string;
  deposited: number;
  withdrawn: number;
  transferIn: number;
  transferOut: number;
  amount: number;
  pendingCredit: number;
  pendingDebit: number;
  confirmedDebit: number;
  timestamp: string;
};
