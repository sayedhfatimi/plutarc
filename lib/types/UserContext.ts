import { Layout } from 'react-grid-layout';

export type TUserContext = {
  userId: string;
  passphraseHash: string;
  isEncrypted: boolean;
  orderPanelSide: boolean;
  showVWAP: boolean;
  show24hRange: boolean;
  showLastPrice: boolean;
  showTickerBar: boolean;
  terminalLayout: Layout[];
  terminalComponents: Layout[];
};
