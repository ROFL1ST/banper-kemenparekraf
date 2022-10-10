import { configureStore } from "@reduxjs/toolkit";
import { dataInput } from "./actions/index";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, dataInput.reducer);

export const store = configureStore({
  reducer: {
    data: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);