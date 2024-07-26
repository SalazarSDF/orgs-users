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
import {
  deleteOrganization,
  fetchOrganizations,
} from "../model/organizationsModel";
import { deleteOrganizationFromLocalStorage, updateOrganization } from "../api/organizationApi";
import AddOrRedactModal from "./AddOrRedactModal";
import { useState } from "react";

export default function OrganizationItem({ org }: { org: Organization }) {
  const { id, name, type, address, link } = org;
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  function deleteOrganizationClick() {
    dispatch(deleteOrganization(id));
    deleteOrganizationFromLocalStorage(id);
  }

  function formAction(data: Organization) {
    updateOrganization(data);
    dispatch(fetchOrganizations());
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
      <IconButton onClick={() => setShowModal(true)}>
        <BuildIcon />
      </IconButton>
      <IconButton onClick={deleteOrganizationClick}>
        <DeleteIcon />
      </IconButton>
      <AddOrRedactModal
        type="redact-organization"
        isShown={showModal}
        closeModal={() => setShowModal(false)}
        formAction={formAction}
        organizationToRedact={org}
      />
    </ListItem>
  );
}
