import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PageProvider } from "./context/PageContext.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <PageProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </PageProvider>
    </UserProvider>
  </React.StrictMode>
);
