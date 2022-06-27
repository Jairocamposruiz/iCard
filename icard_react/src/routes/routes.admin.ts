import { AdminLayout } from "../layouts";
import { LoginAdmin } from "../pages/Admin";

import { RouteConfig } from "../interfaces";

export const routesAdmin: RouteConfig[] = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: LoginAdmin,
  },
];
