import { Button } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { MODAL_TYPES } from "shared/model";
import { uuidv4 } from "shared/utils";
import css from "./AddOrganizationButton.module.css";

export function AddOrganizationButton() {
  const onClickHandler = () => {
    const newOrganizationId = uuidv4();
    NiceModal.show(MODAL_TYPES["organization-form"], {
      organizationId: newOrganizationId,
      typeOfAction: "create",
    });
  };
  return (
    <div className={css.container}>
      <Button variant="contained" onClick={onClickHandler}>
        Добавить новую Организацию
      </Button>
    </div>
  );
}
