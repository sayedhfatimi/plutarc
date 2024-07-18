import { type TapiKey } from '@/lib/types/APIKeys';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TapiKey[] = [] as TapiKey[];

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    addApiKey: (state: TapiKey[], action: PayloadAction<TapiKey>) => {
      return [...state, action.payload];
    },
    removeApiKey: (state: TapiKey[], action: PayloadAction<TapiKey>) => {
      return state.filter((apiKey) => apiKey.id !== action.payload.id);
    },
    initialiseState: (state: TapiKey[], action: PayloadAction<TapiKey[]>) => {
      return [...action.payload];
    },
  },
});

export const { initialiseState, addApiKey, removeApiKey } =
  apiKeysSlice.actions;
export default apiKeysSlice.reducer;
