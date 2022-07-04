import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./TableProducts.scss";

interface Props {
  products: Product[];
  updateProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export const TableProducts = ({
  products,
  updateProduct,
  onDeleteProduct,
}: Props) => {
  return (
    <Table className="table-products-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoría</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(products, (product, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Image src={product.image} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>{product.price} €</Table.Cell>
            <Table.Cell>{product.category_data.title}</Table.Cell>
            <Table.Cell className="status">
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Actions
              product={product}
              updateProduct={updateProduct}
              onDeleteProduct={onDeleteProduct}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

interface ActionsProps {
  product: Product;
  updateProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

const Actions = ({ product, updateProduct, onDeleteProduct }: ActionsProps) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateProduct(product)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteProduct(product)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
};
