import { useState, useEffect } from "react";
import { toNumber } from "lodash";
import { Form, Dropdown, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { usePayment, useOrders } from "../../../hooks";
import "./CreatePaymentForm.scss";

interface Props {
  tableId: number;
  orders: Order[];
  openCloseModal: () => void;
  onReloadPayment: () => void;
}

export const CreatePaymentForm = ({
  orders,
  tableId,
  openCloseModal,
  onReloadPayment,
}: Props) => {
  const { createPayment } = usePayment();
  const { addPaymentToOrders } = useOrders();
  const [total, setTotal] = useState<number>(0);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      const paymentData: CreatePayment = {
        table: tableId,
        total_payment: total,
        status_payment: "PENDING",
        payment_type: formValues.payment_type as any,
      };

      const payment = await createPayment(paymentData);

      await addPaymentToOrders(payment.id, orders);

      onReloadPayment();
      openCloseModal();
    },
  });

  useEffect(() => {
    const total = orders
      .map((order) => toNumber(order.product_data.price))
      .reduce((total, priceItem) => total + priceItem, 0)
      .toFixed(2);

    setTotal(+total);
  }, [orders]);

  return (
    <Form className="create-payment-form-admin" onSubmit={formik.handleSubmit}>
      <p className="create-payment-form-admin__total">
        Total de la cuenta: <span>{total} €</span>
      </p>
      <Dropdown
        fluid
        selection
        search
        onChange={(_, data) => formik.setFieldValue("payment_type", data.value)}
        value={formik.values.payment_type}
        options={[
          {
            key: "CASH",
            text: "Efectivo",
            value: "CASH",
          },
          {
            key: "CARD",
            text: "Tarjeta",
            value: "CARD",
          },
        ]}
        placeholder="Metodo de Pago"
        name="payment_type"
      />
      <Button primary type="submit" content="Generar cuenta" fluid />
    </Form>
  );
};

const initialValues = () => ({
  payment_type: "",
});

const validationSchema = () => ({
  payment_type: Yup.string().min(2).required("Este tipo de pago es requerido"),
});
