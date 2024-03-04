import apiKeysSlice from './apiKeys/apiKeysSlice';
import selectedApiKeySlice from './apiKeys/selectedApiKeySlice';
import orderbookSlice from './bitmex/orderbook';
import tradesSlice from './bitmex/trades';

const allReducers = {
  apiKeys: apiKeysSlice,
  selectedApiKey: selectedApiKeySlice,
  orderbook: orderbookSlice,
  trades: tradesSlice,
};

export default allReducers;
