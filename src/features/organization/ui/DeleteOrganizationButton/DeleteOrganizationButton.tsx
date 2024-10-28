import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "shared/model/hooks";
import { useConfirmModal } from "shared/useConfirmModal";
import { organizationRemoved } from "entities/organization/model/slice";

type Props = {
  organizationToDeleteId: Id;
};
export function DeleteOrganizationButton({ organizationToDeleteId }: Props) {
  const dispatch = useAppDispatch();
  const confirmRemoveModal = useConfirmModal();

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    confirmRemoveModal.show({
      title: "Вы уверенны, что хотите Удалить организацию?",
      confirmText: "Удалить",
      cancelText: "Отменить",
      onConfirm: () => {
        confirmRemoveModal.remove();
        dispatch(organizationRemoved(organizationToDeleteId))
      },
      onCancel: () => confirmRemoveModal.remove(),
    });
  };
  return (
    <IconButton color='warning' onClick={onClickHandler}>
      <DeleteIcon />
    </IconButton>
  );
}
