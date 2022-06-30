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
