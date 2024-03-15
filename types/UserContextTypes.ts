export interface UserContext {
  userId: string;
  passphraseHash: string;
  isEncrypted: boolean;
  orderPanelSide: boolean;
  showVWAP: boolean;
  show24hRange: boolean;
  showLastPrice: boolean;
  showStatusBar: boolean;
}
