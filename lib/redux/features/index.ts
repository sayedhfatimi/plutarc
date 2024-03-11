import apiKeys from './apiKeys/apiKeys';
import selectedApiKey from './apiKeys/selectedApiKey';
import userContext from './user/userContext';

const allReducers = {
  // userContext reducer set
  userContext,
  // apiKey reducer set
  apiKeys,
  selectedApiKey,
};

export default allReducers;
