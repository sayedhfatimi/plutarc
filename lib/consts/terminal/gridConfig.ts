import type { Layout } from 'react-grid-layout';
import { Chart } from './Layouts/Chart';
import { ContractInfo } from './Layouts/ContractInfo';
import { LastPrice } from './Layouts/LastPrice';
import { OrderForm } from './Layouts/OrderForm';
import { Orderbook } from './Layouts/Orderbook';
import { PositionsOrders } from './Layouts/PositionsOrders';
import { RecentTrades } from './Layouts/RecentTrades';

export const GRID_ROW_HEIGHT: number = 48;
export const GRID_COMPONENT_MARGIN: [x: number, y: number] = [4, 4];
export const GRID_COLS = { md: 24 };
export const GRID_BREAKPOINTS = { md: 996 };

export const GridProps: ReactGridLayout.ResponsiveProps &
  ReactGridLayout.WidthProviderProps = {
  className: 'layout',
  draggableCancel: '.noDrag',
  draggableHandle: '.drag',
  useCSSTransforms: true,
  rowHeight: GRID_ROW_HEIGHT,
  margin: GRID_COMPONENT_MARGIN,
  transformScale: 1,
  resizeHandles: ['se'],
  breakpoints: GRID_BREAKPOINTS,
  cols: GRID_COLS,
  isResizable: true,
  isDraggable: true,
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
