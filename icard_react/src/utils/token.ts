const KEY_TOKEN = "TOKEN";

export const setToken = (token: Token) => {
  localStorage.setItem(KEY_TOKEN, token);
};

export const getToken = (): Token | null => {
  return localStorage.getItem(KEY_TOKEN);
};

export const deleteToken = (): void => {
  localStorage.removeItem(KEY_TOKEN);
};
