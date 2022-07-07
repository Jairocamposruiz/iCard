import { Table, Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { usePayment } from "../../../hooks";
import "./AccountDetails.scss";

interface Props {
  payment: Payment;
  orders: Order[];
}

export const AccountDetails = ({ payment, orders }: Props) => {
  const { closePayment } = usePayment();
  const navigate = useNavigate();

  const onClosePayment = async () => {
    const result = window.confirm("¿Esta seguro de cerrar la mesa?");
    if (!result) return;

    await closePayment(payment.id, orders);

    navigate("/admin");
  };

  return (
    <div className="payment-details">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa:</Table.Cell>
            <Table.Cell>{payment.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>{payment.total_payment} €</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Forma de pago:</Table.Cell>
            <Table.Cell>
              {payment.payment_type === "CARD" ? (
                <>
                  <Icon name="credit card alternative" /> <span>Tarjeta</span>
                </>
              ) : (
                <>
                  <Icon name="money bill alternate outline" />
                  <span>Efectivo</span>
                </>
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Button
        primary
        fluid
        onClick={onClosePayment}
        content="Marcar como pagado y cerrar mesa"
      />
    </div>
  );
};
