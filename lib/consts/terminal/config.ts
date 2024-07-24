import { type Layout } from 'react-grid-layout';

export const gridRowHeight: number = 48;
export const gridComponentMargin: [x: number, y: number] = [4, 4];
export const gridCols = { md: 24 };
export const gridBreakpoints = { md: 996 };

export const GridProps: ReactGridLayout.ResponsiveProps &
  ReactGridLayout.WidthProviderProps = {
  className: 'layout',
  draggableCancel: '.noDrag',
  draggableHandle: '.drag',
  useCSSTransforms: true,
  rowHeight: gridRowHeight,
  margin: gridComponentMargin,
  transformScale: 1,
  resizeHandles: ['se'],
  breakpoints: gridBreakpoints,
  cols: gridCols,
  isResizable: true,
  isDraggable: true,
};
const Chart: Layout = {
  i: 'Chart',
  x: 0,
  y: 0,
  w: 12,
  h: 12,
  minH: 4,
  minW: 4,
  isResizable: true,
  isBounded: true,
};
const Orderbook: Layout = {
  i: 'Orderbook',
  x: 12,
  y: 2,
  w: 6,
  h: 10,
  minH: 4,
  minW: 4,
  isResizable: true,
  isBounded: true,
};
const RecentTrades: Layout = {
  i: 'Recent Trades',
  x: 12,
  y: 12,
  w: 6,
  h: 4,
  minH: 4,
  minW: 6,
  isResizable: true,
  isBounded: true,
};
const PositionsOrders: Layout = {
  i: 'Positions & Orders',
  x: 0,
  y: 12,
  w: 12,
  h: 4,
  isResizable: true,
  isBounded: true,
};
const ContractInfo: Layout = {
  i: 'Contract Information',
  x: 15,
  y: 0,
  w: 3,
  h: 2,
  isResizable: false,
  isBounded: true,
};
const LastPrice: Layout = {
  i: 'Last Price',
  x: 12,
  y: 0,
  w: 3,
  h: 2,
  isResizable: false,
  isBounded: true,
};
const OrderForm: Layout = {
  i: 'Order Form',
  x: 18,
  y: 0,
  w: 6,
  h: 16,
  isResizable: false,
  isBounded: true,
};

export const defaultTerminalLayout: Layout[] = [
  Chart,
  Orderbook,
  RecentTrades,
  PositionsOrders,
  ContractInfo,
  LastPrice,
  OrderForm,
];
