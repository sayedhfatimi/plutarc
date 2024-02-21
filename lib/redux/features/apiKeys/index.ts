import apiKeysSlice from "./apiKeysSlice";
import selectedApiKeySlice from "./selectedApiKeySlice";
import { combineReducers } from "@reduxjs/toolkit";

const allReducers = combineReducers({
  apiKeys: apiKeysSlice,
  selectedApiKey: selectedApiKeySlice,
});

export default allReducers;
