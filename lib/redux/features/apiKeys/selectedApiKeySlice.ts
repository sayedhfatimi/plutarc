import { gfwls } from "@/lib/utils";
import { UserAPICredentials } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserAPICredentials = gfwls("selectedApiKey") || {};

export const selectedApiKeySlice = createSlice({
  name: "selectedApiKey",
  initialState,
  reducers: {
    setSelectedApiKey: (
      userApiKey: UserAPICredentials,
      action: PayloadAction<UserAPICredentials>
    ) => ({
      ...action.payload,
    }),
  },
});

export const { setSelectedApiKey } = selectedApiKeySlice.actions;
export default selectedApiKeySlice.reducer;
