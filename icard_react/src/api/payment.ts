import { config } from "../config";

export const createPaymentApi = async (data: CreatePayment) => {
  try {
    const url = `${config.baseApi}/api/payments/`;
    const params: RequestInit = {
      method: "POST",
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

export const getPaymentsApi = async (): Promise<Payment[]> => {
  try {
    const statusPaymentFilter = "status_payment=PAID";
    const ordering = "ordering=-created_at";
    const url = `${config.baseApi}/api/payments/?${statusPaymentFilter}&${ordering}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPaymentByTableApi = async (idTable: ID): Promise<Payment[]> => {
  try {
    const tableFilter = `table=${idTable}`;
    const statusPaymentFilter = `status_payment=PENDING`;
    const ordering = "ordering=-created_at";

    const url = `${config.baseApi}/api/payments/?${tableFilter}&${statusPaymentFilter}&${ordering}`;

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const closePaymentApi = async (idPayment: ID): Promise<Payment> => {
  try {
    const url = `${config.baseApi}/api/payments/${idPayment}/`;
    const params: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status_payment: "PAID",
      }),
    };

    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
