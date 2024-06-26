import { configureStore } from '@reduxjs/toolkit';
import allReducers from './features';

export const makeStore = () => {
  return configureStore({
    reducer: allReducers,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
