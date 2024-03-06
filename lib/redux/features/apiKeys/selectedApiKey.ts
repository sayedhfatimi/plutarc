import { UserAPICredentials } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserAPICredentials = {} as UserAPICredentials;

export const selectedApiKeySlice = createSlice({
  name: 'selectedApiKey',
  initialState,
  reducers: {
    setSelectedApiKey: (
      state: UserAPICredentials,
      action: PayloadAction<UserAPICredentials>,
    ) => ({
      ...action.payload,
    }),
  },
});

export const { setSelectedApiKey } = selectedApiKeySlice.actions;
export default selectedApiKeySlice.reducer;
