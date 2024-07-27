import { defaultTerminalLayout } from '@/lib/consts/terminal/config';
import type { TUserContext } from '@/lib/types/UserContext';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import type { Layout } from 'react-grid-layout';

const DEFAULT_TICKER = 'XBTUSD';
const DEFAULT_EXCHANGE = 'bitmex';

const initialState: TUserContext = {
  terminal: { exchange: DEFAULT_EXCHANGE, ticker: DEFAULT_TICKER },
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
    setTicker: (
      state: TUserContext,
      action: PayloadAction<TUserContext['terminal']['ticker']>,
    ) => {
      return {
        ...state,
        terminal: { ...state.terminal, ticker: action.payload },
      };
    },
    setExchange: (
      state: TUserContext,
      action: PayloadAction<TUserContext['terminal']['exchange']>,
    ) => {
      return {
        ...state,
        terminal: { ...state.terminal, exchange: action.payload },
      };
    },
    setTerminalLayout: (
      state: TUserContext,
      action: PayloadAction<TUserContext['terminalLayout']>,
    ) => {
      return { ...state, terminalLayout: action.payload };
    },
    removeComponent: (state: TUserContext, action: PayloadAction<Layout>) => {
      return {
        ...state,
        terminalLayout: _.reject(
          state.terminalLayout,
          (o) => o.i === action.payload.i,
        ),
        terminalComponents: [...state.terminalComponents, action.payload],
      };
    },
    addComponent: (state: TUserContext, action: PayloadAction<Layout>) => {
      return {
        ...state,
        terminalLayout: [...state.terminalLayout, action.payload],
        terminalComponents: _.reject(
          state.terminalComponents,
          (o) => o.i === action.payload.i,
        ),
      };
    },
  },
});

export const {
  setUserId,
  setPassphraseHash,
  setUserProfileImage,
  setEncryptedStatus,
  setTicker,
  setExchange,
  setTerminalLayout,
  removeComponent,
  addComponent,
} = userContextSlice.actions;
export default userContextSlice.reducer;
