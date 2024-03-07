import { UserContext } from '@/types/UserContextTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserContext = {} as UserContext;

export const userContextSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
    setUserId: (
      state: UserContext,
      action: PayloadAction<UserContext['userId']>,
    ) => {
      return { ...state, userId: action.payload };
    },
    setPassphraseHash: (
      state: UserContext,
      action: PayloadAction<UserContext['passphraseHash']>,
    ) => {
      return { ...state, passphraseHash: action.payload };
    },
    setEncryptedStatus: (
      state: UserContext,
      action: PayloadAction<UserContext['isEncrypted']>,
    ) => {
      return { ...state, isEncrypted: action.payload };
    },
  },
});

export const { setUserId, setPassphraseHash, setEncryptedStatus } =
  userContextSlice.actions;
export default userContextSlice.reducer;
