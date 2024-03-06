import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: boolean = true;

export const encryptedStatusSlice = createSlice({
  name: 'encryptedStatus',
  initialState,
  reducers: {
    setEncryptedStatus: (state: boolean, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setEncryptedStatus } = encryptedStatusSlice.actions;
export default encryptedStatusSlice.reducer;
