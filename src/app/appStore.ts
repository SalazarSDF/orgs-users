import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { organizationsSlice } from "entities/organization/model/slice";
//import loggerMiddleware from "./middleware-logger";

const rootReducer = combineReducers({
  organizations: organizationsSlice.reducer,
});

export const appStore = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof appStore.dispatch;
