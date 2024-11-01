import NiceModal from "@ebay/nice-modal-react";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { BaseModal } from "shared/ui";
import css from "./OrganizationFormModal.module.css";
import {
  selectOrganizationById,
  organizationUpdated,
  organizationAdded,
} from "entities/organization/model/slice";
import { useAppDispatch, useAppSelector } from "shared/model";
import type { InitialValues } from "../model/types";

type Props = {
  organizationId: Id;
  typeOfAction: "update" | "create";
};

export const OrganizationFormModal = NiceModal.create((props: Props) => {
  const dispatch = useAppDispatch();

  const organization = useAppSelector((state) =>
    selectOrganizationById(state, props.organizationId)
  );

  let initialValues: InitialValues = {
    name: "",
    type: "",
    link: "",
    address: "",
  };

  if (organization || props.typeOfAction === "update") {
    let { name, type, link, address } = organization;
    initialValues = { name, type, link, address };
  }

  const thisModal = NiceModal.useModal();
  const closeModal = thisModal.remove;

  const onFormSubmit = () => {
    if (organization && props.typeOfAction === "update") {
      dispatch(
        organizationUpdated({ id: props.organizationId, changes: values })
      );
    } else if (!organization && props.typeOfAction === "create") {
      dispatch(organizationAdded({ id: props.organizationId, ...values }));
    }

    closeModal();
  };

  const { handleSubmit, values, isSubmitting, getFieldProps } = useFormik({
    initialValues: initialValues,
    onSubmit: onFormSubmit,
  });

  const formFields = Object.keys(initialValues).map((fieldName) => {
    const labels = {
      name: "Название Организации",
      type: "Тип Организации",
      address: "Адрес организации",
      link: "Сайт организации",
    };

    return (
      <TextField
        {...getFieldProps(fieldName)}
        multiline={fieldName === "address" ? true : undefined}
        label={labels[fieldName as keyof typeof labels]}
        value={values[fieldName as keyof typeof labels]}
      />
    );
  });

  return (
    <BaseModal className={css.modal} onClose={closeModal}>
      <Box className={css.container}>
        <h4 className={css.modalHeader}>Редактировать организацию:</h4>
        <form
          className={css.form}
          id="organization-form-id"
          onSubmit={handleSubmit}
        >
          {...formFields}
          <div className={css.modalFooter}>
            <Button onClick={closeModal}>Отменить</Button>
            <Button
              form="organization-form-id"
              type="submit"
              disabled={isSubmitting}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Box>
    </BaseModal>
  );
});
