import NiceModal from "@ebay/nice-modal-react";
//import { UpdateOrganizationForm } from "widgets/OrganizationForm/ui/OrganizationForm";
import { OrganizationFormModal } from "widgets/OrganizationFormModal";
import { MODAL_TYPES } from "shared/model";

NiceModal.register(MODAL_TYPES["organization-form"], OrganizationFormModal);
