import { ReactNode } from "react";

import "./AdminLayout.scss";

interface Props {
  children: ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <p>Admin Layout</p>
      {children}
    </div>
  );
};
