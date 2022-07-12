import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "semantic-ui-react";

import { useTable } from "../../../hooks";
import "./SelectTable.scss";

export const SelectTable = () => {
  const [tableNum, setTableNum] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { existTable } = useTable();
  const navigate = useNavigate();

  const onSubmit = async () => {
    setError(null);

    if (!tableNum) {
      return setError("No has introducido ninguna mesa");
    }

    const isValidTable = await existTable(tableNum);
    if (!isValidTable) {
      return setError("El número de mesa indicado no existe");
    }

    navigate(`/client/${tableNum}`);
  };
  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a iCard</h1>
        <h2>Introduce tu número de mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Ejemplo: 2, 3, 6, 10"
            type="number"
            onChange={(_, data) => setTableNum(data.value as any)}
          />
          <Button primary fluid content="Entrar" />
        </Form>

        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  );
};
