import { Layout } from 'react-grid-layout';

export type TUserContext = {
  userId: string;
  passphraseHash: string;
  userProfileImage: string;
  isEncrypted: boolean;
  selectedTicker: string;
  terminalLayout: Layout[];
  terminalComponents: Layout[];
};
