import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { BasicModal } from "../../../components/Common";
import {
  HeaderPage,
  ListOrders,
  AddOrderForm,
} from "../../../components/Admin";
import { useOrders, useTable } from "../../../hooks";
import "./TableDetailsAdmin.scss";

export const TableDetailsAdmin = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { id } = useParams();
  const { orders, getOrders, loading } = useOrders();
  const { getTableById, table } = useTable();
  const [reloadOrders, setReloadOrders] = useState(false);

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onReloadOrders = () => {
    setReloadOrders((prevState) => !prevState);
  };

  useEffect(() => {
    if (!id) return;
    getOrders({
      idTable: +id,
      order: "-status,created_at",
    });
  }, [reloadOrders, id]);

  useEffect(() => {
    if (!id) return;
    getTableById(+id);
  }, [id]);

  return (
    <>
      <HeaderPage
        title={`Mesa número ${table?.number || ""}`}
        btnTitle="Añadir pedido"
        btnClick={openCloseModal}
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
        title="Añadir pedido"
      >
        <AddOrderForm
          idTable={+id!}
          openCloseModal={openCloseModal}
          onReloadOrders={onReloadOrders}
        />
      </BasicModal>
    </>
  );
};
