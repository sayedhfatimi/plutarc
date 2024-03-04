import { createSlice } from '@reduxjs/toolkit';
import { reducers } from './reducers';

const initialState: any[] = [] as any[];

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers,
});

export const { insertItem, deleteItem, updateItems, initialiseState } =
  orderbookSlice.actions;
export default orderbookSlice.reducer;
