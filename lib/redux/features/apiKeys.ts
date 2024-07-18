import { apiKeys } from '@/lib/db/schema';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type InferSelectModel } from 'drizzle-orm';

type apiKey = InferSelectModel<typeof apiKeys>;

const initialState: apiKey[] = [] as apiKey[];

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    addApiKey: (state: apiKey[], action: PayloadAction<apiKey>) => {
      return [...state, action.payload];
    },
    removeApiKey: (state: apiKey[], action: PayloadAction<apiKey>) => {
      return state.filter((apiKey) => apiKey.id !== action.payload.id);
    },
    initialiseState: (state: apiKey[], action: PayloadAction<apiKey[]>) => {
      return [...action.payload];
    },
  },
});

export const { initialiseState, addApiKey, removeApiKey } =
  apiKeysSlice.actions;
export default apiKeysSlice.reducer;
