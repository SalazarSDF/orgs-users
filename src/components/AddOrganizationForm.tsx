import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";

import type { Organization } from "../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

type Props = {
  closeModal: () => void;
  formAction: (arg: Partial<Organization>) => void;
};

export default function AddOrganizationForm({ formAction, closeModal }: Props) {
  return (
    <Box sx={style}>
      <Formik
        initialValues={{ name: "", type: "", address: "", link: "" }}
        onSubmit={(values, { setSubmitting }) => {
          closeModal();
          formAction(values as Partial<Organization>);
          setSubmitting(false);
        }}
      >
        {({ values, handleSubmit, handleChange, isSubmitting }) => (
          <form id="jopa" onSubmit={handleSubmit}>
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

              <Button form="jopa" type="submit" disabled={isSubmitting}>
                Сохранить
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
