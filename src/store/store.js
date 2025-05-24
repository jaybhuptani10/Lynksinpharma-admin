import { configureStore } from "@reduxjs/toolkit";

// Temporary dummy reducer to satisfy Redux requirement
const dummyReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
});
