import { ReactNode } from "react";

import "./AdminLayout.scss";

interface Props {
  children: ReactNode;
  className?: String;
}

export const AdminLayout = ({ children, className }: Props) => {
  return (
    <div className={`${className}`}>
      <p>Admin Layout</p>
      {children}
    </div>
  );
};
