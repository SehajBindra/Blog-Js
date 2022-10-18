import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import postReducer from "../slices/postSlice";
import thunk from "redux-thunk";
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
  storage,
};

const rootReducers = combineReducers({ user: userReducer, post: postReducer });

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
