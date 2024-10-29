import { useModal } from "@ebay/nice-modal-react";
import { type ReactNode } from "react";
import { memo } from "react";
import { Modal as BaseModal } from "@mui/material";
import css from "./ConfirmModal.module.css";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

type Props = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const ConfirmModal = memo(
  function ConfirmModal(props: Props) {
    return (
      <BaseModal
        onClose={props.onCancel}
        className={css.modal}
        // Open always true because we use nice-modal-react
        // Maybe I should find better component in MIU for modal or
        // write my own <Modal/> component or
        // leave it like that
        open={true}
      >
        <Box className={css.container}>
          <p>{props.title}</p>
          <Button color="error" variant="contained" onClick={props.onConfirm}>
            {props.confirmText}
          </Button>
          <Button onClick={props.onCancel}>{props.cancelText}</Button>
        </Box>
      </BaseModal>
    );
  },
  (oldProps, newProps) => oldProps.title === newProps.title
);
