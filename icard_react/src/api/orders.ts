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
