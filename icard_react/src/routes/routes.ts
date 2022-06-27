import { routesAdmin } from "./routes.admin";
import { routesClient } from "./routes.client";

import { RouteConfig } from "../interfaces";

export const routes: RouteConfig[] = [...routesAdmin, ...routesClient];
