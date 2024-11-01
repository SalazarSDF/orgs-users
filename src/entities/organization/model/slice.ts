import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { Organization } from "./types";
import { organizationsInitialState } from "../lib/organizationDTO";

const organizationsAdapter = createEntityAdapter<Organization>();

export const organizationsSlice = createSlice({
  name: "organizations",
  initialState: organizationsAdapter.getInitialState(
    undefined,
    organizationsInitialState
  ),
  reducers: {
    organizationAdded: organizationsAdapter.addOne,
    organizationRemoved: organizationsAdapter.removeOne,
    organizationUpdated: organizationsAdapter.updateOne,
  },
});

export const {
  selectById: selectOrganizationById,
  selectIds: selectOrganizationIds,
  // Pass in a selector that returns the posts slice of state
} = organizationsAdapter.getSelectors<RootState>(
  (state) => state.organizations
);

export const { organizationAdded, organizationRemoved, organizationUpdated } =
  organizationsSlice.actions;
