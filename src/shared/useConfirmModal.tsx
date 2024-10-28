import { create as createModal, useModal } from "@ebay/nice-modal-react";
import { Button } from "@mui/material";
import { Modal } from "./ui";

type Props = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

function ConfirmModalPresenter(props: Props) {
  const {
    title,
    onConfirm,
    onCancel,
    confirmText = "Да",
    cancelText = "Нет",
  } = props;

  return (
    <Modal>
      <p>{title}</p>
      <Button color="error" variant="contained" onClick={onConfirm}>
        {confirmText}
      </Button>
      <Button onClick={onCancel}>{cancelText}</Button>
    </Modal>
  );
}

export const ConfirmModal = createModal(ConfirmModalPresenter);

export function useConfirmModal() {
  return useModal(ConfirmModal);
}
