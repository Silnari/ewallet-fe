import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext({ token: null });
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) setToken(tokenFromStorage);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    history.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
