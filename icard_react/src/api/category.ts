import { config } from "../config";

export const getCategoriesApi = async (): Promise<Category[]> => {
  try {
    const url = `${config.baseApi}/api/categories/`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addCategoryApi = async (
  data: CreateCategory,
  token: Token
): Promise<Category> => {
  try {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);

    const url = `${config.baseApi}/api/categories/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    console.log(await response.json());
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const editCategoryApi = async (
  id: number,
  data: EditCategory,
  token: Token
): Promise<Category> => {
  try {
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.title) {
      formData.append("title", data.title);
    }

    const url = `${config.baseApi}/api/categories/${id}/`;
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

export const deleteCategoryApi = async (id: number, token: Token) => {
  try {
    const url = `${config.baseApi}/api/categories/${id}/`;
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
