// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  const [profileImage, setProfileImage] = useState(localStorage.getItem("userImage"));


  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");

    if (token && name && role) {
      setUser({ name, role, token });
      setIsLoggedIn(true);
    }

    setLoading(false); 
  }, []);

  const login = ({ token, name, role }) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
    setUser({ name, role, token });
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout, profileImage, setProfileImage, isAdminLoggedIn: user?.role === "admin", isCustomerLoggedIn: user?.role === "customer" }}>
      {children}
    </AuthContext.Provider>
  );
};
