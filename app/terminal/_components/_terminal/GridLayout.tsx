'use client';
import {
  removeFromTerminalLayout,
  setTerminalLayout,
} from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { LuX } from 'react-icons/lu';
import 'react-resizable/css/styles.css';
import Orderbook from './Orderbook';
import PositionsOrders from './PositionsOrders';
import RecentTrades from './RecentTrades';
import { useMemo } from 'react';

const GridLayout = () => {
  const dispatch = useAppDispatch();
  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

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

  return (
    <ResponsiveGridLayout
      className='layout'
      layouts={{
        md: terminalLayout,
      }}
      resizeHandles={['se']}
      useCSSTransforms
      transformScale={1}
      breakpoints={{ md: 996 }}
      cols={{ md: 50 }}
      rowHeight={5}
      margin={[5, 5]}
      draggableCancel='.noDrag'
      isResizable
      isDraggable
      onLayoutChange={(layout) => dispatch(setTerminalLayout(layout))}
    >
      {terminalLayout.map((item) =>
        terminalComponents
          .filter((component) => component.key === item.i)
          .map((component) => (
            <component.node
              key={item.i}
              className='group relative overflow-hidden border bg-white shadow-md dark:bg-slate-900'
              data-grid={item}
            >
              <div
                className='noDrag absolute right-1 top-1 size-4 animate-pulse cursor-pointer bg-slate-200 dark:bg-transparent md:hidden md:group-hover:block'
                onClick={() => dispatch(removeFromTerminalLayout(item))}
              >
                <LuX size='16' />
              </div>
            </component.node>
          )),
      )}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
