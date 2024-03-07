import apiKeys from './apiKeys/apiKeys';
import selectedApiKey from './apiKeys/selectedApiKey';
import BitmexSelectedTicker from './bitmex/BitmexSelectedTicker';
import userContext from './user/userContext';

const allReducers = {
  // userContext reducer set
  userContext,
  // apiKey reducer set
  apiKeys,
  selectedApiKey,
  // Bitmex reducer set
  BitmexSelectedTicker,
};

export default allReducers;
