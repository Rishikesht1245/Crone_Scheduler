import { createContext, useState } from "react";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState("login");

  const changePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <PageContext.Provider value={{ page, changePage }}>
      {children}
    </PageContext.Provider>
  );
};
