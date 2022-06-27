import { ReactNode } from "react";

import "./ClientLayout.scss";

interface Props {
  children: ReactNode;
  className?: String;
}

export const ClientLayout = ({ children, className }: Props) => {
  return (
    <div className={`${className}`}>
      <p>Client Layout</p>
      {children}
    </div>
  );
};
