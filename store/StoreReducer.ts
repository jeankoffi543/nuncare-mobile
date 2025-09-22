import { createSlice } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/types';

const initialState: ReduxStore = {
  position: undefined,
  subscriptionId: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setSubscriptionId: (state, action) => {
      state.subscriptionId = action.payload;
    },
  },
});

export const { setPosition, setSubscriptionId } = storeSlice.actions;
export default storeSlice.reducer;
