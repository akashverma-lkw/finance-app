import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // contains name, role, token
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");

    if (token && name && role) {
      setUser({ name, role, token });
      setIsLoggedIn(true);
    }
  }, []);

  const login = ({ token, name, role }) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);

    setUser({ name, role, token });
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    setUser(null);
    setIsLoggedIn(false);
  };

  const isAdminLoggedIn = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isAdminLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
