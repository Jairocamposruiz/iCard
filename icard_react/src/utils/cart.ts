const KEY_PRODUCTS_CART = "PRODUCTS_CART";

export const addProductCart = (idProduct: ID): void => {
  const products = getProductsCart();
  products.push(idProduct);
  products.sort();
  localStorage.setItem(KEY_PRODUCTS_CART, JSON.stringify(products));
};

export const subtractProductCart = (idProduct: ID): void => {
  const products = getProductsCart();
  const index = products.findIndex((id) => id === idProduct);
  products.splice(index, 1);
  products.sort();
  localStorage.setItem(KEY_PRODUCTS_CART, JSON.stringify(products));
};

export const deleteProductCart = (idProduct: ID): void => {
  let products = getProductsCart();
  products = products.filter((id) => id !== idProduct);
  products.sort();
  localStorage.setItem(KEY_PRODUCTS_CART, JSON.stringify(products));
};

export const getProductsCart = (): number[] => {
  const response = localStorage.getItem(KEY_PRODUCTS_CART);
  return JSON.parse(response || "[]");
};

export const emptyProductsCart = (): void => {
  localStorage.removeItem(KEY_PRODUCTS_CART);
};
