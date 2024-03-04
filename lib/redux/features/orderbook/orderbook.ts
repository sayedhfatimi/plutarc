import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: any[] = [] as any[];

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    insertOrderbook: (state: any[], action: PayloadAction<any>) => {
      return [...state, ...action.payload];
    },
    deleteOrderbook: (state: any[], action: PayloadAction<any[]>) => {
      let stateData = [...state];

      for (let i = 0; i < action.payload.length; i++) {
        const criteria = _.pick(action.payload[i], 'id');
        const itemToRemove = _.find(stateData, criteria);

        if (itemToRemove) {
          stateData = _.without(stateData, itemToRemove);
        }
      }

      return stateData;
    },
    updateOrderbook: (state: any[], action: PayloadAction<any[]>) => {
      let stateData = [...state];

      for (let i = 0; i < action.payload.length; i++) {
        let payloadObj = action.payload[i];

        const criteria = _.pick(payloadObj, 'id');
        const itemToUpdate = _.find(stateData, criteria);

        if (itemToUpdate) {
          payloadObj = updateItem(itemToUpdate, payloadObj);
          stateData[stateData.indexOf(itemToUpdate)] = payloadObj;
        }
      }

      return stateData;
    },
    initialiseState: (state: any[], action: PayloadAction<any[]>) => {
      return action.payload;
    },
  },
});

function updateItem(item: any, newData: any) {
  return { ...item, ...newData };
}

export const {
  insertOrderbook,
  deleteOrderbook,
  updateOrderbook,
  initialiseState,
} = orderbookSlice.actions;
export default orderbookSlice.reducer;
