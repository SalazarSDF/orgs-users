import { tss } from "tss-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAllOrganizations,
  fetchOrganizations,
} from "../features/organizationsSlice";
import { List, Container } from "@mui/material";
import AddUserOrOrgButtons from "../components/AddUserOrOrgButtons";
import { useAppDispatch } from "../store";
import { addUserToLs } from "../api/organizationApi";
import { useState } from "react";
import AddOrRedactModal from "../components/AddOrRedactModal";
import type { User } from "../types";
import { FormTypes } from "../types";
import EmployeeItem from "../components/EmployeeItem";

export default function CompanyEmployeesPage() {
  const { cx, classes } = useStyles();

  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const { "company-id": companyId } = useParams();
  const currentOrganization = useSelector(getAllOrganizations).find(
    (org) => org.id === companyId
  );
  if (!currentOrganization || !companyId) {
    return <h1>Ошибка! Неизвестная организация..'</h1>;
  }

  const employees = currentOrganization.users;

  const formAction = (data: Partial<User>) => {
    addUserToLs({ orgToAddId: currentOrganization.id, newUser: data });
    dispatch(fetchOrganizations());
  };

  return (
    <Container className={cx(classes.root)}>
      <AddUserOrOrgButtons
        type={FormTypes.user}
        openModalFunc={() => setShowModal(true)}
      />
      <List
        className={cx(classes.list)}
        subheader={"Организация: " + currentOrganization.name}
      >
        {employees.map((employee) => (
          <EmployeeItem
            key={employee.id}
            companyId={companyId}
            employee={employee}
          />
        ))}
      </List>
      <AddOrRedactModal
        type={FormTypes.user}
        isShown={showModal}
        closeModal={() => setShowModal(false)}
        formAction={formAction}
      />
    </Container>
  );
}

const useStyles = tss.create({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    maxHeight: "100vh",
  },
  list: {
    maxHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr) 0.5fr 0.5fr",
    gap: "20px",
    alignItems: "center",
    overflowY: "auto",
    marginTop: '20px'
  },
});
