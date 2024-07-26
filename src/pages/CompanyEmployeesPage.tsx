import { tss } from "tss-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAllOrganizations,
  fetchOrganizations,
} from "../model/organizationsModel";
import {
  List,
  Container,
} from "@mui/material";
import AddUserOrOrgButtons from "../components/AddUserOrOrgButtons";
import { useAppDispatch } from "../store";
import {
  addUserToLs,
} from "../api/organizationApi";
import { useState } from "react";
import AddOrRedactModal from "../components/AddOrRedactModal";
import type { User } from "../types";
import EmployeeItem from "../components/EmployeeItem";

export default function CompanyEmployeesPage() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  let { "company-id": companyId } = useParams();
  const { cx, classes } = useStyles();
  companyId = companyId ?? "";

  const currentOrganization = useSelector(getAllOrganizations).filter(
    (org) => org.id === companyId
  )[0];
  const employees = currentOrganization.users;


  function formAction(data: Partial<User>) {
    addUserToLs({ orgToAddId: currentOrganization.id, newUser: data });
    dispatch(fetchOrganizations());
  }

  return (
    <Container className={cx(classes.root)}>
      <AddUserOrOrgButtons
        type="users"
        openModalFunc={() => setShowModal(true)}
      />
      <List
        className={cx(classes.list)}
        subheader={"Организация: " + currentOrganization.name}
      >
        {employees.map((employee) => (
          <EmployeeItem key={employee.id} companyId={companyId } employee={employee} />
        ))}
      </List>
      <AddOrRedactModal
        type="add-user"
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
    overflow: "scroll",
  },
});
