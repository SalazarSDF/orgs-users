import { User, FormTypes } from "../types";
import { IconButton } from "@mui/material";
import { useState } from "react";

import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUser } from "../api/organizationApi";
import { useAppDispatch } from "../store";
import AddOrRedactModal from "./AddOrRedactModal";
import { deleteUser, fetchOrganizations } from "../features/organizationsSlice";

type Props = {
  employee: User;
  companyId: string;
};

export default function EmployeeItem({ employee, companyId }: Props) {
  const [showRedactUserModal, setShowRedactUserModal] = useState(false);

  const dispatch = useAppDispatch();
  const { firstName, middleName, lastName, Email } = employee;

  function deleteUserClick(userIdToDelete: string) {
    dispatch(deleteUser({ userIdToDelete, organizationId: companyId }));
  }
  function formActionToRedactUser(data: Partial<User>) {
    updateUser({ userToChange: data, organizationId: companyId });
    dispatch(fetchOrganizations());
  }

  return (
    <>
      <span>{firstName + " " + middleName}</span>
      <span>{lastName}</span>
      <span>{Email}</span>
      <IconButton onClick={() => setShowRedactUserModal(true)}>
        <BuildIcon />
      </IconButton>
      <IconButton onClick={() => deleteUserClick(employee.id)}>
        <DeleteIcon />
      </IconButton>
      <AddOrRedactModal
        type={FormTypes.user}
        isShown={showRedactUserModal}
        closeModal={() => setShowRedactUserModal(false)}
        formAction={formActionToRedactUser}
        userToRedact={employee}
      />
    </>
  );
}
