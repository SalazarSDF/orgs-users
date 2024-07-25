import { tss } from "tss-react";
import { Container, List } from "@mui/material";
import OrganizationItem from "./components/OrganizationItem";
import AddUserOrOrgButtons from "./components/AddUserOrOrgButtons";
import { useSelector } from "react-redux";
import {
  getAllOrganizations,
  getOrganizationsStatus,
} from "./model/organizationsModel";

function App() {
  const { cx, classes } = useStyles();
  const organizations = useSelector(getAllOrganizations);
  const orgsStatus = useSelector(getOrganizationsStatus);
  if(orgsStatus === 'loading'){
    return 'Loading..';
  }
  return (
    <Container className={cx(classes.root)}>
      <AddUserOrOrgButtons type="organizations" />
      <List>
        {organizations.map((org) => (
          <OrganizationItem key={org.id} org={org} />
        ))}
      </List>
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
