'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import BitMEXTickerStrip from './bitmex/BitMEXTickerStrip';

const TickerStrip = () => {
  const exchange = useAppSelector(
    (state) => state.userContext.terminal.exchange,
  );

  switch (exchange) {
    case 'bitmex': {
      return <BitMEXTickerStrip />;
    }
  }
};

export default TickerStrip;
