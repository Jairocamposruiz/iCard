import { ReactNode } from "react";

import { useAuth } from "../../context";
import { LoginAdmin } from "../../pages/Admin";
import { TopMenu, SideMenu } from "../../components/Admin";
import "./AdminLayout.scss";

interface Props {
  children: ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  const { auth } = useAuth();

  if (!auth) {
    return <LoginAdmin />;
  }

  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu />
      </div>

      <div className="admin-layout__content">
        <SideMenu>{children}</SideMenu>
      </div>
    </div>
  );
};
