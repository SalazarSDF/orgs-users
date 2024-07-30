import { tss } from "tss-react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";

import type { Organization } from "../types";


type Props = {
  closeModal: () => void;
  formAction: (arg: Partial<Organization>) => void;
  organizationToRedact?: Organization;
};

export function OrganizationForm({
  formAction,
  closeModal,
  organizationToRedact,
}: Props) {
  const { cx, classes } = useStyles();

  let initialValue = { name: "", type: "", address: "", link: "" };
  if (organizationToRedact) {
    const { name, type, address, link } = organizationToRedact;
    initialValue = { name, type, address, link };
  }

  return (
    <Box className={cx(classes.root)}>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, { setSubmitting }) => {
          closeModal();
          formAction({
            ...organizationToRedact,
            ...values,
          } as Partial<Organization>);
          setSubmitting(false);
        }}
      >
        {({ values, handleSubmit, handleChange, isSubmitting }) => (
          <form id="organization-form-id" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextField
                type="name"
                name="name"
                label="Название Организации"
                value={values.name}
                onChange={handleChange}
              />
              <TextField
                type="type"
                name="type"
                onChange={handleChange}
                value={values.type}
                label="Тип Организации"
              />
              <TextField
                type="address"
                name="address"
                onChange={handleChange}
                value={values.address}
                label="Адрес организации"
              />
              <TextField
                type="link"
                name="link"
                onChange={handleChange}
                value={values.link}
                label="Сайт организации"
              />

              <Button form="organization-form-id" type="submit" disabled={isSubmitting}>
                Сохранить
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}


const useStyles = tss.create({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow:
      "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
});
