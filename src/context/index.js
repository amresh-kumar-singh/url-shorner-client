import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const User = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [remember, setRemember] = useState(false);
  const [storage, setStorage] = useLocalStorage("url✂️", []);
  // const refresh = useRefresh();
  // Incase of Remember me
  useEffect(() => {
    console.log("Remember me");
  }, []);

  return (
    <User.Provider
      value={{ user, setUser, remember, setRemember, storage, setStorage }}
    >
      {children}
    </User.Provider>
  );
};

export default UserContext;

export function UserState() {
  return useContext(User);
}
