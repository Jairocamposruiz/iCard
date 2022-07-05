import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useTable } from "../../../hooks";
import "./AddEditTableForm.scss";

interface Props {
  onClose: () => void;
  onReFetch: () => void;
  table?: Table;
}

export const AddEditTableForm = ({ onClose, onReFetch, table }: Props) => {
  const { addTable, editTable } = useTable();
  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(
      !table ? newTableValidationSchema() : updateTableValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (!table) {
          await addTable(formValues);
          toast.success("Mesa creada correctamente");
        } else {
          await editTable(table.id, formValues);
          toast.success("Mesa actualizada correctamente");
        }

        onReFetch();
        onClose();
      } catch (e) {
        const error = e as Error;
        toast.error(error.message);
      }
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        label={"Número de la mesa"}
        name="number"
        placeholder="Número de la mesa"
        type="number"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />

      <Button
        type="submit"
        fluid
        primary
        content={!table ? "Crear" : "Editar"}
      />
    </Form>
  );
};

const initialValues = (table?: Table) => {
  return {
    number: table?.number || 0,
  };
};

const newTableValidationSchema = () => {
  return {
    number: Yup.number()
      .moreThan(0, "La mesa tiene que tener un numero superior a 0")
      .required("El número es requerido"),
  };
};

const updateTableValidationSchema = () => {
  return {
    number: Yup.number().moreThan(
      0,
      "La mesa tiene que tener un numero superior a 0"
    ),
  };
};
