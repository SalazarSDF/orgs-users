import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddOrganizationForm from "./AddOrganizationForm";
import { Organization, User } from "../types";
import AddUserForm from "./AddUserForm";
import { RedactOrganizationForm } from "./RedactOrganizationForm";
import RedactUserForm from "./RedactUserForm";

type PropTypes = {
  isShown: boolean;
  closeModal: () => void;
  type: "add-organization" | "add-user" | "redact-organization" | "redact-user";
  formAction: (arg: Partial<Organization>) => void;
  organizationToRedact?: Organization;
  userToRedact?: User;
};

export default function AddOrRedactModal({
  closeModal,
  isShown,
  type,
  formAction,
  organizationToRedact,
  userToRedact,
}: PropTypes) {
  return (
    <div>
      <Modal
        open={isShown}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          {type === "add-organization" && (
            <AddOrganizationForm
              formAction={formAction}
              closeModal={closeModal}
            />
          )}
          {type === "add-user" && (
            <AddUserForm formAction={formAction} closeModal={closeModal} />
          )}
          {type === "redact-organization" && (
            <RedactOrganizationForm
              formAction={formAction}
              closeModal={closeModal}
              organizationToRedact={organizationToRedact as Organization}
            />
          )}
          {type === "redact-user" && (
            <RedactUserForm
              formAction={formAction}
              closeModal={closeModal}
              userToRedact={userToRedact as User}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
