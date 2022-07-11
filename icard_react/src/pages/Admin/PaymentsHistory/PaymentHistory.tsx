import { useEffect } from "react";

import { usePayment } from "../../../hooks";
import { HeaderPage, TablePayments } from "../../../components/Admin";
import "./PaymentHistory.scss";
import { Loader } from "semantic-ui-react";

export const PaymentHistory = () => {
  const { getPayments, payments, loading } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <HeaderPage title={"Historial de pagos"} />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablePayments payments={payments} />
      )}
    </>
  );
};
