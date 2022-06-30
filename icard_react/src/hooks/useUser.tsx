import { getMeApi } from "../api";

export const useUser = () => {
  const getMe = async (token: Token) => {
    try {
      return await getMeApi(token);
    } catch (error) {
      throw error;
    }
  };

  return {
    getMe,
  };
};
