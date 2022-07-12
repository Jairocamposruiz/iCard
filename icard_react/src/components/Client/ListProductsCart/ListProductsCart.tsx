import { useState, useEffect } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useParams, useNavigate } from "react-router-dom";

import {
  addProductCart,
  subtractProductCart,
  deleteProductCart,
  getProductsCart,
  emptyProductsCart,
} from "../../../utils";
import { useOrders, useTable } from "../../../hooks";
import "./ListProductsCart.scss";

interface Props {
  products: ProductWithQuantity[];
  onLoadProducts: () => void;
}

export const ListProductsCart = ({ products, onLoadProducts }: Props) => {
  const [total, setTotal] = useState(0);
  const { tableNumber } = useParams();
  const { addOrdersToTable } = useOrders();
  const { getTableByNumber } = useTable();
  const navigate = useNavigate();

  const onDeleteProduct = (id: ID) => {
    deleteProductCart(id);
    onLoadProducts();
  };

  const onAddProduct = (id: ID) => {
    addProductCart(id);
    onLoadProducts();
  };

  const onSubtractProduct = (id: ID) => {
    subtractProductCart(id);
    onLoadProducts();
  };

  const createOrders = async () => {
    if (!tableNumber) return;
    const table = await getTableByNumber(+tableNumber);
    if (!table) return;
    const idProducts = getProductsCart();
    if (idProducts.length === 0) return;
    await addOrdersToTable(table.id, idProducts);
    emptyProductsCart();
    onLoadProducts();
    navigate(`/client/${tableNumber}/orders`);
  };

  useEffect(() => {
    let amount = 0;
    products.forEach((product) => {
      amount += product.quantity * product.price;
    });
    setTotal(+amount.toFixed(2));
  }, [products]);

  return (
    <div className="list-products-cart-client">
      {map(products, (product) => (
        <div key={product.id} className="list-products-cart-client__product">
          <div className="list-products-cart-client__description">
            <Image src={product.image} avatar />
            <span>{product.title}</span>
          </div>
          <div className="list-products-cart-client__amount">
            <span>{product.quantity} und</span>
            <span>{product.price} €</span>
          </div>
          <div className="list-products-cart-client__buttons">
            <Icon name="minus" onClick={() => onSubtractProduct(product.id)} />
            <Icon name="plus" onClick={() => onAddProduct(product.id)} />
            <Icon name="close" onClick={() => onDeleteProduct(product.id)} />
          </div>
        </div>
      ))}
      <p className="list-products-cart-client__total">
        Total carrito: {total} €
      </p>
      <Button primary fluid onClick={createOrders}>
        Realizar pedido
      </Button>
    </div>
  );
};
