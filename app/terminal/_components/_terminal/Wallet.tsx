'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import BitMEXWallet from './bitmex/BitMEXWallet';

const Wallet = () => {
  const exchange = useAppSelector(
    (state) => state.userContext.terminal.exchange,
  );

  switch (exchange) {
    case 'bitmex': {
      return <BitMEXWallet />;
    }
  }
};

export default Wallet;
