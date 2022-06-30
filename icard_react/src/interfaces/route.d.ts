import { ReactElement } from "react";
import { SemanticICONS } from "semantic-ui-react";

export interface RouteConfig {
  path: string;
  layout: (any) => ReactElement;
  component: (any) => ReactElement;
}

export interface RouteConfigAdmin extends RouteConfig {
  icon: SemanticICONS;
  label: string;
  needStaffPermissions: boolean;
}
