import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string = 'XBTUSD' as string;

export const BitmexSelectedTickerSlice = createSlice({
  name: 'BitmexSelectedTicker',
  initialState,
  reducers: {
    setSelectedTicker: (state: string, action: PayloadAction<string>) =>
      action.payload,
  },
});

export const { setSelectedTicker } = BitmexSelectedTickerSlice.actions;
export default BitmexSelectedTickerSlice.reducer;
