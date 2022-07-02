import { ReactNode, useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";

import {
  AddEditCategoryForm,
  HeaderPage,
  TableCategory,
} from "../../../components/Admin";
import { BasicModal } from "../../../components/Common";
import { useCategory } from "../../../hooks";
import "./CategoriesAdmin.scss";
import { toast } from "react-toastify";

export const CategoriesAdmin = () => {
  const [titleModal, setTitleModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<ReactNode>(<></>);
  const { getCategories, categories, loading, deleteCategory } = useCategory();
  const [reFetch, setReFetch] = useState(false);

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onReFetch = () => {
    setReFetch((prevState) => !prevState);
  };

  const addCategory = () => {
    setTitleModal("Nueva Categoría");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onReFetch={onReFetch} />
    );
    openCloseModal();
  };

  const updateCategory = (category: Category) => {
    setTitleModal(`Actualizar Categoría: ${category.title}`);
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onReFetch={onReFetch}
        category={category}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (category: Category) => {
    const result = window.confirm(
      `¿Desea eliminar la categoría: ${category.title}?`
    );
    if (!result) return;

    try {
      await deleteCategory(category.id);
      onReFetch();
      toast.success("Categoría eliminada correctamente.");
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, [reFetch]);

  return (
    <>
      <HeaderPage
        title={"Categorías"}
        btnTitle={"Nueva Categoría"}
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategory
          categories={categories}
          updateCategory={updateCategory}
          onDeleteCategory={onDeleteCategory}
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
