import type { TAPIKeys } from '@/lib/types/APIKeys';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TAPIKeys = {} as TAPIKeys;

export const selectedApiKeySlice = createSlice({
  name: 'selectedApiKey',
  initialState,
  reducers: {
    setSelectedApiKey: (state: TAPIKeys, action: PayloadAction<TAPIKeys>) =>
      action.payload,
  },
});

export const { setSelectedApiKey } = selectedApiKeySlice.actions;
export default selectedApiKeySlice.reducer;
