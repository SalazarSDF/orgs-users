import cn from "classnames";
import {
  selectOrganizationIds,
  selectOrganizationById,
} from "entities/organization/model/slice";
import { useSelector } from "react-redux";
import { useAppSelector } from "shared/model/hooks";
//import { DeleteOrganizationButton } from "features/organization/ui/DeleteOrganizationButton";
import { DeleteOrganizationButton } from "features/organization";
import css from "./OrganizationTable.module.css";
import { UpdateOrganizationButton } from "features/organization";

function OrganizationsTableRow({ orgId }: { orgId: Id }) {
  const { name, type, address, link } = useAppSelector((state) =>
    selectOrganizationById(state, orgId)
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>{address}</td>
      <td>{link}</td>
      <td>
        X
      </td>
      <td>
        <DeleteOrganizationButton organizationToDeleteId={orgId} />
      </td>
    </tr>
  );
}

export function OrganizationsTable() {
  const organizationIds = useSelector(selectOrganizationIds);
  const headers = [
    "Название",
    "Тип",
    "Адрес",
    "Ссылка",
    "Редактировать",
    "Удалить",
  ];
  return (
    <table className={cn(css.table)}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {organizationIds.map((orgId) => (
          <OrganizationsTableRow key={orgId} orgId={orgId} />
        ))}
      </tbody>
    </table>
  );
}
