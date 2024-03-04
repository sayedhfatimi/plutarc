import { createSlice } from '@reduxjs/toolkit';
import { reducers } from './reducers';

const initialState: any[] = [] as any[];

export const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers,
});

export const { insertItem, deleteItem, updateItems, initialiseState } =
  tradesSlice.actions;
export default tradesSlice.reducer;
