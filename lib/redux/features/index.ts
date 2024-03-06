import apiKeys from './apiKeys/apiKeys';
import encryptedStatus from './apiKeys/encryptedStatus';
import selectedApiKey from './apiKeys/selectedApiKey';
import BitmexOrderbook from './bitmex/BitmexOrderbook';
import BitmexSelectedTicker from './bitmex/BitmexSelectedTicker';
import BitmexTrades from './bitmex/BitmexTrades';

const allReducers = {
  // apiKey reducer set
  apiKeys,
  selectedApiKey,
  encryptedStatus,
  // Bitmex reducer set
  BitmexOrderbook,
  BitmexTrades,
  BitmexSelectedTicker,
};

export default allReducers;
