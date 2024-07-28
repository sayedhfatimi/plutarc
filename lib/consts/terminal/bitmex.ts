export const TABLE_NAME_ORDERBOOK = 'orderBookL2';
export const TABLE_NAME_INSTRUMENT = 'instrument';
export const TABLE_NAME_RECENTTRADES = 'trade';
export const TABLE_NAME_POSITION = 'position';
export const TABLE_NAME_ORDER = 'order';

export const InstrumentMap: { [key: string]: string } = {
  FFWCSX: 'Perpetual',
  IFXXXP: 'Spot',
  FFCCSX: 'Futures',
};
