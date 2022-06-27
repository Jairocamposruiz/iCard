import { ReactElement } from "react";

export interface RouteConfig {
  path: string;
  layout: (any) => ReactElement;
  component: (any) => ReactElement;
}
