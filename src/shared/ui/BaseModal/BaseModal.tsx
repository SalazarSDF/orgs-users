import { JSXElementConstructor } from "react";
import { Modal } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  className?: string;
  onClose: () => void;
};
export function BaseModal(props: Props) {
  return (
    <Modal
      onClose={props.onClose}
      className={props.className}
      // Open always true because we use nice-modal-react
      // Maybe I should find better component in MIU for modal or
      // write my own <Modal/> component or
      // leave it like that
      open={true}
    >
      {props.children}
    </Modal>
  );
}
