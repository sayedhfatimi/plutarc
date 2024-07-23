import { defaultTerminalLayout } from '@/lib/consts/terminal/config';
import { TUserContext } from '@/lib/types/UserContext';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Layout } from 'react-grid-layout';

const initialState: TUserContext = {
  showVWAP: true,
  show24hRange: true,
  showLastPrice: true,
  selectedTicker: 'XBTUSD',
  terminalLayout: defaultTerminalLayout,
  terminalComponents: [] as Layout[],
} as TUserContext;

export const userContextSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
    setUserId: (
      state: TUserContext,
      action: PayloadAction<TUserContext['userId']>,
    ) => {
      return { ...state, userId: action.payload };
    },
    setPassphraseHash: (
      state: TUserContext,
      action: PayloadAction<TUserContext['passphraseHash']>,
    ) => {
      return { ...state, passphraseHash: action.payload };
    },
    setUserProfileImage: (
      state: TUserContext,
      action: PayloadAction<TUserContext['userProfileImage']>,
    ) => {
      return { ...state, userProfileImage: action.payload };
    },
    setEncryptedStatus: (
      state: TUserContext,
      action: PayloadAction<TUserContext['isEncrypted']>,
    ) => {
      return { ...state, isEncrypted: action.payload };
    },
    setShowVWAP: (
      state: TUserContext,
      action: PayloadAction<TUserContext['showVWAP']>,
    ) => {
      return { ...state, showVWAP: action.payload };
    },
    setShow24hRange: (
      state: TUserContext,
      action: PayloadAction<TUserContext['show24hRange']>,
    ) => {
      return { ...state, show24hRange: action.payload };
    },
    setShowLastPrice: (
      state: TUserContext,
      action: PayloadAction<TUserContext['showLastPrice']>,
    ) => {
      return { ...state, showLastPrice: action.payload };
    },
    setSelectedTicker: (
      state: TUserContext,
      action: PayloadAction<TUserContext['selectedTicker']>,
    ) => {
      return { ...state, selectedTicker: action.payload };
    },
    setTerminalLayout: (
      state: TUserContext,
      action: PayloadAction<TUserContext['terminalLayout']>,
    ) => {
      return { ...state, terminalLayout: action.payload };
    },
    removeFromTerminalLayout: (
      state: TUserContext,
      action: PayloadAction<Layout>,
    ) => {
      return {
        ...state,
        terminalLayout: _.reject(state.terminalLayout, action.payload),
        terminalComponents: [...state.terminalComponents, action.payload],
      };
    },
    addToTerminalLayout: (
      state: TUserContext,
      action: PayloadAction<Layout>,
    ) => {
      return {
        ...state,
        terminalLayout: [...state.terminalLayout, action.payload],
        terminalComponents: _.reject(state.terminalComponents, action.payload),
      };
    },
  },
});

export const {
  setUserId,
  setPassphraseHash,
  setUserProfileImage,
  setEncryptedStatus,
  setShowVWAP,
  setShow24hRange,
  setShowLastPrice,
  setSelectedTicker,
  setTerminalLayout,
  removeFromTerminalLayout,
  addToTerminalLayout,
} = userContextSlice.actions;
export default userContextSlice.reducer;
