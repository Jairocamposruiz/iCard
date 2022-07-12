import { ReactNode, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Button, Icon } from "semantic-ui-react";

import { useTable } from "../../hooks";
import "./ClientLayout.scss";

interface Props {
  children: ReactNode;
}

export const ClientLayout = ({ children }: Props) => {
  const { existTable } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`);
  };

  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`);
  };

  const closeTable = () => {
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      const isValidTable = await existTable(tableNumber as any);
      if (!isValidTable) navigate("/");
    })();
  }, [tableNumber]);

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`}>
            <h1>iCard</h1>
          </Link>
          <span>Mesa {tableNumber}</span>
          <div>
            <Button icon onClick={goToCart}>
              <Icon name="shop" />
            </Button>
            <Button icon onClick={goToOrders}>
              <Icon name="list" />
            </Button>
            <Button icon onClick={closeTable}>
              <Icon name="sign-out" />
            </Button>
          </div>
        </div>
        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  );
};
