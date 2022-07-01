import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const User = createContext();
const initailState = {
  error: "",
  user: {},
  message: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SERVER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "Message":
      return {
        ...state,
        message: action.payload,
      };
  }
};
const UserContext = ({ children }) => {
  const [userState, userDispatcher] = useReducer(reducer, initailState);
  const [storage, setStorage] = useLocalStorage("url✂️", []);

  return (
    <User.Provider
      value={{
        userState,
        userDispatcher,
        storage,
        setStorage,
      }}
    >
      {children}
    </User.Provider>
  );
};

export default UserContext;

export function UserState() {
  return useContext(User);
}
