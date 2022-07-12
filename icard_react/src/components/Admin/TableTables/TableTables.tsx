import { useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import QRCode from "qrcode.react";

import { BasicModal } from "../../../components/Common";
import "./TableTables.scss";

interface Props {
  tables: Table[];
  updateTable: (table: Table) => void;
  onDeleteTable: (table: Table) => void;
}

export const TableTables = ({ tables, updateTable, onDeleteTable }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(<></>);
  const [titleModal, setTitleModal] = useState("");

  const showQrCode = (table: Table) => {
    setTitleModal(`Código QR de la mesa ${table.number}`);
    setContentModal(
      <div className="table-tables-admin__qrcode">
        <QRCode
          value={`${window.location.origin}/client/${table.number}`}
          size={280}
        />
      </div>
    );
    openCloseModal();
  };

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
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
                showQrCode={showQrCode}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <BasicModal
        title={titleModal}
        children={contentModal}
        show={showModal}
        onClose={openCloseModal}
        size="mini"
      />
    </>
  );
};

interface ActionsProps {
  table: Table;
  updateTable: (table: Table) => void;
  onDeleteTable: (table: Table) => void;
  showQrCode: (table: Table) => void;
}

const Actions = ({
  table,
  updateTable,
  onDeleteTable,
  showQrCode,
}: ActionsProps) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => showQrCode(table)}>
        <Icon name="qrcode" />
      </Button>
      <Button icon onClick={() => updateTable(table)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteTable(table)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
};
