import { ButtonGroup, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type PropsType = {
  type: "users" | "organizations";
  openModalFunc: () => void;
};

export default function AddUserOrOrgButtons({ type, openModalFunc }: PropsType) {
  
  return (
    <ButtonGroup variant="text">
      {type === "users" && (
        <Button component={RouterLink} to="/">
          Назад к списку организаций
        </Button>
      )}
      <Button onClick={openModalFunc}>
        {type === "users" ? "Добавить сотрудника" : "Добавить организацию"}
      </Button>
    </ButtonGroup>
  );
}
