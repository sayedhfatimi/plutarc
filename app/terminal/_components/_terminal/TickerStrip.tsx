'use client';
import { useVault } from '@/Providers/VaultProvider';
import BitMEXTickerStrip from './bitmex/BitMEXTickerStrip';

const TickerStrip = () => {
  const exchange = useVault((state) => state.terminal.exchange);

  switch (exchange) {
    case 'bitmex': {
      return <BitMEXTickerStrip />;
    }
  }
};

export default TickerStrip;
