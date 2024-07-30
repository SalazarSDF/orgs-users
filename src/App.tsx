import { tss } from "tss-react";
import { Container, List } from "@mui/material";
import OrganizationItem from "./components/OrganizationItem";
import AddUserOrOrgButtons from "./components/AddUserOrOrgButtons";
import AddOrRedactModal from "./components/AddOrRedactModal";
import { useSelector } from "react-redux";
import {
  getAllOrganizations,
  getOrganizationsStatus,
  fetchOrganizations,
} from "./features/organizationsSlice";
import { useState } from "react";
import { useAppDispatch } from "./store";
import { addOrganization } from "./api/organizationApi";
import { Organization } from "./types";

export default function App() {
  const { cx, classes } = useStyles();

  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const organizations = useSelector(getAllOrganizations);
  const orgsStatus = useSelector(getOrganizationsStatus);

  if (orgsStatus === "loading") {
    return "Loading..";
  }

  const formAction = (data: Partial<Organization>) =>  {
    addOrganization(data);
    dispatch(fetchOrganizations());
  }
  return (
    <Container className={cx(classes.root)}>
      <AddUserOrOrgButtons
        openModalFunc={() => setShowModal(true)}
        type="organizations"
      />
      <List className={cx(classes.list)}>
        <div>Название</div>
        <div>Тип</div>
        <div>Адрес</div>
        <div>Ссылка</div>
        <div className={cx(classes.listCenter)}>Редактировать</div>
        <div className={cx(classes.listCenter)}>Удалить</div>
        {organizations.map((org) => (
          <OrganizationItem key={org.id} org={org} />
        ))}
      </List>
      <AddOrRedactModal
        type="organization"
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
  listCenter: {
    justifySelf: "center",
  },
});
