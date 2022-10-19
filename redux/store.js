import { configureStore } from "@reduxjs/toolkit";
import { beritaInfo } from "./actions/index";

export const store = configureStore({
  reducer: {
    data: beritaInfo.reducer,
  },
});

