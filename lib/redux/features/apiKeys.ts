import type { TAPIKey } from '@/lib/types/APIKey';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TAPIKey[] = [] as TAPIKey[];

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    addApiKey: (state: TAPIKey[], action: PayloadAction<TAPIKey>) => {
      return [...state, action.payload];
    },
    removeApiKey: (state: TAPIKey[], action: PayloadAction<TAPIKey>) => {
      return state.filter((apiKey) => apiKey.id !== action.payload.id);
    },
    initialiseState: (state: TAPIKey[], action: PayloadAction<TAPIKey[]>) => {
      return [...action.payload];
    },
  },
});

export const { initialiseState, addApiKey, removeApiKey } =
  apiKeysSlice.actions;
export default apiKeysSlice.reducer;
