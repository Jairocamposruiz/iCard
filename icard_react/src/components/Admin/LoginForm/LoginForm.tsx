import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./LoginForm.scss";
import { loginApi } from "../../../api";
import { useAuth } from "../../../context";

export const LoginForm = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValues) => {
      try {
        const response = await loginApi(formValues);
        const { access } = response;
        login(access);
      } catch (e) {
        const error = e as Error;
        toast.error(error.message);
      }
    },
  });

  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo Electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Button type="submit" content="Iniciar sesión" primary fluid />
    </Form>
  );
};

const initialValues = () => {
  return {
    email: "Jairo@gmail.com",
    password: "Jairo123456",
  };
};

const validationSchema = () => {
  return {
    email: Yup.string().email("Necesita ser un email válido").required(),
    password: Yup.string().required("La contraseña es requerida"),
  };
};
