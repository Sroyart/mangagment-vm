"use client";
import { createContext, useState, useCallback } from "react";
import { getCookie, deleteCookie, setCookie } from "cookies-next";

const initialJWT = getCookie("session_JWT");

export const AppContext = createContext(null);

export const AppContextProvider = (props: any) => {
  const [jwt, setJWT] = useState(initialJWT);

  const login = useCallback((jwt: string) => {
    setCookie("session_JWT", jwt);
    setJWT(jwt);
  }, []);
  const logout = () => {
    deleteCookie("session_JWT");
    setJWT(null);
  };

  return <AppContext.Provider {...props} value={{ login, logout, jwt }} />;
};
