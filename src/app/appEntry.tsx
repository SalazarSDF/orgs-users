import React from "react";
import { Provider as ModalProvider } from "@ebay/nice-modal-react";
import { Provider as ReduxProvider } from "react-redux";
import ReactDOM from "react-dom/client";
import { appRouter } from "./appRouter";
import { appStore } from "./appStore";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <ModalProvider>
      <ReduxProvider store={appStore}>
        <CssBaseline />
        <RouterProvider router={appRouter()} />
      </ReduxProvider>
    </ModalProvider>
  </ErrorBoundary>
);
