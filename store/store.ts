import { configureStore } from '@reduxjs/toolkit';
import StoreReducer from './StoreReducer';

export const store = configureStore({
  reducer: {
    store: StoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type global du store
export type AppDispatch = typeof store.dispatch;
