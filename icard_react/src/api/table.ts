import { config } from "../config";

export const getTablesApi = async (token: Token): Promise<Table[]> => {
  try {
    const url = `${config.baseApi}/api/tables/`;
    const params = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addTableApi = async (
  data: CreateTable,
  token: Token
): Promise<Table> => {
  try {
    const url = `${config.baseApi}/api/tables/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

export const editTableApi = async (
  id: ID,
  data: EditTable,
  token: Token
): Promise<Table> => {
  try {
    const url = `${config.baseApi}/api/tables/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
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

export const deleteTableApi = async (id: ID, token: Token) => {
  try {
    const url = `${config.baseApi}/api/tables/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
