'use client';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { GridProps } from '@/lib/consts/terminal/config';
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

const GridLayout = () => {
  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );
  const selectedTicker = useAppSelector(
    (state) => state.userContext.selectedTicker,
  );
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
            className='flex flex-col border bg-white shadow-md dark:bg-slate-900'
          >
            <div className='drag flex w-full cursor-move items-center justify-between border-b bg-background/50 px-1 backdrop-blur-sm'>
              <span>{`${component.label}: ${selectedTicker}`}</span>
              <LuX
                className='noDrag cursor-pointer text-muted-foreground'
                size={ICON_SIZE_SMALL}
                onClick={() => dispatch(removeComponent(item))}
              />
            </div>
          </component.node>
        )),
    );
  }, [dispatch, selectedTicker, terminalLayout]);

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
