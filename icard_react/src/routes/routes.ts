import { routesAdmin } from "./routes.admin";
import { routesClient } from "./routes.client";
import { Error404 } from "../pages";
import { BasicLayout } from "../layouts";
import { RouteConfig } from "../interfaces";

export const routes: RouteConfig[] = [
  ...routesAdmin,
  ...routesClient,
  {
    path: "*",
    layout: BasicLayout,
    component: Error404,
  },
];
