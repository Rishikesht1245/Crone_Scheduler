import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { getLocalData, storeLocally } from "./utils/storage";
import Modal from "./components/Modal";
import Schedules from "./pages/Schedules";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PageContext } from "./context/PageContext";
import { loginAPI, registerAPI } from "./api/api";
import toast from "react-hot-toast";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { user, saveUser } = useContext(UserContext);
  const { page, changePage } = useContext(PageContext);

  // loading data saved in local storage
  useEffect(() => {
    if (!user) {
      try {
        const user = getLocalData("user", "object");
        if (user) {
          saveUser(user);
          changePage("schedules");
        }
      } catch (error) {
        console.log(
          "Error in fetching user details from local storage : ",
          error
        );
      }
    }
  }, []);

  const handleSubmit = async (event, formData) => {
    event.preventDefault();
    const AuthAPI = page === "login" ? loginAPI : registerAPI;

    try {
      const response = await AuthAPI(formData);
      toast.success(response?.data?.message || `${page} successful 😊`);
      const userData = response?.data?.data;
      if (page === "login") {
        saveUser(userData);
        storeLocally("user", "object", userData);
      }
      return page === "login" ? changePage("schedules") : changePage("login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || `${page} failed, Please try again! 😊`
      );
    }
  };
  return (
    <div className="mainContainer">
      {!user ? (
        <Modal isOpen={true} heading={page === "login" ? "Login" : "Register"}>
          {page === "login" ? (
            <Login handleSubmit={handleSubmit} />
          ) : (
            <Register handleSubmit={handleSubmit} />
          )}
        </Modal>
      ) : (
        <Schedules />
      )}
    </div>
  );
};
export default App;
