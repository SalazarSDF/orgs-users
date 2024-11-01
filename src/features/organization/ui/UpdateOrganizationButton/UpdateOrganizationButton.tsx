import { useCallback } from "react";
import BuildIcon from "@mui/icons-material/Build";
import { IconButton } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { MODAL_TYPES } from "shared/model";

type Props = {
  organizationToUpdateId: Id;
};

export function UpdateOrganizationButton({ organizationToUpdateId }: Props) {
  const onClickHandler = useCallback(() => {
    NiceModal.show(MODAL_TYPES["organization-form"], {
      organizationId: organizationToUpdateId,
      typeOfAction: "update",
    });
  }, [organizationToUpdateId]);

  return (
    <IconButton color="warning" onClick={onClickHandler}>
      <BuildIcon />
    </IconButton>
  );
}
