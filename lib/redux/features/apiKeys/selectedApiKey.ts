import { UserAPIKeys } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserAPIKeys = {} as UserAPIKeys;

export const selectedApiKeySlice = createSlice({
  name: 'selectedApiKey',
  initialState,
  reducers: {
    setSelectedApiKey: (
      state: UserAPIKeys,
      action: PayloadAction<UserAPIKeys>,
    ) => ({
      ...action.payload,
    }),
  },
});

export const { setSelectedApiKey } = selectedApiKeySlice.actions;
export default selectedApiKeySlice.reducer;
