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
  verticalCompact: false,
};

const Orderbook: Layout = {
  i: 'Orderbook',
  x: 1,
  y: 1,
  w: 6,
  h: 4,
  minH: 4,
  minW: 4,
  isResizable: true,
};
const RecentTrades: Layout = {
  i: 'RecentTrades',
  x: 1,
  y: 1,
  w: 10,
  h: 4,
  minH: 4,
  minW: 6,
  isResizable: true,
};
const PositionsOrders: Layout = {
  i: 'PositionsOrders',
  x: 1,
  y: 1,
  w: 2,
  h: 1,
  isResizable: true,
};

export const defaultTerminalLayout: Layout[] = [
  Orderbook,
  RecentTrades,
  PositionsOrders,
];
