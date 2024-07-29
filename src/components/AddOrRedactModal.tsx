import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { OrganizationForm } from "./OrganizationForm";
import { Organization, User } from "../types";
import { RedactOrganizationForm } from "./RedactOrganizationForm";
import UserForm from "./UserForm";

type PropTypes = {
  isShown: boolean;
  closeModal: () => void;
  type: "organization" | "user";
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
          {type === "organization" && (
            <OrganizationForm 
              formAction={formAction}
              closeModal={closeModal}
              organizationToRedact={organizationToRedact as Organization}
            />
          )}
          {type === "user" && (
            <UserForm
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
