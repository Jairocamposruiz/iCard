import { config } from "../config";

export const loginApi = async (formValues: {
  email: string;
  password: string;
}): Promise<{ refresh: Token; access: Token }> => {
  try {
    const url = `${config.baseApi}/api/auth/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getMeApi = async (token: Token): Promise<User> => {
  try {
    const url = `${config.baseApi}/api/auth/me/`;
    const params = {
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

export const getUsersApi = async (token: Token): Promise<User[]> => {
  try {
    const url = `${config.baseApi}/api/users/`;
    const params = {
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

export const addUserApi = async (
  data: CreateUser,
  token: Token
): Promise<User> => {
  try {
    const url = `${config.baseApi}/api/users/`;
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

export const editUserApi = async (
  id: number,
  data: EditUser,
  token: Token
): Promise<User> => {
  try {
    const url = `${config.baseApi}/api/users/${id}/`;
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

export const deleteUserApi = async (id: number, token: Token) => {
  try {
    const url = `${config.baseApi}/api/users/${id}/`;
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
