import { useParams } from "react-router-dom";

import "./TableDetailsAdmin.scss";

export const TableDetailsAdmin = () => {
  const { id } = useParams();

  return <>Table Details Admin id {id}</>;
};
