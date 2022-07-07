import { useEffect, useState } from "react";
import { size } from "lodash";
import { Label } from "semantic-ui-react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as IconTable } from "../../../assets/table.svg";
import { useOrders, usePayment } from "../../../hooks";
import "./Table.scss";

interface Props {
  table: Table;
  refresh: boolean;
}

export const Table = ({ table, refresh }: Props) => {
  const [pendingPayment, setPendingPayment] = useState(false);

  const { getPaymentByTable } = usePayment();

  const {
    getOrdersPending,
    getOrdersDelivered,
    ordersDelivered,
    ordersPending,
  } = useOrders();

  useEffect(() => {
    getOrdersPending(table.id);
  }, [refresh]);

  useEffect(() => {
    getOrdersDelivered(table.id);
  }, [refresh]);

  useEffect(() => {
    (async () => {
      const payment = await getPaymentByTable(table.id);
      if (payment) {
        setPendingPayment(true);
      }
    })();
  }, []);

  return (
    <Link to={`/admin/table/${table.id}`} className="table-admin">
      <LabelTable
        pendingPayment={pendingPayment}
        ordersDelivered={ordersDelivered}
        ordersPending={ordersPending}
      />

      <IconTable
        className={classNames({
          pending: size(ordersPending) > 0,
          busy: size(ordersDelivered) > 0,
          account: pendingPayment,
        })}
      />
      <p>Mesa {table.number}</p>
    </Link>
  );
};

interface LabelTableProps {
  pendingPayment: boolean;
  ordersDelivered: Order[];
  ordersPending: Order[];
}

const LabelTable = ({
  pendingPayment,
  ordersPending,
  ordersDelivered,
}: LabelTableProps) => {
  if (pendingPayment) {
    return (
      <Label circular color="blue">
        Cuenta
      </Label>
    );
  }

  if (size(ordersPending) > 0) {
    return (
      <Label circular color="orange">
        {size(ordersPending)}
      </Label>
    );
  }

  if (size(ordersDelivered) > 0 && size(ordersPending) === 0) {
    return (
      <Label circular color="orange">
        Ocupada
      </Label>
    );
  }

  return (
    <Label circular color="olive">
      Libre
    </Label>
  );
};
