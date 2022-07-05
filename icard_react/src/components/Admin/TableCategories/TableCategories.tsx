import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./TableCategories.scss";

interface Props {
  categories: Category[];
  updateCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
}

export const TableCategories = ({
  categories,
  updateCategory,
  onDeleteCategory,
}: Props) => {
  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Categoría</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(categories, (category, index) => (
          <Table.Row key={index}>
            <Table.Cell width={3}>
              <Image src={category.image} />
            </Table.Cell>
            <Table.Cell width={10}>{category.title}</Table.Cell>
            <Actions
              category={category}
              onDeleteCategory={onDeleteCategory}
              updateCategory={updateCategory}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

interface ActionsProps {
  category: Category;
  updateCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
}

const Actions = ({
  category,
  updateCategory,
  onDeleteCategory,
}: ActionsProps) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateCategory(category)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteCategory(category)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
};
