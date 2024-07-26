import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddOrganizationForm from "./AddOrganizationForm";
import { Organization } from "../types";
import AddUserForm from "./AddUserForm";

type PropTypes = {
  isShown: boolean;
  closeModal: () => void;
  type: "add-organization" | "add-user";
  formAction: (arg: Partial<Organization>) => void;
};

export default function AddOrRedactModal({
  closeModal,
  isShown,
  type,
  formAction,
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
        </Box>
      </Modal>
    </div>
  );
}
