import { Layout } from 'react-grid-layout';

export type TUserContext = {
  userId: string;
  passphraseHash: string;
  userProfileImage: string;
  isEncrypted: boolean;
  showOrderbook: boolean;
  showRecentTrades: boolean;
  showPositionsOrders: boolean;
  showContractInfo: boolean;
  selectedTicker: string;
  terminalLayout: Layout[];
};
