import { deepmergeCustom } from 'deepmerge-ts';
import _ from 'lodash';
import type { Layout } from 'react-grid-layout';
import { createStore } from 'zustand';
import { type PersistStorage, persist } from 'zustand/middleware';
import deleteVaultState from '../actions/deleteVaultState';
import getVaultState from '../actions/getVaultState';
import setVaultState from '../actions/setVaultState';
import { defaultTerminalLayout } from '../consts/terminal/gridConfig';
import type { TAPIKey } from '../types/terminal/TAPIKey';
import type { TVaultActions } from '../types/terminal/TVaultActions';
import type { TVaultState } from '../types/terminal/TVaultState';

const DEFAULT_TICKER = 'XBTUSD';
const DEFAULT_EXCHANGE = 'bitmex';

export type TVault = TVaultState & TVaultActions;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const storage: PersistStorage<DeepPartial<TVaultState>> = {
  getItem: async (name) => await getVaultState(name),
  setItem: async (name, value) => {
    await setVaultState(name, value);
  },
  removeItem: async (name) => {
    await deleteVaultState(name);
  },
};

export const defaultInitState: TVaultState = {
  eAPIKeys: [] as TAPIKey[],
  dAPIKeys: [] as TAPIKey[],
  user: {} as TVaultState['user'],
  terminal: {
    exchange: DEFAULT_EXCHANGE,
    ticker: DEFAULT_TICKER,
    selectedKey: {} as TAPIKey,
    activeComponents: defaultTerminalLayout as Layout[],
    inactiveComponents: [] as Layout[],
  } as TVaultState['terminal'],
};

export const createVault = (
  userId: string,
  initState: TVaultState = defaultInitState,
) => {
  return createStore<TVault>()(
    persist(
      (set, get) => ({
        ...initState,
        addKey: (encryptedPayload: TAPIKey, decryptedPayload: TAPIKey) =>
          set({
            ...get(),
            eAPIKeys: [...get().eAPIKeys, encryptedPayload],
            dAPIKeys: [...get().dAPIKeys, decryptedPayload],
          }),
        removeKey: (payload: TAPIKey) =>
          set({
            ...get(),
            eAPIKeys: _.without(get().eAPIKeys, payload),
            dAPIKeys: _.reject(get().dAPIKeys, (o) => o.id === payload.id),
          }),
        replaceDAPIKeysState: (payload: TAPIKey[]) =>
          set({ ...get(), dAPIKeys: payload }),
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
        resetTerminalLayout: (payload: Layout[]) =>
          set({
            ...get(),
            terminal: {
              ...get().terminal,
              activeComponents: payload,
              inactiveComponents: [],
            },
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
              inactiveComponents: [
                ...get().terminal.inactiveComponents,
                payload,
              ],
            },
          }),
      }),
      {
        name: `vault:${userId}`,
        storage,
        partialize: (state) => ({
          eAPIKeys: state.eAPIKeys,
          user: state.user,
          terminal: _.pick(state.terminal, [
            'exchange',
            'ticker',
            'activeComponents',
            'inactiveComponents',
          ]),
        }),
        merge: (persistedState, currentState) =>
          deepmerge(persistedState, currentState),
      },
    ),
  );
};

const deepmerge = deepmergeCustom({ mergeArrays: (a) => a[0] });
