import { UserAPICredentials } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserAPICredentials[] = [] as UserAPICredentials[];

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    addApiKey: (
      state: UserAPICredentials[],
      action: PayloadAction<UserAPICredentials>,
    ) => {
      return [
        ...state,
        {
          id: action.payload.id,
          userId: action.payload.userId,
          label: action.payload.label,
          exchange: action.payload.exchange,
          apiKey: action.payload.apiKey,
          apiSecret: action.payload.apiSecret,
        },
      ];
    },
    removeApiKey: (
      state: UserAPICredentials[],
      action: PayloadAction<UserAPICredentials>,
    ) => {
      return state.filter((apiKey) => apiKey.id !== action.payload.id);
    },
    initialiseState: (
      state: UserAPICredentials[],
      action: PayloadAction<UserAPICredentials[]>,
    ) => {
      return [...action.payload];
    },
  },
});

export const { initialiseState, addApiKey, removeApiKey } =
  apiKeysSlice.actions;
export default apiKeysSlice.reducer;
