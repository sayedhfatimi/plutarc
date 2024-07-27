import type { Layout } from 'react-grid-layout';

export type TUserContext = {
  userId: string;
  passphraseHash: string;
  userProfileImage: string;
  isEncrypted: boolean;
  terminal: {
    exchange: string;
    ticker: string;
  };
  terminalLayout: Layout[];
  terminalComponents: Layout[];
};
