import { config } from "../config";

export const getOrdersApi = async ({
  idTable = "",
  status = "",
  close = "",
  order = "",
}: OrderFilter): Promise<Order[]> => {
  try {
    const tableFilter = `table=${idTable}`;
    const statusFilter = `status=${status}`;
    const closeFilter = `close=${close}`;
    const ordering = `ordering=${order}`;

    const url = `${config.baseApi}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const editOrderApi = async (id: ID, data: EditOrder): Promise<Order> => {
  try {
    const url = `${config.baseApi}/api/orders/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addOrderToTableApi = async (
  idTable: ID,
  idProduct: ID
): Promise<void> => {
  try {
    const url = `${config.baseApi}/api/orders/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "PENDING",
        table: idTable,
        product: idProduct,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
};
