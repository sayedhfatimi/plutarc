import { gfwls } from '@/lib/utils';
import { UserAPICredentials } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserAPICredentials[] = gfwls('userApiCredentials') || [];

export const apiKeySlice = createSlice({
  name: 'userApiKeys',
  initialState,
  reducers: {
    addApiKey: (
      userApiKeys: UserAPICredentials[],
      action: PayloadAction<UserAPICredentials>,
    ) => {
      userApiKeys.push({
        id: action.payload.id,
        userId: action.payload.userId,
        label: action.payload.label,
        exchange: action.payload.exchange,
        apiKey: action.payload.apiKey,
        apiSecret: action.payload.apiSecret,
        createdAt: action.payload.createdAt,
      });
    },
    removeApiKey: (
      userApiKeys: UserAPICredentials[],
      action: PayloadAction<UserAPICredentials>,
    ) => {
      return userApiKeys.filter(
        (userApiKey) => userApiKey.id !== action.payload.id,
      );
    },
  },
});

export const { addApiKey, removeApiKey } = apiKeySlice.actions;
export default apiKeySlice.reducer;
