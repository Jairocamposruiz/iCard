import { useState } from "react";

import {
  getProductsApi,
  addProductApi,
  editProductApi,
  deleteProductApi,
} from "../api";
import { useAuth } from "../context";

export const useProduct = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setProducts(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const addProduct = async (data: CreateProduct) => {
    try {
      setLoading(true);
      await addProductApi(data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const editProduct = async (id: ID, data: EditProduct) => {
    try {
      setLoading(true);
      await editProductApi(id, data, auth!.token);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const deleteProduct = async (id: ID) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth!.token);
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
    products,
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
  };
};
