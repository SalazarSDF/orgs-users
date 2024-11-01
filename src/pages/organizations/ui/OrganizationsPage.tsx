import { OrganizationsTable } from "widgets/OrganizationsTable/ui/OrganizationsTable";
import css from "./OrganizationsPage.module.css";
import { AddOrganizationButton } from "features/organization";
export function OrganizationsPage() {
  return (
    <>
      <h1>Organizations:</h1>
      <div className={css.container}>
        <AddOrganizationButton />
        <OrganizationsTable />
      </div>
    </>
  );
}
