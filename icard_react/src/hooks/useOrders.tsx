import { useState } from "react";

import { getOrdersApi } from "../api";

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
      });
      setOrdersDelivered(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const addOrder = async () => {};

  const editOrder = async () => {};

  const deleteOrder = async () => {};

  return {
    loading,
    error,
    orders,
    ordersDelivered,
    ordersPending,
    getOrders,
    getOrdersPending,
    getOrdersDelivered,
    addOrder,
    editOrder,
    deleteOrder,
  };
};
