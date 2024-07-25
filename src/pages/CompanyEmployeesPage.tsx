import { tss } from "tss-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllOrganizations } from "../model/organizationsModel";
import {
  List,
  Container,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserOrOrgButtons from "../components/AddUserOrOrgButtons";

export default function CompanyEmployeesPage() {
  let { "company-id": companyId } = useParams();
  const { cx, classes } = useStyles();
  companyId = companyId ?? "";
  const currentOrganization = useSelector(getAllOrganizations).filter(
    (org) => org.id === companyId
  )[0];
  const employees = currentOrganization.users;

  return (
    <Container className={cx(classes.root)}>
      <AddUserOrOrgButtons type="users" />
      <List
        className={cx(classes.list)}
        subheader={"Организация: " + currentOrganization.name}
      >
        {employees.map((employee) => {
          const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
          return (
            <ListItem key={employee.id}>
              <List>
                <ListItemText primary={name} secondary={employee.middleName} />
                <ListItemText secondary={employee.Email} />
              </List>
              <IconButton>
                <BuildIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
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
    maxHeight: "100vh",
  },
  list: {
    maxHeight: "100vh",
    overflow: "scroll",
  },
});
