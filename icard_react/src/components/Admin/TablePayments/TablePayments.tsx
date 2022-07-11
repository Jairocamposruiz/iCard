import { ReactNode, useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import moment from "moment";
import "moment/locale/es";

import { PaymentProductsList } from "../../Admin";
import { BasicModal } from "../../Common";
import "./TablePayments.scss";

interface Props {
  payments: Payment[];
}

export const TablePayments = ({ payments }: Props) => {
  const [titleModal, setTitleModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<ReactNode>(<></>);

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const showDetails = (payment: Payment) => {
    setTitleModal(
      `Destalles de la cuenta | Mesa: ${payment.table_data.number}`
    );
    setContentModal(<PaymentProductsList payment={payment} />);
    openCloseModal();
  };

  return (
    <>
      <Table className="table-payments-admin">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Mesa</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Tipo de pago</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(payments, (payment, index) => (
            <Table.Row key={index}>
              <Table.Cell>{payment.id}</Table.Cell>
              <Table.Cell>{payment.table_data.number}</Table.Cell>
              <Table.Cell>{payment.total_payment} €</Table.Cell>
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
              <Table.Cell>
                {moment(payment.created_at).format("DD/MM/YYYY - HH:mm")}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Button icon onClick={() => showDetails(payment)}>
                  <Icon name="eye" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
};
