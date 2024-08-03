import _ from 'lodash';
import type { Layout } from 'react-grid-layout';
import { createStore } from 'zustand';
import { defaultTerminalLayout } from '../consts/terminal/gridConfig';
import type { TAPIKey } from '../types/terminal/TAPIKey';
import type { TVaultActions } from '../types/terminal/TVaultActions';
import type { TVaultState } from '../types/terminal/TVaultState';

const DEFAULT_TICKER = 'XBTUSD';
const DEFAULT_EXCHANGE = 'bitmex';

export type TVault = TVaultState & TVaultActions;

export const defaultState: TVaultState = {
  APIKeys: [] as TAPIKey[],
  user: {} as TVaultState['user'],
  terminal: {
    exchange: DEFAULT_EXCHANGE,
    ticker: DEFAULT_TICKER,
    selectedKey: {} as TAPIKey,
    activeComponents: defaultTerminalLayout as Layout[],
    inactiveComponents: [] as Layout[],
  } as TVaultState['terminal'],
};

export const createVault = (initState: TVaultState = defaultState) => {
  return createStore<TVault>()((set, get) => ({
    ...initState,
    addKey: (payload: TAPIKey) =>
      set({ ...get(), APIKeys: [...get().APIKeys, payload] }),
    removeKey: (payload: TAPIKey) =>
      set({ ...get(), APIKeys: _.without(get().APIKeys, payload) }),
    replaceAPIKeysState: (payload: TAPIKey[]) =>
      set({ ...get(), APIKeys: payload }),
    setUserId: (payload: TVaultState['user']['id']) =>
      set({ ...get(), user: { ...get().user, id: payload } }),
    setPassphraseHash: (payload: TVaultState['user']['passphraseHash']) =>
      set({
        ...get(),
        user: { ...get().user, passphraseHash: payload },
      }),
    setUserProfileImage: (payload: TVaultState['user']['profileImage']) =>
      set({
        ...get(),
        user: { ...get().user, profileImage: payload },
      }),
    setEncryptedStatus: (payload: TVaultState['terminal']['isEncrypted']) =>
      set({
        ...get(),
        terminal: { ...get().terminal, isEncrypted: payload },
      }),
    setTicker: (payload: TVaultState['terminal']['ticker']) =>
      set({
        ...get(),
        terminal: { ...get().terminal, ticker: payload },
      }),
    setExchange: (payload: TVaultState['terminal']['exchange']) =>
      set({
        ...get(),
        terminal: { ...get().terminal, exchange: payload },
      }),
    setWsUrl: (payload: TVaultState['terminal']['wsUrl']) =>
      set({
        ...get(),
        terminal: { ...get().terminal, wsUrl: payload },
      }),
    setSelectedKey: (payload: TVaultState['terminal']['selectedKey']) =>
      set({
        ...get(),
        terminal: { ...get().terminal, selectedKey: payload },
      }),
    setTerminalLayout: (payload: Layout[]) =>
      set({
        ...get(),
        terminal: { ...get().terminal, activeComponents: payload },
      }),
    addComponent: (payload: Layout) =>
      set({
        ...get(),
        terminal: {
          ...get().terminal,
          activeComponents: [...get().terminal.activeComponents, payload],
          inactiveComponents: _.reject(
            get().terminal.inactiveComponents,
            (o) => o.i === payload.i,
          ),
        },
      }),
    removeComponent: (payload: Layout) =>
      set({
        ...get(),
        terminal: {
          ...get().terminal,
          activeComponents: _.reject(
            get().terminal.activeComponents,
            (o) => o.i === payload.i,
          ),
          inactiveComponents: [...get().terminal.inactiveComponents, payload],
        },
      }),
  }));
};
