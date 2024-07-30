import { tss } from "tss-react";
import { Link, Button, IconButton } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { Organization, FormTypes } from "../types";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "../store";
import {
  deleteOrganization,
  fetchOrganizations,
} from "../features/organizationsSlice.ts";
import { updateOrganization } from "../api/organizationApi";
import AddOrRedactModal from "./AddOrRedactModal";
import { useState } from "react";

export default function OrganizationItem({ org }: { org: Organization }) {
  const { cx, classes } = useStyles();

  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const { id, name, type, address, link } = org;

  const handlerDeleteOrganization = () => {
    dispatch(deleteOrganization(id));
  };

  const formAction = (data: Partial<Organization>) => {
    updateOrganization(data);
    dispatch(fetchOrganizations());
  };

  return (
    <>
      <Button
        className={cx(classes.listButton)}
        component={RouterLink}
        to={`company-employees/${id}`}
      >
        <span>{name}</span>
        <span>{type}</span>
        <span>{address}</span>
      </Button>
      <Link href={`https://${link}`} target="_blank" underline="hover">
        {link}
      </Link>
      <IconButton onClick={() => setShowModal(true)}>
        <BuildIcon />
      </IconButton>
      <IconButton onClick={handlerDeleteOrganization}>
        <DeleteIcon />
      </IconButton>
      <AddOrRedactModal
        type={FormTypes.organization}
        isShown={showModal}
        closeModal={() => setShowModal(false)}
        formAction={formAction}
        organizationToRedact={org}
      />
    </>
  );
}

const useStyles = tss.create({
  listButton: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumn: "1/4",
    borderBottom: "1px solid black",
  },
});
