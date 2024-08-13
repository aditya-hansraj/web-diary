import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/services";

const BASE_URL = "http://localhost:5000/api/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const updateLoginInfo = useCallback(
    (info: { username: string; password: string }) => {
      setLoginInfo(info);
    },
    []
  );

  const updateRegisterInfo = useCallback(
    (info: { username: string; email: string; password: string }) => {
      setRegisterInfo(info);
    },
    []
  );

  const login = useCallback(
    async (event: any) => {
      event.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${BASE_URL}/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);
      setLoginInfo({
        username: "",
        password: "",
      });

      if (response.error) return setLoginError(response.error);

      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(response.data.user);
      setIsAuthenticated(true);
    },
    [loginInfo]
  );

  const register = useCallback(
    async (event: any) => {
      event.preventDefault();
      setIsRegisterLoading(false);
      setRegisterError(null);

      const response = await postRequest(
        `${BASE_URL}/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);
      setRegisterInfo({
        username: "",
        email: "",
        password: "",
      });

      if (response.error) return setRegisterError(response.error);

      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(response.data.user);
      setIsAuthenticated(true);
    },
    [registerInfo]
  );

  const logout = async () => {
    try {
      await postRequest(`${BASE_URL}/logout`, JSON.stringify({}));
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
        loginError,
        registerInfo,
        updateRegisterInfo,
        isRegisterLoading,
        registerError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// types
interface AuthContextType {
  user: User | null;
  login: (event: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loginInfo: { username: string; password: string };
  updateLoginInfo: (info: { username: string; password: string }) => void;
  loginError: string | null;
  isLoginLoading: boolean;
  register: (event: any) => Promise<void>;
  updateRegisterInfo: (info: {username: string;email: string;password: string;}) => void;
  registerInfo: { username: string; email: string; password: string };
  isRegisterLoading: boolean;
  registerError: string | null;
}

interface Activity {
  name: string;
  link: string;
  timestamp: Date;
}

interface User {
  id: string;
  username: string;
  email: string;
  activities: Activity[];
}
