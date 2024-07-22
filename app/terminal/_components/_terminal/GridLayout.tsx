'use client';
import { GridProps } from '@/lib/consts/terminal/config';
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

  const gridChildren = useMemo(() => {
    return terminalLayout.map((item) =>
      terminalComponents
        .filter((component) => component.key === item.i)
        .map((component) => (
          <component.node
            key={item.i}
            className='group relative border bg-white shadow-md dark:bg-slate-900'
            itemh={item.h}
            itemw={item.w}
          >
            <div className='drag absolute top-0 hidden w-full cursor-move items-center justify-between border-b bg-background/50 p-1 backdrop-blur-sm group-hover:flex'>
              <span>{component.label}</span>
              <LuX
                className='noDrag animate-pulse cursor-pointer text-muted-foreground'
                size='16'
                onClick={() => dispatch(removeFromTerminalLayout(item))}
              />
            </div>
          </component.node>
        )),
    );
  }, [terminalLayout]);

  return (
    <ResponsiveGridLayout
      layouts={{
        md: terminalLayout,
      }}
      onLayoutChange={(layout) => dispatch(setTerminalLayout(layout))}
      {...GridProps}
    >
      {gridChildren}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
