import { useState, useEffect } from "react";
import { size } from "lodash";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";

import { useProduct } from "../../../hooks";
import { getProductsCart } from "../../../utils";
import "./Cart.scss";
import { ListProductsCart } from "../../../components/Client";

export const Cart = () => {
  const [productsCart, setProductsCart] = useState<ProductWithQuantity[]>([]);
  const [loadProducts, setLoadProducts] = useState(false);
  const { getProduct } = useProduct();
  const { tableNumber } = useParams();

  const onLoadProducts = () => {
    setLoadProducts((prevState) => !prevState);
  };

  const getProductsFormatted = async () => {
    const products = getProductsCart();
    const productsSet = new Set(products);
    const productsWithQuantities: ProductWithQuantity[] = [];
    for await (const productID of productsSet) {
      const product = await getProduct(productID);
      if (!product) return;
      productsWithQuantities.push({
        ...product,
        quantity: products.filter((id) => id === productID).length,
      });
    }
    setProductsCart(productsWithQuantities);
  };

  useEffect(() => {
    getProductsFormatted();
  }, [loadProducts]);

  return (
    <div>
      <h1>Carrito</h1>
      {!productsCart ? (
        <p>Cargando...</p>
      ) : size(productsCart) === 0 ? (
        <div className="cart-no-products">
          <p>Tu carrito está vacío</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductsCart
          products={productsCart}
          onLoadProducts={onLoadProducts}
        />
      )}
    </div>
  );
};
