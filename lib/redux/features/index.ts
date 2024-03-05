import apiKeys from './apiKeys/apiKeys';
import selectedApiKey from './apiKeys/selectedApiKey';
import orderbook from './bitmex/orderbook';
import selectedTicker from './bitmex/selectedTicker';
import trades from './bitmex/trades';

const allReducers = {
  apiKeys,
  selectedApiKey,
  orderbook,
  trades,
  selectedTicker,
};

export default allReducers;
