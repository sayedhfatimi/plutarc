import { useVault } from '@/Providers/VaultProvider';
import BitMEXWallet from './bitmex/BitMEXWallet';

const WalletContent = () => {
  const exchange = useVault((state) => state.terminal.exchange);

  switch (exchange) {
    case 'bitmex':
      return <BitMEXWallet />;
  }
};

export default WalletContent;
