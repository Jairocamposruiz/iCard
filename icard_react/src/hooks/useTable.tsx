import { useState } from "react";

import {
  addTableApi,
  editTableApi,
  deleteTableApi,
  getTablesApi,
  getTableByIdApi,
} from "../api";
import { useAuth } from "../context";

export const useTable = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [table, setTable] = useState<Table | null>(null);
  const { auth } = useAuth();

  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi({});
      setTables(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const getTableById = async (id: ID) => {
    try {
      setLoading(true);
      const response = await getTableByIdApi(id);
      setTable(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const addTable = async (data: CreateTable) => {
    try {
      setLoading(true);
      await addTableApi(data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const editTable = async (id: ID, data: EditTable) => {
    try {
      setLoading(true);
      await editTableApi(id, data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const deleteTable = async (id: ID) => {
    try {
      setLoading(true);
      await deleteTableApi(id, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const existTable = async (numberTable: number) => {
    try {
      setLoading(true);
      const response = await getTablesApi({ number: numberTable });
      setLoading(false);
      return response.length > 0;
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const getTableByNumber = async (numberTable: number) => {
    try {
      setLoading(true);
      const response = await getTablesApi({ number: numberTable });
      setLoading(false);
      if (response.length === 0) {
        throw new Error("No existe la mesa");
      }
      return response[0];
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    tables,
    table,
    getTables,
    addTable,
    editTable,
    deleteTable,
    getTableById,
    existTable,
    getTableByNumber,
  };
};
