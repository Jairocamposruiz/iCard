import { ClientLayout, BasicLayout } from "../layouts";
import {
  SelectTable,
  Categories,
  Products,
  Cart,
  OrdersHistory,
} from "../pages/Client";

import { RouteConfig } from "../interfaces";

export const routesClient: RouteConfig[] = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
  },
  {
    path: "/client/:tableNumber",
    layout: ClientLayout,
    component: Categories,
  },
  {
    path: "/client/:tableNumber/categories/:categoryId",
    layout: ClientLayout,
    component: Products,
  },
  {
    path: "/client/:tableNumber/cart",
    layout: ClientLayout,
    component: Cart,
  },
  {
    path: "/client/:tableNumber/orders",
    layout: ClientLayout,
    component: OrdersHistory,
  },
];
