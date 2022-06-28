import { ReactNode } from "react";

import "./BasicLayout.scss";

interface Props {
  children: ReactNode;
}

export const BasicLayout = ({ children }: Props) => {
  return (
    <div>
      <p>Basic Layout</p>
      {children}
    </div>
  );
};
