import { useEffect, useState } from "react";
import { Form, Image, Button, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from "lodash";

import { useProduct, useOrders } from "../../../hooks";
import "./AddOrderForm.scss";

interface Props {
  idTable: ID;
  openCloseModal: () => void;
  onReloadOrders: () => void;
}

export const AddOrderForm = ({
  idTable,
  openCloseModal,
  onReloadOrders,
}: Props) => {
  const { products, getProducts } = useProduct();
  const { addOrdersToTable } = useOrders();
  const [productsFormat, setProductsFormat] = useState<
    { text: string; value: number; key: number }[]
  >([]);
  const [productsData, setProductsData] = useState<ProductWithQuantity[]>([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      await addOrdersToTable(idTable, formValues.products);
      onReloadOrders();
      openCloseModal();
    },
  });

  const addProduct = (idProduct: ID) => {
    formik.setFieldValue("products", [...formik.values.products, idProduct]);
    const product = products.find((item) => item.id === idProduct);
    if (!product) return;

    const existInList = productsData.find((item) => item.id === idProduct);
    if (existInList) {
      let products = [...productsData];
      products = products.map((item) => {
        if (item.id === idProduct) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setProductsData([...products]);
    } else {
      setProductsData((prevState) => [
        ...prevState,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const subtractProduct = (idProduct: ID) => {
    let formikValues: number[] = formik.values.products;
    const productIndex = formikValues.findIndex((item) => item === idProduct);
    formikValues.splice(productIndex, 1);
    formik.setFieldValue("products", [...formikValues]);

    const product = productsData.find((item) => item.id === idProduct);
    const isMoreThanOne = product!.quantity > 1;
    let products: ProductWithQuantity[] = [...productsData];

    if (isMoreThanOne) {
      products = products.map((product) => {
        if (product.id !== idProduct) return product;
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      });
    } else {
      const index = products.findIndex((item) => item.id === idProduct);
      products.splice(index, 1);
    }

    setProductsData(products);
  };

  const deleteProduct = (idProduct: ID) => {
    let formikValues = formik.values.products;
    formikValues = formikValues.filter((item) => item !== idProduct);
    formik.setFieldValue("products", [...formikValues]);

    let products = [...productsData];
    products = products.filter((item) => item.id !== idProduct);
    setProductsData(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProductsFormat(formatDropdownData(products));
  }, [products]);

  return (
    <Form className="add-order-form-admin" onSubmit={formik.handleSubmit}>
      <Dropdown
        fluid
        selection
        search
        options={productsFormat}
        value={false}
        placeholder="Productos"
        name="products"
        onChange={(_, data) => addProduct(data.value as number)}
      />

      <div className="add-order-form-admin__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form-admin__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <div>
              <span>{product.quantity} und</span>
              <Button
                type="button"
                content="-1"
                basic
                color="red"
                onClick={() => subtractProduct(product.id)}
              />
              <Button
                type="button"
                content="+1"
                basic
                color="green"
                onClick={() => addProduct(product.id)}
              />
              <Button
                type="button"
                content={"Eliminar"}
                basic
                color="red"
                onClick={() => deleteProduct(product.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        primary
        type="submit"
        content="Añadir productos a la mesa"
        fluid
      />
    </Form>
  );
};

const formatDropdownData = (products: Product[]) => {
  return map(products, (product) => ({
    key: product.id,
    text: product.title,
    value: product.id,
  }));
};

const initialValues = () => {
  return {
    products: [],
  };
};

const validationSchema = () => {
  return {
    products: Yup.array()
      .min(1, "Tiene que escoger al menos un producto")
      .required("Tiene que escoger al menos un producto"),
  };
};
