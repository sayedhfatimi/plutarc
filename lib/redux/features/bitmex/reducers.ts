import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

const storeMaxLength = 100;

export const reducers = {
  insertItem: (state: any[], action: PayloadAction<any[]>) => {
    let stateData = [...state, ...action.payload];
    if (stateData.length > storeMaxLength) {
      stateData.splice(0, stateData.length - storeMaxLength);
    }
    return stateData;
  },
  deleteItem: (state: any[], action: PayloadAction<any[]>) => {
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
  updateItems: (state: any[], action: PayloadAction<any[]>) => {
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
};

function updateItem(item: any, newData: any) {
  return { ...item, ...newData };
}
