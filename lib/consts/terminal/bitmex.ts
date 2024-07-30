export const TABLE_NAME_ORDERBOOK = 'orderBookL2';
export const TABLE_NAME_INSTRUMENT = 'instrument';
export const TABLE_NAME_RECENTTRADES = 'trade';
export const TABLE_NAME_POSITION = 'position';
export const TABLE_NAME_ORDER = 'order';
export const TABLE_NAME_WALLET = 'wallet';

export const InstrumentMap: { [key: string]: string } = {
  FFWCSX: 'Perpetual',
  IFXXXP: 'Spot',
  FFCCSX: 'Futures',
};

export const symbolSignificantFiguresMap: { [key: string]: number } = {
  xbt: 8,
  bmex: 6,
  gwei: 9,
  trx: 8,
  usdt: 6,
  sol: 8,
  matic: 8,
};
