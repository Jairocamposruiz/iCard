import { useCallback, useState, useEffect } from "react";
import { Form, Image, Button, Dropdown, Checkbox } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { map } from "lodash";

import { useProduct, useCategory } from "../../../hooks";
import "./AddEditProductForm.scss";

interface Props {
  onClose: () => void;
  onReFetch: () => void;
  product?: Product;
}

export const AddEditProductForm = ({ onClose, onReFetch, product }: Props) => {
  const [previewImage, setPreviewImage] = useState(product?.image || "");
  const [categoriesFormat, setCategoriesFormat] = useState<
    { text: string; value: number; key: number }[]
  >([]);
  const { addProduct, editProduct } = useProduct();
  const { getCategories, categories } = useCategory();
  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(
      !product ? newProductValidationSchema() : updateProductValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (!product) {
          await addProduct(formValues as CreateProduct);
          toast.success("Producto creado correctamente");
        } else {
          await editProduct(product.id, formValues as EditProduct);
          toast.success("Producto actualizado correctamente");
        }
        onReFetch();
        onClose();
      } catch (e) {
        const error = e as Error;
        toast.error(error.message);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile: File[]) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    const fileUrl = URL.createObjectURL(file);
    setPreviewImage(fileUrl);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".webp"],
    },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        label="Precio"
        name="price"
        type="number"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="Categoria"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        error={!!formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />
      <Checkbox
        className="add-edit-product-form__active"
        label="Producto activo"
        toggle
        checked={formik.values.active}
        onChange={(_, data) => formik.setFieldValue("active", data.checked)}
      />

      <Button
        type="button"
        fluid
        {...(getRootProps() as any)}
        content={previewImage ? "Cambiar imágen" : "Subir imágen"}
        color={formik.errors.image && "red"}
      />

      <input {...getInputProps()} />

      <Image src={previewImage} fluid />

      <Button
        type="submit"
        fluid
        primary
        content={!product ? "Crear" : "Editar"}
      />
    </Form>
  );
};

const initialValues = (product?: Product) => {
  return {
    title: product?.title || "",
    image: "" as unknown,
    price: product?.price || 0,
    active: product?.active,
    category: product?.category || 0,
  };
};

const newProductValidationSchema = () => {
  return {
    title: Yup.string().required("El titulo del producto es requerido"),
    image: Yup.string().required("La imagen es requerida"),
    price: Yup.number()
      .moreThan(0, "El producto tiene que tener un valor superior a 0")
      .required("El valor es requerido"),
    active: Yup.boolean(),
    category: Yup.number()
      .moreThan(0)
      .required("Es necesario seleccionar una categoría"),
  };
};

const updateProductValidationSchema = () => {
  return {
    title: Yup.string(),
    image: Yup.string(),
    price: Yup.number().moreThan(
      0,
      "El producto tiene que tener un valor superior a 0"
    ),
    active: Yup.boolean(),
    category: Yup.number(),
  };
};

const formatDropdownData = (categories: Category[]) => {
  return map(categories, (category) => {
    return {
      key: category.id,
      text: category.title,
      value: category.id,
    };
  });
};
