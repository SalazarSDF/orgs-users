import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import CompanyEmployeesPage from "./pages/CompanyEmployeesPage.tsx";
import { fetchOrganizations } from "./features/organizationsSlice.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "company-employees/:company-id",
    element: <CompanyEmployeesPage />,
  },
]);

async function start() {
  await store.dispatch(fetchOrganizations());
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        <CssBaseline />
      </Provider>
    </React.StrictMode>
  );
}

void start();
