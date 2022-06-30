import "./HomeAdmin.scss";
import { useAuth } from "../../../context";

export const HomeAdmin = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>Home Admin</h1>
    </div>
  );
};
