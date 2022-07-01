import { ReactNode, useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { toast } from "react-toastify";

import { useUser } from "../../../hooks";
import {
  HeaderPage,
  TableUsers,
  AddEditUserForm,
} from "../../../components/Admin";
import { BasicModal } from "../../../components/Common";
import "./UsersAdmin.scss";

export const UsersAdmin = () => {
  const [titleModal, setTitleModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<ReactNode>(<></>);
  const { loading, users, getUsers, deleteUser } = useUser();
  const [reFetch, setReFetch] = useState(false);

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onReFetch = () => {
    setReFetch((prevState) => !prevState);
  };

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onReFetch={onReFetch} />
    );
    openCloseModal();
  };

  const updateUser = (user: User) => {
    setTitleModal(`Actualizar Usuario: ${user.username}`);
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onReFetch={onReFetch}
        user={user}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (user: User) => {
    const result = window.confirm(
      `¿Desea eliminar el usuario: ${user.username}?`
    );
    if (!result) return;

    try {
      await deleteUser(user.id);
      onReFetch();
      toast.success("Usuario eliminado correctamente.");
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [reFetch]);

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={addUser}
      />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
      )}

      <BasicModal show={showModal} title={titleModal} onClose={openCloseModal}>
        {contentModal}
      </BasicModal>
    </>
  );
};
