import { Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { toast } from "react-toastify";

import { addProductCart } from "../../../utils";
import "./ListProducts.scss";

interface Props {
  products: Product[];
}

export const ListProducts = ({ products }: Props) => {
  const addCart = (product: Product) => {
    addProductCart(product.id);
    toast.success(`${product.title} añadido al carrito.`);
  };

  return (
    <div className="list-products-client">
      {map(products, (product) => (
        <div key={product.id} className="list-products-client__product">
          <div>
            <Image src={product.image} />
            <div className="list-products-client__product-description">
              <h4>{product.title}</h4>
              <span>{product.price} €</span>
            </div>
          </div>
          <Button primary icon onClick={() => addCart(product)}>
            <Icon name="add" />
          </Button>
        </div>
      ))}
    </div>
  );
};
