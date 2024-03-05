import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string = 'XBTUSD' as string;

export const selectedTickerSlice = createSlice({
  name: 'selectedTicker',
  initialState,
  reducers: {
    setSelectedTicker: (userApiKey: string, action: PayloadAction<string>) =>
      action.payload,
  },
});

export const { setSelectedTicker } = selectedTickerSlice.actions;
export default selectedTickerSlice.reducer;
