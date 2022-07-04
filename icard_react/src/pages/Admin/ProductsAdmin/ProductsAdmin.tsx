import { ReactNode, useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { toast } from "react-toastify";

import {
  HeaderPage,
  TableProducts,
  AddEditProductForm,
} from "../../../components/Admin";
import { BasicModal } from "../../../components/Common";
import { useProduct } from "../../../hooks";
import "./ProductsAdmin.scss";

export const ProductsAdmin = () => {
  const [titleModal, setTitleModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<ReactNode>(<></>);
  const { loading, products, getProducts, deleteProduct } = useProduct();
  const [reFetch, setReFetch] = useState(false);

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onReFetch = () => {
    setReFetch((prevState) => !prevState);
  };

  const addProduct = () => {
    setTitleModal("Nuevo Producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onReFetch={onReFetch} />
    );
    openCloseModal();
  };

  const updateProduct = (product: Product) => {
    setTitleModal(`Actualizar Producto: ${product.title}`);
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onReFetch={onReFetch}
        product={product}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (product: Product) => {
    const result = window.confirm(
      `¿Desea eliminar el producto: ${product.title}?`
    );
    if (!result) return;

    try {
      await deleteProduct(product.id);
      onReFetch();
      toast.success("Producto eliminado correctamente.");
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [reFetch]);

  return (
    <>
      <HeaderPage
        title="Productos"
        btnTitle="Nuevo producto"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProducts
          products={products}
          onDeleteProduct={onDeleteProduct}
          updateProduct={updateProduct}
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
