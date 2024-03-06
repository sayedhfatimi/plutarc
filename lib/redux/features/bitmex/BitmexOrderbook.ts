import { createSlice } from '@reduxjs/toolkit';
import { reducers } from './reducers';

const initialState: any[] = [] as any[];

export const BitmexOrderbookSlice = createSlice({
  name: 'BitmexOrderbook',
  initialState,
  reducers,
});

export const { insertItem, deleteItem, updateItems, initialiseState } =
  BitmexOrderbookSlice.actions;
export default BitmexOrderbookSlice.reducer;
