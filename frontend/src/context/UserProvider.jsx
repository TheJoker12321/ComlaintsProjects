import { createContext, useState, useRef } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const token = useRef("")

  return (
    <UserContext value={{ token}}>
      {children}
    </UserContext>
  );
}

export { UserContext, UserProvider };