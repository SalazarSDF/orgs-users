import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";

import type { User } from "../types";

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
  formAction: (arg: Partial<User>) => void;
  userToRedact?: User;
};

export default function UserForm({
  formAction,
  closeModal,
  userToRedact,
}: Props) {

  let initialValue = { lastName: "", Email: "", firstName: "", middleName: "" };
  if (userToRedact) {
    const { lastName, Email, firstName, middleName } = userToRedact;
    initialValue = { lastName, Email, firstName, middleName };
  }

  return (
    <Box sx={style}>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, { setSubmitting }) => {
          closeModal();
          formAction({ ...userToRedact, ...values } as Partial<User>);
          setSubmitting(false);
        }}
      >
        {({ values, handleSubmit, handleChange, isSubmitting }) => (
          <form id="user-form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextField
                type="lastName"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                label="Фамилия сотрудника"
              />
              <TextField
                type="firstName"
                name="firstName"
                label="Имя Сотрудника"
                value={values.firstName}
                onChange={handleChange}
              />
              <TextField
                type="middleName"
                name="middleName"
                label="Отчество Сотрудника"
                value={values.middleName}
                onChange={handleChange}
              />
              <TextField
                type="Email"
                name="Email"
                onChange={handleChange}
                value={values.Email}
                label="Email Сотрудника"
              />

              <Button form="user-form" type="submit" disabled={isSubmitting}>
                Сохранить
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
