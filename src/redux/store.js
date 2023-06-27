import { configureStore } from "@reduxjs/toolkit";

import HealthReducer  from "./HealthSlice"
import { loadState, saveState } from "./localStorageMiddleware"
const preloadedState = loadState();
export const store = configureStore({
reducer:{  HealthReducer,
  },preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});

