import type { Layout } from 'react-grid-layout';
import type { TAPIKey } from './TAPIKey';
import type { TVaultState } from './TVaultState';

export type TVaultActions = {
  addKey: (payload: TAPIKey) => void;
  removeKey: (payload: TAPIKey) => void;
  replaceAPIKeysState: (payload: TAPIKey[]) => void;
  setUserId: (payload: TVaultState['user']['id']) => void;
  setPassphraseHash: (payload: TVaultState['user']['passphraseHash']) => void;
  setUserProfileImage: (payload: TVaultState['user']['profileImage']) => void;
  setEncryptedStatus: (payload: TVaultState['terminal']['isEncrypted']) => void;
  setTicker: (payload: TVaultState['terminal']['ticker']) => void;
  setExchange: (payload: TVaultState['terminal']['exchange']) => void;
  setWsUrl: (payload: TVaultState['terminal']['wsUrl']) => void;
  setSelectedKey: (payload: TVaultState['terminal']['selectedKey']) => void;
  setTerminalLayout: (payload: Layout[]) => void;
  addComponent: (payload: Layout) => void;
  removeComponent: (payload: Layout) => void;
};
