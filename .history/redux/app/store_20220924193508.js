import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import postReducer from "../slices/postSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const rootReducers = combineReducers({ user: userReducer, post: postReducer });
const reducer = storage.reducer(
  combineReducers({ user: userReducer, post: postReducer })
);
const engine = createEngineLocalStorage("my-save-key");
const storageMiddleware = storage.createMiddleware(engine);
// const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware.concat(storageMiddleware),
});

export const persistor = persistStore(store);
