import { createContext, useState } from "react";
import { removeLocalData } from "../utils/storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
    removeLocalData();
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
