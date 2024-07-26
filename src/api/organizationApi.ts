import { Organization, User } from "../types";
import { organizations } from "./baseOrgsArr";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function getOrganizationsFromLocalStorage() {
  const organizationsFromLs = localStorage.getItem("organizations");
  if (organizationsFromLs) {
    return Promise.resolve(JSON.parse(organizationsFromLs));
  } else {
    localStorage.setItem("organizations", JSON.stringify(organizations));
    return Promise.resolve(organizations);
  }
}

export function deleteOrganizationFromLocalStorage(orgIdToDelete: string) {
  const organizationsFromLs = localStorage.getItem("organizations");

  if (organizationsFromLs) {
    const orgsArr = JSON.parse(organizationsFromLs) as Organization[];
    const filteredOrgs = orgsArr.filter((org) => org.id !== orgIdToDelete);
    localStorage.setItem("organizations", JSON.stringify(filteredOrgs));
  }
}

type DeleteUserFromLocalStorage = {
  userIdToDelete: string;
  organizationId: string | undefined;
};
export function deleteUserFromLocalStorage({
  userIdToDelete,
  organizationId,
}: DeleteUserFromLocalStorage) {
  const organizationsFromLs = localStorage.getItem("organizations");
  if (!organizationId || !organizationsFromLs) return;
  const orgsArr = JSON.parse(organizationsFromLs) as Organization[];
  const orgWithUser = orgsArr.find((org) => org.id === organizationId);
  if (orgWithUser && orgWithUser.users) {
    const newUsers = orgWithUser.users.filter(
      (user) => user.id !== userIdToDelete
    );
    orgWithUser.users = newUsers;
  }
  localStorage.setItem("organizations", JSON.stringify(orgsArr));
}

export function addOrganization(newOrg: Partial<Organization>) {
  const organizationsFromLs = localStorage.getItem("organizations");
  const newOrgToAdd = { ...newOrg, id: uuidv4(), users: [] } as Organization;
  if (organizationsFromLs) {
    const orgsArr = JSON.parse(organizationsFromLs) as Organization[];
    orgsArr.push(newOrgToAdd);

    localStorage.setItem("organizations", JSON.stringify(orgsArr));
  }
}

type AddUserToLs = {
  orgToAddId: string;
  newUser: Partial<User>;
};
export function addUserToLs({ orgToAddId, newUser }: AddUserToLs) {
  const organizationsFromLs = localStorage.getItem("organizations");
  if (!organizationsFromLs) return;
  const orgsArr = JSON.parse(organizationsFromLs) as Organization[];
  const orgWithUser = orgsArr.find((org) => org.id === orgToAddId);
  if (orgWithUser && orgWithUser.users) {
    newUser.id = uuidv4();
    orgWithUser.users.push(newUser as User);
  }
  localStorage.setItem("organizations", JSON.stringify(orgsArr));
}
