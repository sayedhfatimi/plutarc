import { TapiKey } from '@/lib/types/APIKeys';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TapiKey = {} as TapiKey;

export const selectedApiKeySlice = createSlice({
  name: 'selectedApiKey',
  initialState,
  reducers: {
    setSelectedApiKey: (state: TapiKey, action: PayloadAction<TapiKey>) =>
      action.payload,
  },
});

export const { setSelectedApiKey } = selectedApiKeySlice.actions;
export default selectedApiKeySlice.reducer;
