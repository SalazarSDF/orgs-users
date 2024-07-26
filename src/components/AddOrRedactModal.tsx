import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddOrganizationForm from "./AddOrganizationForm";
import { Organization } from "../types";
import AddUserForm from "./AddUserForm";
import { RedactOrganizationForm } from "./RedactOrganizationForm";

type PropTypes = {
  isShown: boolean;
  closeModal: () => void;
  type: "add-organization" | "add-user" | "redact-organization" | "redact-user";
  formAction: (arg: Partial<Organization>) => void;
  organizationToRedact?: Organization;
};

export default function AddOrRedactModal({
  closeModal,
  isShown,
  type,
  formAction,
  organizationToRedact,
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
        </Box>
      </Modal>
    </div>
  );
}
