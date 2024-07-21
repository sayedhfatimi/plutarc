'use client';
import {
  removeFromTerminalLayout,
  setTerminalLayout,
} from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { LuX } from 'react-icons/lu';
import 'react-resizable/css/styles.css';
import Orderbook from './Orderbook';
import PositionsOrders from './PositionsOrders';
import RecentTrades from './RecentTrades';

const ResponsiveGridLayout = WidthProvider(Responsive);

const terminalComponents = [
  {
    key: 'Orderbook',
    label: 'Orderbook',
    node: Orderbook,
  },
  {
    key: 'RecentTrades',
    label: 'Recent Trades',
    node: RecentTrades,
  },
  {
    key: 'PositionsOrders',
    label: 'Positions & Orders',
    node: PositionsOrders,
  },
];

const GridLayout = () => {
  const dispatch = useAppDispatch();
  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );

  return (
    <ResponsiveGridLayout
      className='layout'
      layouts={{
        md: terminalLayout,
      }}
      resizeHandles={['se']}
      useCSSTransforms={true}
      breakpoints={{ md: 996 }}
      cols={{ md: 50 }}
      rowHeight={5}
      margin={[5, 5]}
      draggableCancel='.noDrag'
      onLayoutChange={(layout) => dispatch(setTerminalLayout(layout))}
    >
      {terminalLayout.map((item) => (
        <div
          key={item.i}
          className='group relative overflow-hidden border bg-white shadow-md dark:bg-slate-900'
        >
          <div
            className='noDrag absolute right-1 top-1 z-50 size-4 animate-pulse cursor-pointer bg-slate-200 dark:bg-transparent md:hidden md:group-hover:block'
            onClick={() => dispatch(removeFromTerminalLayout(item))}
          >
            <LuX size='16' />
          </div>
          {terminalComponents
            .filter((component) => component.key === item.i)
            .map((child) =>
              React.createElement(child.node, {
                key: child.key,
              }),
            )}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
