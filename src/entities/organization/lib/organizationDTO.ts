import { Organization } from "../model/types";
import organizationsJson from "../model/organizations.json";

function mapOrganizationsDto(organizations: Organization[]) {
  return organizations;
}

export const organizationsInitialState = mapOrganizationsDto(organizationsJson);
