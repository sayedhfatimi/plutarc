import { configureStore } from '@reduxjs/toolkit';
import reducers from './features';

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
