export const terminalLayout = [
  {
    i: 'Orderbook',
    x: 42,
    y: Infinity,
    w: 18,
    h: 18,
    isResizable: false,
    isBounded: true,
  },
  {
    i: 'RecentTrades',
    x: 42,
    y: Infinity,
    w: 18,
    h: 18,
    isResizable: false,
    isBounded: true,
  },
  //   {
  //     i: 'PositionsOrders',
  //     x: 0,
  //     y: Infinity,
  //     w: 50,
  //     h: 20,
  //     isResizable: false,
  //     isBounded: true,
  //   },
];

export const exchangeOptions: {
  key: string;
  value: string;
  text: string;
}[] = [
  { key: 'phemex', value: 'PHEMEX', text: 'Phemex' },
  { key: 'binance', value: 'BINANCE', text: 'Binance' },
  { key: 'bitmex', value: 'BITMEX', text: 'BitMex' },
];
