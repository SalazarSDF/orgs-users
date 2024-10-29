import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useAppDispatch, useConfirmModal } from "shared/model/hooks";
import { organizationRemoved } from "entities/organization/model/slice";
import { useCallback, memo } from "react";

type Props = {
  organizationToDeleteId: Id;
};
export const DeleteOrganizationButton = memo(
  ({ organizationToDeleteId }: Props) => {
    const dispatch = useAppDispatch();
    const confirmRemoveModal = useConfirmModal();

    console.log("RENDER!!!", organizationToDeleteId);

    const onClickHandler = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        confirmRemoveModal.show({
          title: "Вы уверенны, что хотите Удалить организацию?",
          confirmText: "Удалить",
          cancelText: "Отменить",
          onConfirm: () => {
            confirmRemoveModal.remove();
            dispatch(organizationRemoved(organizationToDeleteId));
          },
          onCancel: () => confirmRemoveModal.remove(),
        });
      },
      [organizationToDeleteId]
    );
    return (
      <IconButton color="warning" onClick={onClickHandler}>
        <DeleteIcon />
      </IconButton>
    );
  },
  (oldProps, newProps) =>
    oldProps.organizationToDeleteId === newProps.organizationToDeleteId
);
