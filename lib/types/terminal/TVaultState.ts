import type { Layout } from 'react-grid-layout';
import type { TAPIKey } from './TAPIKey';

export type TVaultState = {
  eAPIKeys: TAPIKey[];
  dAPIKeys: TAPIKey[];
  user: {
    id: string | undefined;
    passphraseHash: string | undefined;
    profileImage: string | undefined;
  };
  terminal: {
    wsUrl: string;
    exchange: string;
    ticker: string;
    selectedKey: TAPIKey;
    activeComponents: Layout[];
    inactiveComponents: Layout[];
  };
};
