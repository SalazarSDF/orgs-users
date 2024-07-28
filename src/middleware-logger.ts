import { type Middleware } from "@reduxjs/toolkit";
import { isAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

/* ИЗ документации *(https://redux.js.org/usage/usage-with-typescript#type-checking-middleware);
 *CAUTION
 *If you are using typescript-eslint, the @typescript-eslint/ban-types rule might report an error if you use {} for the dispatch value. The recommended changes it makes are incorrect and will break your Redux store types, you should disable the rule for this line and keep using {}.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const state = store.getState();
    console.log("store STATEE???", state);
    if (action.payload) {
      console.log("action payload", action.payload);
    }
    if (isAction(action)) {
      if (!action.type) {
        return next(action);
      }

      console.log("type", action.type);
      console.log("currentState", store.getState());
    }

    next(action);

    console.log("next state: ", store.getState());
  };
export default loggerMiddleware;
