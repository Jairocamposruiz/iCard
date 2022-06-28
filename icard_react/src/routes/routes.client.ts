import { ClientLayout } from "../layouts";
import { Home } from "../pages/Client";

import { RouteConfig } from "../interfaces";

export const routesClient: RouteConfig[] = [
  {
    path: "/",
    layout: ClientLayout,
    component: Home,
  },
];
