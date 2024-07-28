import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Organization } from "../types";
import { getOrganizationsFromLocalStorage } from "../api/organizationApi";

export const fetchOrganizations = createAsyncThunk(
  "app/fetchOrganizations",
  async () => {
    try {
      const response: Organization[] = await getOrganizationsFromLocalStorage();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

type InitialState = {
  status: "idle" | "loading" | "succeeded";
  organizations: Organization[];
  error: null;
};

const initialState: InitialState = {
  status: "idle",
  organizations: [],
  error: null,
};

const organizationsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    deleteOrganization(state, action: PayloadAction<Organization["id"]>) {
      const orgIdToDelete = action.payload;
      state.organizations = state.organizations.filter(
        (org) => org.id !== orgIdToDelete
      );
    },
    deleteUser(state, action) {
      const { userIdToDelete, organizationId } = action.payload;
      const orgWithUser = state.organizations.find(
        (org) => org.id === organizationId
      );
      if (orgWithUser && orgWithUser.users) {
        orgWithUser.users = orgWithUser.users.filter(
          (user) => user.id !== userIdToDelete
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.organizations = action.payload;
        }
      });
  },
});

export default organizationsSlice;

export const { deleteOrganization, deleteUser } = organizationsSlice.actions;

export const getAllOrganizations = ({
  organizations,
}: {
  organizations: InitialState;
}) => {
  return organizations.organizations;
};

export const getOrganizationsStatus = ({
  organizations,
}: {
  organizations: InitialState;
}) => organizations.status;
