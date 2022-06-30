import { useUser } from "../../../hooks";
import "./UsersAdmin.scss";
import { useEffect } from "react";

export const UsersAdmin = () => {
  const { loading, users, getUsers } = useUser();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>User Admin</h1>
    </div>
  );
};
