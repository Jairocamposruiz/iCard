import { AdminLayout } from "../layouts";
import {
  HomeAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductsAdmin,
} from "../pages/Admin";
import { RouteConfigAdmin } from "../interfaces";

export const routesAdmin: RouteConfigAdmin[] = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
    icon: "home",
    label: "Pedidos",
    needStaffPermissions: false,
  },
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: HomeAdmin,
    icon: "table",
    label: "Mesas",
    needStaffPermissions: false,
  },
  {
    path: "/admin/payments-history",
    layout: AdminLayout,
    component: HomeAdmin,
    icon: "history",
    label: "Historial de pagos",
    needStaffPermissions: false,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
    icon: "folder",
    label: "Categorias",
    needStaffPermissions: false,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductsAdmin,
    icon: "cart",
    label: "Productos",
    needStaffPermissions: false,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UsersAdmin,
    icon: "users",
    label: "Usuarios",
    needStaffPermissions: true,
  },
];
