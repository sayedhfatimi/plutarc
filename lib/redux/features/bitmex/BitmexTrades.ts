import { createSlice } from '@reduxjs/toolkit';
import { reducers } from './reducers';

const initialState: any[] = [] as any[];

export const BitmexTradesSlice = createSlice({
  name: 'BitmexTrades',
  initialState,
  reducers,
});

export const { insertItem, deleteItem, updateItems, initialiseState } =
  BitmexTradesSlice.actions;
export default BitmexTradesSlice.reducer;
