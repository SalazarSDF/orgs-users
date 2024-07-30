import { tss } from "tss-react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";

import type { User } from "../types";

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
  const { cx, classes } = useStyles();

  let initialValue = { lastName: "", Email: "", firstName: "", middleName: "" };
  if (userToRedact) {
    const { lastName, Email, firstName, middleName } = userToRedact;
    initialValue = { lastName, Email, firstName, middleName };
  }

  return (
    <Box className={cx(classes.root)}>
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
