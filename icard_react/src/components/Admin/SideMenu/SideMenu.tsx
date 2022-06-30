import { ReactNode } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

import { routesAdmin } from "../../../routes";
import { useAuth } from "../../../context";
import "./SideMenu.scss";

interface SideMenuProps {
  children?: ReactNode;
}

export const SideMenu = ({ children }: SideMenuProps) => {
  return (
    <div className="side-menu-admin">
      <MenuLeft />
      <div className="content">{children}</div>
    </div>
  );
};

const MenuLeft = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  return (
    <Menu fixed="left" borderless className="side" vertical>
      {routesAdmin.map(({ path, icon, label, needStaffPermissions }, index) => {
        if (!needStaffPermissions || auth!.me.is_staff)
          return (
            <Menu.Item
              key={index}
              as={Link}
              to={path}
              active={pathname === path}
            >
              <Icon name={icon} /> {label}
            </Menu.Item>
          );
      })}
    </Menu>
  );
};
