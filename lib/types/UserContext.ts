import type { Layout } from 'react-grid-layout';
import type { TAPIKey } from './APIKey';

export type TUserContext = {
  user: {
    id: string;
    passphraseHash: string;
    profileImage: string;
  };
  terminal: {
    exchange: string;
    ticker: string;
    isEncrypted: boolean;
    wsUrl: string;
  };
  APIKey: TAPIKey;
  terminalLayout: Layout[];
  terminalComponents: Layout[];
};
