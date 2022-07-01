import { useState } from "react";

import {
  getMeApi,
  getUsersApi,
  addUserApi,
  editUserApi,
  deleteUserApi,
} from "../api";
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

  const addUser = async (data: CreateUser) => {
    try {
      setLoading(true);
      await addUserApi(data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const editUser = async (id: number, data: EditUser) => {
    try {
      setLoading(true);
      await editUserApi(id, data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth!.token);
      setLoading(false);
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
    addUser,
    editUser,
    deleteUser,
  };
};
