import { useState } from "react";

import { getMeApi, getUsersApi } from "../api";
import { useAuth } from "../context";

export const useUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { auth } = useAuth();

  const getMe = async (token: Token) => {
    try {
      return await getMeApi(token);
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth!.token);
      setLoading(false);
      setUsers(response);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    users,
    getMe,
    getUsers,
  };
};
