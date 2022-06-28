import { ReactNode } from "react";

import "./ClientLayout.scss";

interface Props {
  children: ReactNode;
}

export const ClientLayout = ({ children }: Props) => {
  return (
    <div>
      <p>Client Layout</p>
      {children}
    </div>
  );
};
