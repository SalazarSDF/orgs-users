import { Outlet } from "react-router-dom";
import css from "./baseLayoutStyle.module.css";

export function BaseLayout() {
  return (
    <div className={css.container}>
      <Outlet />
    </div>
  );
}
