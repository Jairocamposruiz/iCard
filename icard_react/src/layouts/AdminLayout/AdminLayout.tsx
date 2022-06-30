import { ReactNode } from "react";

import { useAuth } from "../../context";
import { LoginAdmin } from "../../pages/Admin";
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
    <div>
      <p>Admin Layout</p>
      {children}
    </div>
  );
};
