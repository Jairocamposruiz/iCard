import { useCallback, useState } from "react";
import { Form, Image, Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useCategory } from "../../../hooks";
import "./AddEditCategoryForm.scss";

interface Props {
  onClose: () => void;
  onReFetch: () => void;
  category?: Category;
}

export const AddEditCategoryForm = ({
  category,
  onClose,
  onReFetch,
}: Props) => {
  const [previewImage, setPreviewImage] = useState(category?.image || "");
  const { addCategory, editCategory } = useCategory();
  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(
      !category
        ? newCategoryValidationSchema()
        : updateCategoryValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (!category) {
          await addCategory(formValues as CreateCategory);
          toast.success("Categoria creado correctamente.");
        } else {
          await editCategory(category.id, formValues as EditCategory);
          toast.success("Categoria actualizado correctamente.");
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
    const fileUrl = URL.createObjectURL(file);
    await formik.setFieldValue("image", file);
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

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre de la categoría"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
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
        content={!category ? "Crear" : "Editar"}
      />
    </Form>
  );
};

const initialValues = (category?: Category) => {
  return {
    title: category?.title || "",
    image: "" as unknown,
  };
};

const newCategoryValidationSchema = () => {
  return {
    title: Yup.string().required("El nombre de la categoría es requerido"),
    image: Yup.string().required("La imagen es requerida"),
  };
};

const updateCategoryValidationSchema = () => {
  return {
    title: Yup.string(),
    image: Yup.string(),
  };
};
