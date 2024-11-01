import React from "react";
import { Provider as ModalProvider } from "@ebay/nice-modal-react";
import { Provider as ReduxProvider } from "react-redux";
import ReactDOM from "react-dom/client";
import { appRouter } from "./appRouter";
import { appStore } from "./appStore";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import "./appModals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ReduxProvider store={appStore}>
        <ModalProvider>
          <CssBaseline />
          <RouterProvider router={appRouter()} />
        </ModalProvider>
      </ReduxProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
