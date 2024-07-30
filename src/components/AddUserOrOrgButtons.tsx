import { ButtonGroup, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FormTypes } from "../types";

type PropsType = {
  type: keyof typeof FormTypes;
  openModalFunc: () => void;
};

export default function AddUserOrOrgButtons({ type, openModalFunc }: PropsType) {
  
  return (
    <ButtonGroup variant="text">
      {type === "user" && (
        <Button component={RouterLink} to="/">
          Назад к списку организаций
        </Button>
      )}
      <Button onClick={openModalFunc}>
        {type === "user" ? "Добавить сотрудника" : "Добавить организацию"}
      </Button>
    </ButtonGroup>
  );
}
