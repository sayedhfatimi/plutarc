import type { Layout } from 'react-grid-layout';
import type { TAPIKey } from './TAPIKey';

export type TVaultState = {
  APIKeys: TAPIKey[];
  user: {
    id: string | undefined;
    passphraseHash: string | undefined;
    profileImage: string | undefined;
  };
  terminal: {
    exchange: string;
    ticker: string;
    isEncrypted: boolean;
    wsUrl: string;
    selectedKey: TAPIKey;
    activeComponents: Layout[];
    inactiveComponents: Layout[];
  };
};
