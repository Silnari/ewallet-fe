import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext({ token: null });
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [registerSucess, setRegisterSuccess] = useState("");
  const history = useHistory();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) setToken(tokenFromStorage);
  }, []);

  const logIn = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    history.push("/");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, logIn, logOut, registerSucess, setRegisterSuccess }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
