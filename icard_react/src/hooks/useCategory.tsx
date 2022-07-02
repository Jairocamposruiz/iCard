import { useState } from "react";

import {
  addCategoryApi,
  getCategoriesApi,
  editCategoryApi,
  deleteCategoryApi,
} from "../api";
import { useAuth } from "../context";

export const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { auth } = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setCategories(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const addCategory = async (data: CreateCategory) => {
    try {
      setLoading(true);
      await addCategoryApi(data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const editCategory = async (id: number, data: EditCategory) => {
    try {
      setLoading(true);
      await editCategoryApi(id, data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      setLoading(true);
      await deleteCategoryApi(id, auth!.token);
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
    categories,
    getCategories,
    addCategory,
    editCategory,
    deleteCategory,
  };
};
