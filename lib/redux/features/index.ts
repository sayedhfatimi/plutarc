import orderbookSlice from './orderbook/orderbook';
import apiKeysSlice from './apiKeys/apiKeysSlice';
import selectedApiKeySlice from './apiKeys/selectedApiKeySlice';
import { combineReducers } from '@reduxjs/toolkit';

const allReducers = combineReducers({
  apiKeys: apiKeysSlice,
  selectedApiKey: selectedApiKeySlice,
  orderbook: orderbookSlice,
});

export default allReducers;
