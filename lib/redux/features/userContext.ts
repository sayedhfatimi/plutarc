import { defaultTerminalLayout } from '@/lib/consts/terminal/gridConfig';
import type { TAPIKey } from '@/lib/types/APIKey';
import type { TUserContext } from '@/lib/types/UserContext';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import type { Layout } from 'react-grid-layout';

const DEFAULT_TICKER = 'XBTUSD';
const DEFAULT_EXCHANGE = 'bitmex';

const initialState: TUserContext = {
  APIKey: {} as TAPIKey,
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
      action: PayloadAction<TUserContext['user']['id']>,
    ) => {
      return { ...state, user: { ...state.user, id: action.payload } };
    },
    setPassphraseHash: (
      state: TUserContext,
      action: PayloadAction<TUserContext['user']['passphraseHash']>,
    ) => {
      return {
        ...state,
        user: { ...state.user, passphraseHash: action.payload },
      };
    },
    setUserProfileImage: (
      state: TUserContext,
      action: PayloadAction<TUserContext['user']['profileImage']>,
    ) => {
      return {
        ...state,
        user: { ...state.user, profileImage: action.payload },
      };
    },
    setEncryptedStatus: (
      state: TUserContext,
      action: PayloadAction<TUserContext['terminal']['isEncrypted']>,
    ) => {
      return {
        ...state,
        terminal: { ...state.terminal, isEncrypted: action.payload },
      };
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
    setWsUrl: (
      state: TUserContext,
      action: PayloadAction<TUserContext['terminal']['wsUrl']>,
    ) => {
      return {
        ...state,
        terminal: { ...state.terminal, wsUrl: action.payload },
      };
    },
    setAPIKey: (
      state: TUserContext,
      action: PayloadAction<TUserContext['APIKey']>,
    ) => {
      return { ...state, APIKey: action.payload };
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
  setWsUrl,
  setAPIKey,
  setTerminalLayout,
  removeComponent,
  addComponent,
} = userContextSlice.actions;
export default userContextSlice.reducer;
