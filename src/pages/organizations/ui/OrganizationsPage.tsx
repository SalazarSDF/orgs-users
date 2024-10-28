import { OrganizationsTable } from "widgets/OrganizationsTable/ui/OrganizationsTable";
import css from "./OrganizationsPage.module.css";
export function OrganizationsPage() {
  return (
    <>
      <h1>Organizations:</h1>
      <div className={css.container}>
        <OrganizationsTable />
      </div>
    </>
  );
}
