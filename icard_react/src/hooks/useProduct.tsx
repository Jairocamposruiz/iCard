import { useState } from "react";

import {
  getProductsApi,
  getProductApi,
  addProductApi,
  editProductApi,
  deleteProductApi,
  getActiveProductsApi,
  getProductsByCategoryApi,
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

  const getProduct = async (id: ID) => {
    try {
      setLoading(true);
      const response = await getProductApi(id);
      setLoading(false);
      return response;
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

  const getActiveProducts = async () => {
    try {
      setLoading(true);
      const response = await getActiveProductsApi();
      console.log(response);
      setProducts(response);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
  };

  const getProductsByCategory = async (categoryId: ID) => {
    try {
      setLoading(true);
      const response = await getProductsByCategoryApi(categoryId);
      setProducts(response);
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
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
    getActiveProducts,
    getProductsByCategory,
  };
};
