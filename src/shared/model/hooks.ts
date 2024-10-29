import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { create as createModal, useModal } from "@ebay/nice-modal-react";
import { ConfirmModal } from "shared/ui";


export function useConfirmModal() {
  return useModal(createModal(ConfirmModal));
}

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
