import apiKeys from './apiKeys/apiKeys';
import encryptedStatus from './apiKeys/encryptedStatus';
import selectedApiKey from './apiKeys/selectedApiKey';
import BitmexSelectedTicker from './bitmex/BitmexSelectedTicker';

const allReducers = {
  // apiKey reducer set
  apiKeys,
  selectedApiKey,
  encryptedStatus,
  // Bitmex reducer set
  BitmexSelectedTicker,
};

export default allReducers;
