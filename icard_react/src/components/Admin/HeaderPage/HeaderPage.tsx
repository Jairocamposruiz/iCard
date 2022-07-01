import { Button } from "semantic-ui-react";

import "./HeaderPage.scss";

interface Props {
  title: string;
  btnTitle?: string;
  btnClick?: (obj: any) => void;
  btnTitleTwo?: string;
  btnClickTwo?: (obj: any) => void;
}

export const HeaderPage = ({
  title,
  btnTitle,
  btnClick,
  btnTitleTwo,
  btnClickTwo,
}: Props) => {
  return (
    <div className="header-page-admin">
      <h2>{title}</h2>
      <div>
        {btnTitle && btnClick && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && btnClickTwo && (
          <Button negative onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
};
