import css from "./ConfirmModal.module.css";
import { Box } from "@mui/material";
import { BaseModal } from "../BaseModal/BaseModal";
import { Button } from "@mui/material";

type Props = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmModal(props: Props) {
  return (
    <BaseModal
      onClose={props.onCancel}
      className={css.modal}
    >
      <Box className={css.container}>
        <p>{props.title}</p>
        <div className={css.modalButtonsContainer}>
          <Button color="error" variant="contained" onClick={props.onConfirm}>
            {props.confirmText}
          </Button>
          <Button onClick={props.onCancel}>{props.cancelText}</Button>
        </div>
      </Box>
    </BaseModal>
  );
};
