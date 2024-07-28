import { Organization, User } from "../types";
type AppModal = {
  isShown: boolean;
  type: "add-organization" | "redact-organization" | "redact-user" | "add-user";
  organizationToRedact?: Organization;
  userToRedact?: User;
};
