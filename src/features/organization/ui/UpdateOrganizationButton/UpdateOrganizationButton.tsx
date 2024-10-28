import BuildIcon from "@mui/icons-material/Build";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "shared/model/hooks";
import { useConfirmModal } from "shared/useConfirmModal";

type Props = {
  organizationToUpdateId: Id;
};
export function UpdateOrganizationButton({ organizationToUpdateId }: Props) {

  const dispatch = useAppDispatch();
  const confirmRemoveModal = useConfirmModal();

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("ЭВЕНТ!!", e);
    e.preventDefault();
    confirmRemoveModal.show({
      title: "Вы уверенны, что хотите сохранить изменения?",
      confirmText: "Изменить",
      cancelText: "Отменить",
      onConfirm: () => {
        confirmRemoveModal.remove();
        //dispatch(organizationRemoved(organizationToDeleteId))
      },
      onCancel: () => confirmRemoveModal.remove(),
    });
  };
  return (
    <IconButton color='warning' onClick={onClickHandler}>
      <BuildIcon />
    </IconButton>
  );
}
