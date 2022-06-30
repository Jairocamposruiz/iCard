import { AdminLayout } from "../layouts";
import { HomeAdmin } from "../pages/Admin";

import { RouteConfig } from "../interfaces";

export const routesAdmin: RouteConfig[] = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
  },
];
