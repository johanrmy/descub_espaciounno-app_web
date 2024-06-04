import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "@auth/cookie";

interface UserData {
  email: string;
  full_name: string;
  profile_photo: string;
  is_superadmin: boolean;
}

interface AuthContextType {
  token: string;
  user: UserData | null;
  loginAction: (data: { email: string; password: string }) => Promise<boolean>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromCookie = getCookie("site");
    const userDataFromCookie = getCookie("user");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
    if (userDataFromCookie) {
      setUser(JSON.parse(userDataFromCookie));
    }
  }, []);

  const loginAction = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/descub`, data);
      const { token, user: userData } = response.data;
      if (token && userData) {
        setUser(userData);
        setToken(token);
        setCookie("site", token, 1);
        setCookie("user", JSON.stringify(userData), 1);
        navigate("/dashboard");
        return true
      }
    } catch (err) {
      console.error(err);
    }
    return false
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    deleteCookie("site");
    deleteCookie("user");
    navigate("/login");
  };

  const contextValue: AuthContextType = {
    token,
    user,
    loginAction,
    logOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
