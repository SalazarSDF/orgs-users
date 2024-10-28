import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "shared/ui";
import { OrganizationsPage } from "pages/organizations";


export function appRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      // errorElement: <div>Error happened</div>,
      children: [
        {
          path: "/",
          element: <OrganizationsPage />,
        },
      ],
    },
  ]);
}
