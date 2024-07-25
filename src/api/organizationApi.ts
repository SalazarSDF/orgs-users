import { organizations } from "./baseOrgsArr";

export async function getOrganizationsFromLocalStorage() {
  const organizationsFromLs = localStorage.getItem("organizations");
  if (organizationsFromLs) {
    return Promise.resolve(JSON.parse(organizationsFromLs));
  } else {
    localStorage.setItem("organizations", JSON.stringify(organizations));
    return Promise.resolve(organizations);
  }
}
