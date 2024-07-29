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

function App() {
  const dispatch = useAppDispatch();
  const { cx, classes } = useStyles();
  const organizations = useSelector(getAllOrganizations);
  const orgsStatus = useSelector(getOrganizationsStatus);
  const [showModal, setShowModal] = useState(false);
  if (orgsStatus === "loading") {
    return "Loading..";
  }
  function addOrgClick() {
    setShowModal(true);
  }
  function formAction(data: Partial<Organization>) {
    addOrganization(data);
    dispatch(fetchOrganizations());
  }
  return (
    <Container className={cx(classes.root)}>
      <AddUserOrOrgButtons openModalFunc={addOrgClick} type="organizations" />
      <List>
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
  },
});

export default App;
