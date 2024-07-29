import { createListenerMiddleware } from "@reduxjs/toolkit";
import { deleteOrganization, deleteUser } from "./features/organizationsSlice";
// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware();
import { deleteOrganizationFromLocalStorage,deleteUserFromLocalStorage  } from "./api/organizationApi";

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: deleteOrganization,
  effect: async (action) => {
    deleteOrganizationFromLocalStorage(action.payload);
  },
});

listenerMiddleware.startListening({
  actionCreator: deleteUser,
  effect: async (action) => {
    deleteUserFromLocalStorage(action.payload);
  },
});
