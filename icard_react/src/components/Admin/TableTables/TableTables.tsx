import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./TableTables.scss";

interface Props {
  tables: Table[];
  updateTable: (table: Table) => void;
  onDeleteTable: (table: Table) => void;
}

export const TableTables = ({ tables, updateTable, onDeleteTable }: Props) => {
  return (
    <Table className="table-tables-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={13}>Mesa Número</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(tables, (table, index) => (
          <Table.Row key={index}>
            <Table.Cell>{table.number}</Table.Cell>
            <Actions
              table={table}
              updateTable={updateTable}
              onDeleteTable={onDeleteTable}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

interface ActionsProps {
  table: Table;
  updateTable: (table: Table) => void;
  onDeleteTable: (table: Table) => void;
}

const Actions = ({ table, updateTable, onDeleteTable }: ActionsProps) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateTable(table)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteTable(table)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
};
