import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useUser } from "../../../hooks";
import "./AddEditUserForm.scss";

interface Props {
  onClose: () => void;
  onReFetch: () => void;
  user?: User;
}

export const AddEditUserForm = ({ onClose, onReFetch, user }: Props) => {
  const { addUser, editUser } = useUser();

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(
      !user ? newUserValidationSchema() : updateUserValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (!user) {
          await addUser(formValues);
          toast.success("Usuario creado correctamente.");
        } else {
          await editUser(user.id, formValues);
          toast.success("Usuario actualizado correctamente.");
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
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="username"
        placeholder="Nombre de usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="first_name"
        placeholder="Nombre"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.errors.first_name}
      />
      <Form.Input
        name="last_name"
        placeholder="Apellidos"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.errors.last_name}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="add-edit-user-form__active">
        <Checkbox
          label="Usuario Activo"
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
        />
      </div>

      <div className="add-edit-user-form__staff">
        <Checkbox
          label="Usuario Aministrador"
          toggle
          checked={formik.values.is_staff}
          onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)}
        />
      </div>

      <Button
        type="submit"
        content={!user ? "Crear" : "Editar"}
        primary
        fluid
      />
    </Form>
  );
};

const initialValues = (user?: User) => {
  if (!user) {
    return {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      is_active: true,
      is_staff: false,
    };
  } else {
    return {
      ...user,
      password: "",
    };
  }
};

const newUserValidationSchema = () => {
  return {
    username: Yup.string().required("El nombre de usuario es requerido"),
    email: Yup.string()
      .email("Necesita ser un email válido")
      .required("El email es requerido"),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required("La contraseña es requerida"),
    is_active: Yup.boolean().required(),
    is_staff: Yup.boolean().required(),
  };
};

const updateUserValidationSchema = () => {
  return {
    username: Yup.string().required("El nombre de usuario es requerido"),
    email: Yup.string()
      .email("Necesita ser un email válido")
      .required("El email es requerido"),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string(),
    is_active: Yup.boolean().required(),
    is_staff: Yup.boolean().required(),
  };
};
