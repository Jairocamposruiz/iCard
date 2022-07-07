import { useState } from "react";

import {
  createPaymentApi,
  getPaymentByTableApi,
  closePaymentApi,
} from "../api";
import { useAuth } from "../context";
import { useOrders } from "./useOrders";

export const usePayment = () => {
  const [error, setError] = useState<Error | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const { auth } = useAuth();
  const { editOrder } = useOrders();

  const createPayment = async (data: CreatePayment) => {
    try {
      return await createPaymentApi(data, auth!.token);
    } catch (e) {
      const error = e as Error;
      setError(error);
    }
  };

  const getPaymentByTable = async (idTable: ID) => {
    try {
      const payments = await getPaymentByTableApi(idTable);
      return payments[0];
    } catch (e) {
      const error = e as Error;
      setError(error);
    }
  };

  const closePayment = async (idPayment: ID, orders: Order[]) => {
    try {
      await closePaymentApi(idPayment, auth!.token);

      orders.forEach((order) => {
        editOrder(order.id, { close: true });
      });
    } catch (e) {
      const error = e as Error;
      setError(error);
    }
  };

  return {
    error,
    payments,
    createPayment,
    getPaymentByTable,
    closePayment,
  };
};
