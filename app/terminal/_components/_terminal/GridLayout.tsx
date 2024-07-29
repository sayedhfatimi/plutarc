'use client';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { GridProps } from '@/lib/consts/terminal/gridConfig';
import {
  removeComponent,
  setTerminalLayout,
} from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { LuX } from 'react-icons/lu';
import 'react-resizable/css/styles.css';
import Chart from './Chart';
import ContractInfo from './ContractInfo';
import LastPrice from './LastPrice';
import OrderForm from './OrderForm';
import Orderbook from './Orderbook';
import PositionsOrders from './PositionsOrders';
import RecentTrades from './RecentTrades';
import WebsocketConnector from './WebsocketConnector';

const GridLayout = () => {
  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );
  const ticker = useAppSelector((state) => state.userContext.terminal.ticker);
  const dispatch = useAppDispatch();

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const gridChildren = useMemo(() => {
    const terminalComponents = [
      { label: 'Chart', node: Chart },
      { label: 'Order Form', node: OrderForm },
      { label: 'Orderbook', node: Orderbook },
      { label: 'Recent Trades', node: RecentTrades },
      { label: 'Positions & Orders', node: PositionsOrders },
      { label: 'Contract Information', node: ContractInfo },
      { label: 'Last Price', node: LastPrice },
    ];

    return terminalLayout.map((item) =>
      terminalComponents
        .filter((component) => component.label === item.i)
        .map((component) => (
          <component.node
            key={item.i}
            className='flex select-none flex-col border bg-white shadow-md dark:bg-slate-900'
          >
            <div className='drag flex w-full cursor-move items-center justify-between border-b bg-slate-200 px-1 backdrop-blur-sm dark:bg-background/50'>
              <span>{`${component.label}: ${ticker}`}</span>
              <LuX
                className='noDrag cursor-pointer text-muted-foreground hover:bg-background dark:hover:bg-slate-700'
                size={ICON_SIZE_SMALL}
                onClick={() => dispatch(removeComponent(item))}
              />
            </div>
          </component.node>
        )),
    );
  }, [dispatch, ticker, terminalLayout]);

  return (
    <>
      <WebsocketConnector />
      <ResponsiveGridLayout
        layouts={{
          md: terminalLayout,
        }}
        onLayoutChange={(layout) => dispatch(setTerminalLayout(layout))}
        {...GridProps}
      >
        {gridChildren}
      </ResponsiveGridLayout>
    </>
  );
};

export default GridLayout;
