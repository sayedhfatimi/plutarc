'use client';
import {
  removeFromTerminalLayout,
  setTerminalLayout,
} from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { LuX } from 'react-icons/lu';
import 'react-resizable/css/styles.css';
import Orderbook from './Orderbook';
import PositionsOrders from './PositionsOrders';
import RecentTrades from './RecentTrades';

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
      cols={{ md: 24 }}
      rowHeight={48}
      margin={[5, 5]}
      draggableCancel='.noDrag'
      draggableHandle='.drag'
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
              className='group relative border bg-white shadow-md dark:bg-slate-900'
              data-grid={item}
              gridunitheight={item.h}
            >
              <div className='drag absolute top-0 hidden w-full cursor-move justify-end border-b bg-background/50 p-1 backdrop-blur-sm group-hover:flex'>
                <LuX
                  className='noDrag animate-pulse cursor-pointer text-muted-foreground'
                  size='16'
                  onClick={() => dispatch(removeFromTerminalLayout(item))}
                />
              </div>
            </component.node>
          )),
      )}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
