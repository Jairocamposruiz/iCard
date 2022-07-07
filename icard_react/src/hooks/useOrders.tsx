import { useState } from "react";

import {
  getOrdersApi,
  editOrderApi,
  addOrderToTableApi,
  deleteOrderApi,
} from "../api";

export const useOrders = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersPending, setOrdersPending] = useState<Order[]>([]);
  const [ordersDelivered, setOrdersDelivered] = useState<Order[]>([]);

  const getOrders = async (orderFilter?: OrderFilter) => {
    try {
      setLoading(true);
      const response = await getOrdersApi(orderFilter || {});
      setOrders(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const getOrdersPending = async (idTable: ID) => {
    try {
      setLoading(true);
      const response = await getOrdersApi({
        idTable,
        status: "PENDING",
        close: false,
      });
      setOrdersPending(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const getOrdersDelivered = async (idTable: ID) => {
    try {
      setLoading(true);
      const response = await getOrdersApi({
        idTable,
        status: "DELIVERED",
        close: false,
      });
      setOrdersDelivered(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const addOrdersToTable = async (idTable: ID, idProducts: ID[]) => {
    try {
      idProducts.forEach((idProduct) => {
        addOrderToTableApi(idTable, idProduct);
      });
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const editOrder = async (id: ID, data: EditOrder) => {
    try {
      setLoading(true);
      const response = await editOrderApi(id, data);
      setLoading(false);
      return response;
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const checkDeliveredOrder = async (id: ID) => {
    await editOrder(id, {
      status: "DELIVERED",
    });
  };

  const addPaymentToOrders = async (idPayment: ID, orders: Order[]) => {
    orders.forEach((order) => {
      editOrder(order.id, {
        payment: idPayment,
      });
    });
  };

  const deleteOrder = async (id: ID) => {
    try {
      setLoading(true);
      await deleteOrderApi(id);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    orders,
    ordersDelivered,
    ordersPending,
    getOrders,
    getOrdersPending,
    getOrdersDelivered,
    addOrdersToTable,
    editOrder,
    deleteOrder,
    checkDeliveredOrder,
    addPaymentToOrders,
  };
};
