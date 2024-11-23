import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sample from "./sample";
import samplePersist from "./sample-persist";

export const rootReducer = combineReducers({
  common: sample,
  samplePersist: persistReducer(
    {
      key: "sample-persist",
      version: 1,
      storage,
    },
    samplePersist
  ),
});

export default rootReducer;
