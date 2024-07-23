'use client';
import { GridProps } from '@/lib/consts/terminal/config';
import {
  setShowContractInfo,
  setShowOrderbook,
  setShowPositionsOrders,
  setShowRecentTrades,
  setTerminalLayout,
} from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { LuX } from 'react-icons/lu';
import 'react-resizable/css/styles.css';
import ContractInfo from './ContractInfo';
import Orderbook from './Orderbook';
import PositionsOrders from './PositionsOrders';
import RecentTrades from './RecentTrades';

const GridLayout = () => {
  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );
  const showOrderbook = useAppSelector(
    (state) => state.userContext.showOrderbook,
  );
  const showRecentTrades = useAppSelector(
    (state) => state.userContext.showRecentTrades,
  );
  const showPositionsOrders = useAppSelector(
    (state) => state.userContext.showPositionsOrders,
  );
  const showContractInfo = useAppSelector(
    (state) => state.userContext.showContractInfo,
  );
  const dispatch = useAppDispatch();

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const gridChildren = useMemo(() => {
    const terminalComponents = [
      {
        key: 'Orderbook',
        label: 'Orderbook',
        node: Orderbook,
        show: showOrderbook,
        dispatch: setShowOrderbook,
      },
      {
        key: 'RecentTrades',
        label: 'Recent Trades',
        node: RecentTrades,
        show: showRecentTrades,
        dispatch: setShowRecentTrades,
      },
      {
        key: 'PositionsOrders',
        label: 'Positions & Orders',
        node: PositionsOrders,
        show: showPositionsOrders,
        dispatch: setShowPositionsOrders,
      },
      {
        key: 'ContractInfo',
        label: 'Contract Information',
        node: ContractInfo,
        show: showContractInfo,
        dispatch: setShowContractInfo,
      },
    ];

    return terminalLayout.map((item) =>
      terminalComponents
        .filter((component) => component.show)
        .filter((component) => component.key === item.i)
        .map((component) => (
          <component.node
            key={item.i}
            className='flex flex-col border bg-white shadow-md dark:bg-slate-900'
          >
            <div className='drag flex w-full cursor-move items-center justify-between border-b bg-background/50 px-1 backdrop-blur-sm'>
              <span>{component.label}</span>
              <LuX
                className='noDrag cursor-pointer text-muted-foreground'
                size='16'
                onClick={() => dispatch(component.dispatch(false))}
              />
            </div>
          </component.node>
        )),
    );
  }, [
    dispatch,
    showContractInfo,
    showOrderbook,
    showPositionsOrders,
    showRecentTrades,
    terminalLayout,
  ]);

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
