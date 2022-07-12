import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { map, size } from "lodash";
import { Button } from "semantic-ui-react";

import { ConfirmModal } from "../../../components/Common";
import { OrderHistoryItem } from "../../../components/Client";
import { useOrders, useTable, usePayment } from "../../../hooks";
import "./OrdersHistory.scss";

export const OrdersHistory = () => {
  const [table, setTable] = useState<null | Table>(null);
  const [total, setTotal] = useState(0);
  const [pendingPayment, setPendingPayment] = useState(false);
  const [showTypePayment, setShowTypePayment] = useState(false);

  const { getOrders, orders, loading, addPaymentToOrders } = useOrders();
  const { createPayment, getPaymentByTable } = usePayment();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();

  const onCloseModal = () => {
    setShowTypePayment((prevState) => !prevState);
  };

  const onCreatePayment = async (paymentType: Payment["payment_type"]) => {
    setShowTypePayment(false);

    if (!table) return;
    const paymentData: CreatePayment = {
      table: table.id,
      payment_type: paymentType,
      total_payment: total,
      status_payment: "PENDING",
    };

    const payment = await createPayment(paymentData);
    addPaymentToOrders(payment.id, orders);
  };

  useEffect(() => {
    (async () => {
      if (!tableNumber) return;
      const table = await getTableByNumber(+tableNumber);
      if (!table) return;
      setTable(table);
      getOrders({
        idTable: table.id,
        order: "-status,-created_at",
        close: false,
      });
    })();
  }, [showTypePayment]);

  useEffect(() => {
    let amount = orders.reduce(
      (total, order) => (total += +order.product_data.price),
      0
    );
    setTotal(+amount.toFixed(2));
  }, [orders]);

  useEffect(() => {
    (async () => {
      if (!table) return;
      const payment = await getPaymentByTable(table.id);
      if (payment) {
        setPendingPayment(true);
      }
    })();
  }, [showTypePayment, table]);

  return (
    <div className="orders-history-client">
      <h1>Historial de pedidos</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <>
              <p className="orders-history-client__total">
                Total de la cuenta: {total} €
              </p>
              {!pendingPayment ? (
                <Button primary fluid onClick={() => setShowTypePayment(true)}>
                  Pedir la cuenta
                </Button>
              ) : (
                <Button primary fluid>
                  La cuenta ha sido pedida
                </Button>
              )}
            </>
          )}

          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}

      <ConfirmModal
        title={`Pagar con tarjeta o efectivo (${total} €)`}
        show={showTypePayment}
        onClose={onCloseModal}
        onFirstOptionText="Efectivo"
        onFirstOption={() => onCreatePayment("CASH")}
        onFirstOptionType="positive"
        onSecondOptionText="Tarjeta"
        onSecondOption={() => onCreatePayment("CARD")}
        onSecondOptionType="positive"
      />
    </div>
  );
};
