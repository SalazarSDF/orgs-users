import { User } from "../types";
import { ListItem, ListItemText, IconButton, List } from "@mui/material";
import { useState } from "react";

import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUserFromLocalStorage, updateUser } from "../api/organizationApi";
import { deleteUser } from "../model/organizationsModel";
import { useAppDispatch } from "../store";
import AddOrRedactModal from "./AddOrRedactModal";
import { fetchOrganizations } from "../model/organizationsModel";

type Props = {
  employee: User;
  companyId: string;
};
export default function EmployeeItem({ employee, companyId }: Props) {
  const [showRedactUserModal, setShowRedactUserModal] = useState(false);

  const dispatch = useAppDispatch();
  const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;

  function deleteUserClick(userIdToDelete: string) {
    dispatch(deleteUser({ userIdToDelete, organizationId: companyId }));
    deleteUserFromLocalStorage({
      userIdToDelete,
      organizationId: companyId,
    });
  }

  function formActionToRedactUser(data: Partial<User>) {
    updateUser({ userToChange: data, organizationId: companyId });
    dispatch(fetchOrganizations());
  }

  return (
    <ListItem key={employee.id}>
      <List>
        <ListItemText primary={name} secondary={employee.middleName} />
        <ListItemText secondary={employee.Email} />
      </List>
      <IconButton onClick={() => setShowRedactUserModal(true)}>
        <BuildIcon />
      </IconButton>
      <IconButton onClick={() => deleteUserClick(employee.id)}>
        <DeleteIcon />
      </IconButton>
      <AddOrRedactModal
        type="redact-user"
        isShown={showRedactUserModal}
        closeModal={() => setShowRedactUserModal(false)}
        formAction={formActionToRedactUser}
        userToRedact={employee}
      />
    </ListItem>
  );
}
