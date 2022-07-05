import { useEffect } from "react";
import { size } from "lodash";
import { Label } from "semantic-ui-react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as IconTable } from "../../../assets/table.svg";
import { useOrders } from "../../../hooks";
import "./Table.scss";

interface Props {
  table: Table;
  refresh: boolean;
}

export const Table = ({ table, refresh }: Props) => {
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

  return (
    <Link to={`/admin/table/${table.id}`} className="table-admin">
      {size(ordersPending) > 0 && (
        <Label circular color="orange">
          {size(ordersPending)}
        </Label>
      )}
      {size(ordersDelivered) > 0 && size(ordersPending) === 0 && (
        <Label circular color="orange">
          Ocupada
        </Label>
      )}
      {size(ordersDelivered) === 0 && size(ordersPending) === 0 && (
        <Label circular color="olive">
          Libre
        </Label>
      )}

      <IconTable
        className={classNames({
          pending: size(ordersPending) > 0,
          busy: size(ordersDelivered) > 0,
        })}
      />
      <p>Mesa {table.number}</p>
    </Link>
  );
};
