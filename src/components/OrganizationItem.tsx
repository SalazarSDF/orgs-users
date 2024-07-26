import {
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Organization } from "../types";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "../store";
import { deleteOrganization } from "../model/organizationsModel";
import { deleteOrganizationFromLocalStorage } from "../api/organizationApi";

export default function OrganizationItem({ org }: { org: Organization }) {
  const { id, name, type, address, link } = org;
  const dispatch = useAppDispatch();
  function deleteOrganizationClick() {
    dispatch(deleteOrganization(id));
    deleteOrganizationFromLocalStorage(id);
  }
  return (
    <ListItem>
      <ListItemButton component={RouterLink} to={`company-employees/${id}`}>
        <List>
          <ListItemText primary={name} secondary={type} />
          <ListItemText secondary={address} />
        </List>
      </ListItemButton>
      <Link href={`https://${link}`} target="_blank" underline="hover">
        {link}
      </Link>
      <IconButton>
        <BuildIcon />
      </IconButton>
      <IconButton onClick={deleteOrganizationClick}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
