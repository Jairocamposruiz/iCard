import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";

import { deleteToken, getToken, setToken } from "../utils";
import { useUser } from "../hooks";

interface AuthContextValue {
  auth: Auth | undefined;
  login: (token: Token) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextValue);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth | undefined>(undefined);
  const { getMe } = useUser();

  const login = async (token: string) => {
    setToken(token);
    const me = await getMe(token);
    setAuth({ token, me });
  };

  const logout = () => {
    if (auth) {
      setAuth(undefined);
    }
    deleteToken();
  };

  const valueContext: AuthContextValue = {
    auth,
    login,
    logout,
  };

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        login(token);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
