import { config } from "../config";

export const getProductsApi = async (): Promise<Product[]> => {
  try {
    const url = `${config.baseApi}/api/products/`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getProductApi = async (id: ID): Promise<Product> => {
  try {
    const url = `${config.baseApi}/api/products/${id}/`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getActiveProductsApi = async (): Promise<Product[]> => {
  try {
    const activeFilter = `active=true`;
    const url = `${config.baseApi}/api/products/?${activeFilter}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addProductApi = async (
  data: CreateProduct,
  token: Token
): Promise<Product> => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("price", data.price.toString());
    formData.append("active", data.active as any);
    formData.append("category", data.category.toString());

    const url = `${config.baseApi}/api/products/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const editProductApi = async (
  id: ID,
  data: EditProduct,
  token: Token
): Promise<Product> => {
  try {
    const formData = new FormData();
    if (!!data.title) formData.append("title", data.title);
    if (!!data.image) formData.append("image", data.image);
    if (!!data.price) formData.append("price", data.price.toString());
    formData.append("active", data.active as any);
    if (!!data.category) formData.append("category", data.category.toString());

    const url = `${config.baseApi}/api/products/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteProductApi = async (id: ID, token: Token) => {
  try {
    const url = `${config.baseApi}/api/products/${id}/`;
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

export const getProductsByCategoryApi = async (categoryId: ID) => {
  try {
    const categoryFilter = `category=${categoryId}`;
    const activeFilter = `active=True`;

    const url = `${config.baseApi}/api/products/?${categoryFilter}&${activeFilter}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
