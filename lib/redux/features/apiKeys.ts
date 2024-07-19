import { type TAPIKeys } from '@/lib/types/APIKeys';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TAPIKeys[] = [] as TAPIKeys[];

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    addApiKey: (state: TAPIKeys[], action: PayloadAction<TAPIKeys>) => {
      return [...state, action.payload];
    },
    removeApiKey: (state: TAPIKeys[], action: PayloadAction<TAPIKeys>) => {
      return state.filter((apiKey) => apiKey.id !== action.payload.id);
    },
    initialiseState: (state: TAPIKeys[], action: PayloadAction<TAPIKeys[]>) => {
      return [...action.payload];
    },
  },
});

export const { initialiseState, addApiKey, removeApiKey } =
  apiKeysSlice.actions;
export default apiKeysSlice.reducer;
