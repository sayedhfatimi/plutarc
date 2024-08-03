'use client';
import { useVault } from '@/Providers/VaultProvider';
import { GridProps } from '@/lib/consts/terminal/gridConfig';
import { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
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
  const terminalLayout = useVault((state) => state.terminal.activeComponents);
  const setTerminalLayout = useVault((state) => state.setTerminalLayout);

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
            data-grid={item}
          />
        )),
    );
  }, [terminalLayout]);

  return (
    <>
      <WebsocketConnector />
      <ResponsiveGridLayout
        layouts={{
          md: terminalLayout,
        }}
        onLayoutChange={(layout) => setTerminalLayout(layout)}
        {...GridProps}
      >
        {gridChildren}
      </ResponsiveGridLayout>
    </>
  );
};

export default GridLayout;
