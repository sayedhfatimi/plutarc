import { apiKeys } from '@/lib/db/schema';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InferSelectModel } from 'drizzle-orm';

type apiKey = InferSelectModel<typeof apiKeys>;

const initialState: apiKey = {} as apiKey;

export const selectedApiKeySlice = createSlice({
  name: 'selectedApiKey',
  initialState,
  reducers: {
    setSelectedApiKey: (state: apiKey, action: PayloadAction<apiKey>) =>
      action.payload,
  },
});

export const { setSelectedApiKey } = selectedApiKeySlice.actions;
export default selectedApiKeySlice.reducer;
