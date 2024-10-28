import { useModal } from "@ebay/nice-modal-react";
import { type ReactNode } from "react";
import { Modal as BaseModal } from "@mui/material";
import css from "./Modal.module.css";
import { Box } from "@mui/material";

type Props = {
  children: ReactNode;
};

export function Modal({ children }: Props) {
  const modal = useModal();
  return (
    <BaseModal onClose={modal.hide} className={css.modal } open={modal.visible}>
      <Box className={css.container}>{children}</Box>
    </BaseModal>
  );
}
