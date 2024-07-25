import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Organization } from "../types";
import { getOrganizationsFromLocalStorage } from "../api/organizationApi";

export const fetchOrganizations = createAsyncThunk(
  "organizations/fetchOrganizations",
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
  name: "organizations",
  initialState,
  reducers: {},
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
