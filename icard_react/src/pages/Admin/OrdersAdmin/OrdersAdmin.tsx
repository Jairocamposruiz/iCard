import { useEffect } from "react";
import { Loader } from "semantic-ui-react";

import { HeaderPage, TableList } from "../../../components/Admin";
import { useTable } from "../../../hooks";
import "./OrdersAdmin.scss";

export const OrdersAdmin = () => {
  const { loading, tables, getTables } = useTable();

  useEffect(() => {
    getTables();
  }, []);

  return (
    <>
      <HeaderPage title="Restaurante" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableList tables={tables} />
      )}
    </>
  );
};
