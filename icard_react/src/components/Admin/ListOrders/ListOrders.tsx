import { map } from "lodash";
import { Button, Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";

import { useOrders } from "../../../hooks";
import "./ListOrders.scss";

interface Props {
  orders: Order[];
  onReload: () => void;
}

export const ListOrders = ({ orders, onReload }: Props) => {
  return (
    <div className="list-orders-admin">
      {map(orders, (order) => (
        <OrderItem key={order.id} order={order} onReload={onReload} />
      ))}
    </div>
  );
};

interface OrderItemProps {
  order: Order;
  onReload: () => void;
}

const OrderItem = ({ order, onReload }: OrderItemProps) => {
  const { checkDeliveredOrder } = useOrders();

  const onCheckDelivered = async () => {
    await checkDeliveredOrder(order.id);
    onReload();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format("HH:mm")} - </span>
        <span>{moment(order.created_at).startOf("seconds").fromNow()}</span>
      </div>

      <div className="order-item-admin__product">
        <Image src={order.product_data.image} />
        <p>{order.product_data.title}</p>
      </div>

      {order.status === "PENDING" && (
        <Button primary onClick={onCheckDelivered}>
          Marcar Entregado
        </Button>
      )}
    </div>
  );
};
