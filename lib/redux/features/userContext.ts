import { defaultTerminalLayout } from '@/lib/consts/terminal/config';
import { TUserContext } from '@/lib/types/UserContext';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TUserContext = {
  selectedTicker: 'XBTUSD',
  showOrderbook: true,
  showRecentTrades: true,
  showPositionsOrders: true,
  showContractInfo: true,
  terminalLayout: defaultTerminalLayout,
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
    setSelectedTicker: (
      state: TUserContext,
      action: PayloadAction<TUserContext['selectedTicker']>,
    ) => {
      return { ...state, selectedTicker: action.payload };
    },
    setShowOrderbook: (
      state: TUserContext,
      action: PayloadAction<TUserContext['showOrderbook']>,
    ) => {
      return { ...state, showOrderbook: action.payload };
    },
    setShowRecentTrades: (
      state: TUserContext,
      action: PayloadAction<TUserContext['showRecentTrades']>,
    ) => {
      return { ...state, showRecentTrades: action.payload };
    },
    setShowPositionsOrders: (
      state: TUserContext,
      action: PayloadAction<TUserContext['showPositionsOrders']>,
    ) => {
      return { ...state, showPositionsOrders: action.payload };
    },
    setShowContractInfo: (
      state: TUserContext,
      action: PayloadAction<TUserContext['showContractInfo']>,
    ) => {
      return { ...state, showContractInfo: action.payload };
    },
    setTerminalLayout: (
      state: TUserContext,
      action: PayloadAction<TUserContext['terminalLayout']>,
    ) => {
      return { ...state, terminalLayout: action.payload };
    },
  },
});

export const {
  setUserId,
  setPassphraseHash,
  setUserProfileImage,
  setEncryptedStatus,
  setSelectedTicker,
  setShowOrderbook,
  setShowRecentTrades,
  setShowPositionsOrders,
  setShowContractInfo,
  setTerminalLayout,
} = userContextSlice.actions;
export default userContextSlice.reducer;
