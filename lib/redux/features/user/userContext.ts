import { terminalLayout } from '@/lib/consts';
import { UserContext } from '@/types/UserContextTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Layout } from 'react-grid-layout';

const initialState: UserContext = {
  orderPanelSide: true,
  showVWAP: true,
  show24hRange: true,
  showLastPrice: true,
  showStatusBar: true,
  terminalLayout: terminalLayout,
} as UserContext;

export const userContextSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
    setUserId: (
      state: UserContext,
      action: PayloadAction<UserContext['userId']>,
    ) => {
      return { ...state, userId: action.payload };
    },
    setPassphraseHash: (
      state: UserContext,
      action: PayloadAction<UserContext['passphraseHash']>,
    ) => {
      return { ...state, passphraseHash: action.payload };
    },
    setEncryptedStatus: (
      state: UserContext,
      action: PayloadAction<UserContext['isEncrypted']>,
    ) => {
      return { ...state, isEncrypted: action.payload };
    },
    setOrderPanelSide: (
      state: UserContext,
      action: PayloadAction<UserContext['orderPanelSide']>,
    ) => {
      return { ...state, orderPanelSide: action.payload };
    },
    setShowVWAP: (
      state: UserContext,
      action: PayloadAction<UserContext['showVWAP']>,
    ) => {
      return { ...state, showVWAP: action.payload };
    },
    setShow24hRange: (
      state: UserContext,
      action: PayloadAction<UserContext['show24hRange']>,
    ) => {
      return { ...state, show24hRange: action.payload };
    },
    setShowLastPrice: (
      state: UserContext,
      action: PayloadAction<UserContext['showLastPrice']>,
    ) => {
      return { ...state, showLastPrice: action.payload };
    },
    setShowStatusBar: (
      state: UserContext,
      action: PayloadAction<UserContext['showStatusBar']>,
    ) => {
      return { ...state, showStatusBar: action.payload };
    },
    setTerminalLayout: (
      state: UserContext,
      action: PayloadAction<UserContext['terminalLayout']>,
    ) => {
      return { ...state, terminalLayout: action.payload };
    },
    removeFromTerminalLayout: (
      state: UserContext,
      action: PayloadAction<Layout>,
    ) => {
      return {
        ...state,
        terminalLayout: _.reject(state.terminalLayout, action.payload),
      };
    },
    addToTerminalLayout: (
      state: UserContext,
      action: PayloadAction<Layout>,
    ) => {
      return {
        ...state,
        terminalLayout: [...state.terminalLayout, action.payload],
      };
    },
  },
});

export const {
  setUserId,
  setPassphraseHash,
  setEncryptedStatus,
  setOrderPanelSide,
  setShowVWAP,
  setShow24hRange,
  setShowLastPrice,
  setShowStatusBar,
  setTerminalLayout,
  removeFromTerminalLayout,
  addToTerminalLayout,
} = userContextSlice.actions;
export default userContextSlice.reducer;
