import React, { createContext, useState, useEffect } from "react";
export const ContextLogin = createContext();

export const LoginContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("isLogin")));
  }, []);

  const saveLoCal = (object) => {
    localStorage.setItem("isLogin", JSON.stringify(object));
    setIsLogin(object);
  };

  const logout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(null);
  };

  return (
    <ContextLogin.Provider value={{ isLogin, setIsLogin, saveLoCal, logout }}>
      {children}
    </ContextLogin.Provider>
  );
};
