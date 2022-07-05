import { ReactNode, useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { toast } from "react-toastify";

import {
  HeaderPage,
  TableTables,
  AddEditTableForm,
} from "../../../components/Admin";
import { BasicModal } from "../../../components/Common";
import { useTable } from "../../../hooks";
import "./TablesAdmin.scss";

export const TablesAdmin = () => {
  const [titleModal, setTitleModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<ReactNode>(<></>);
  const { getTables, tables, loading, deleteTable } = useTable();
  const [reFetch, setReFetch] = useState(false);

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onReFetch = () => {
    setReFetch((prevState) => !prevState);
  };

  const addTable = () => {
    setTitleModal("Nueva Mesa");
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onReFetch={onReFetch} />
    );
    openCloseModal();
  };

  const updateTable = (table: Table) => {
    setTitleModal(`Nueva Mesa: ${table.number}`);
    setContentModal(
      <AddEditTableForm
        onClose={openCloseModal}
        onReFetch={onReFetch}
        table={table}
      />
    );
    openCloseModal();
  };

  const onDeleteTable = async (table: Table) => {
    const result = window.confirm(`¿Desea eliminar la mesa: ${table.number}?`);
    if (!result) return;

    try {
      await deleteTable(table.id);
      onReFetch();
      toast.success("Mesa eliminada correctamente");
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getTables();
  }, [reFetch]);

  return (
    <>
      <HeaderPage title="Mesas" btnTitle="Nueva Mesa" btnClick={addTable} />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableTables
          tables={tables}
          updateTable={updateTable}
          onDeleteTable={onDeleteTable}
        />
      )}
      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
};
