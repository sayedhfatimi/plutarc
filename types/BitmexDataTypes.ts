// Generic WebSocket Response
export interface BitmexWebSocketResponse<T> {
  table: string;
  action: string;
  data: T[];
}

// orderBookL2_25 types
export interface orderBookL2_25 {
  table: string;
  action: string;
  data: orderBookL2_25_Data[];
}

export interface orderBookL2_25_Data {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
  timestamp: string;
}

// recent trades types
export interface RecentTrades {
  table: string;
  action: string;
  keys: any[];
  types: {
    timestamp: string;
    symbol: string;
    side: string;
    size: string;
    price: string;
    tickDirection: string;
    trdMatchID: string;
    grossValue: string;
    homeNotional: string;
    foreignNotional: string;
    trdType: string;
  };
  filter: { symbol: string };
  data: RecentTrades_Data[];
}

export interface RecentTrades_Data {
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
}

export interface Instrument {
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
  lastTickDirection: string;
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
}
