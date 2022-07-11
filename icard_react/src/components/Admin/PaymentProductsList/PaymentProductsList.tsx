import { useEffect } from "react";
import { map } from "lodash";
import { Image } from "semantic-ui-react";

import { useOrders } from "../../../hooks";
import "./PaymentProductsList.scss";

interface Props {
  payment: Payment;
}

export const PaymentProductsList = ({ payment }: Props) => {
  const { getOrders, orders } = useOrders();

  useEffect(() => {
    getOrders({
      payment: payment.id,
    });
  }, []);

  console.log(orders);

  return (
    <div className="payment-product-list-admin">
      {map(orders, (order) => (
        <div className="payment-product-list-admin__product" key={order.id}>
          <div>
            <Image src={order.product_data.image} avatar size="tiny" />
            <span>{order.product_data.title}</span>
          </div>
          <span>{order.product_data.price} €</span>
        </div>
      ))}
    </div>
  );
};
