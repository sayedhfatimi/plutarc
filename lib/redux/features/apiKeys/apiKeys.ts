import { UserAPIKeys } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserAPIKeys[] = [] as UserAPIKeys[];

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    addApiKey: (state: UserAPIKeys[], action: PayloadAction<UserAPIKeys>) => {
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
      state: UserAPIKeys[],
      action: PayloadAction<UserAPIKeys>,
    ) => {
      return state.filter((apiKey) => apiKey.id !== action.payload.id);
    },
    initialiseState: (
      state: UserAPIKeys[],
      action: PayloadAction<UserAPIKeys[]>,
    ) => {
      return [...action.payload];
    },
  },
});

export const { initialiseState, addApiKey, removeApiKey } =
  apiKeysSlice.actions;
export default apiKeysSlice.reducer;
