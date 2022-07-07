import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { BasicModal } from "../../../components/Common";
import {
  HeaderPage,
  ListOrders,
  AddOrderForm,
  CreatePaymentForm,
  AccountDetails,
} from "../../../components/Admin";
import { useOrders, useTable, usePayment } from "../../../hooks";
import "./TableDetailsAdmin.scss";

export const TableDetailsAdmin = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>("");
  const [contentModal, setContentModal] = useState<ReactNode>(<></>);
  const [reloadOrders, setReloadOrders] = useState(false);
  const [reloadPayment, setReloadPayment] = useState(false);
  const [paymentData, setPaymentData] = useState<Payment | null>(null);

  const { id } = useParams();
  const { orders, getOrders, loading } = useOrders();
  const { getPaymentByTable } = usePayment();
  const { getTableById, table } = useTable();

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onReloadOrders = () => {
    setReloadOrders((prevState) => !prevState);
  };

  const onReloadPayment = () => {
    setReloadPayment((prevState) => !prevState);
  };

  const onAddOrder = () => {
    setTitleModal("Añadir pedido");
    setContentModal(
      <AddOrderForm
        idTable={+id!}
        openCloseModal={openCloseModal}
        onReloadOrders={onReloadOrders}
      />
    );
    openCloseModal();
  };

  const onCreatePayment = () => {
    setTitleModal("Generar cuenta");
    setContentModal(
      <CreatePaymentForm
        tableId={+id!}
        orders={orders}
        openCloseModal={openCloseModal}
        onReloadPayment={onReloadPayment}
      />
    );
    openCloseModal();
  };

  const onShowAccount = () => {
    setTitleModal("Cuenta");
    setContentModal(<AccountDetails payment={paymentData!} orders={orders} />);
    openCloseModal();
  };

  useEffect(() => {
    if (!id) return;
    getOrders({
      idTable: +id,
      close: false,
      order: "-status,created_at",
    });
  }, [reloadOrders, id]);

  useEffect(() => {
    if (!id) return;
    getTableById(+id);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const payment = await getPaymentByTable(+id);
      if (payment) setPaymentData(payment);
    })();
  }, [id, reloadPayment]);

  return (
    <>
      <HeaderPage
        title={`Mesa número ${table?.number || ""}`}
        btnTitle={!paymentData ? "Añadir pedido" : "Ver cuenta"}
        btnClick={!paymentData ? onAddOrder : onShowAccount}
        btnTitleTwo={!paymentData ? "Generar cuenta" : ""}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrders orders={orders} onReload={onReloadOrders} />
      )}
      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
};
