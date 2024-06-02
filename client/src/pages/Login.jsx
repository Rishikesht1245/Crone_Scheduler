import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { useContext, useState } from "react";
import { PageContext } from "../context/PageContext";

const Login = ({ handleSubmit }) => {
  const { changePage } = useContext(PageContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col">
      <form
        className="flex flex-col gap-6 justify-center items-center"
        onSubmit={(e) => handleSubmit(e, formData)}
      >
        <Input
          placeholder="Email"
          type="email"
          required={true}
          name="email"
          value={formData?.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          required={true}
          name="password"
          value={formData?.password}
          onChange={handleChange}
        />
        <Button className="w-full">Login</Button>
      </form>
      <span
        className="text-[#031b52e4] text-sm text-right font-semibold mt-2 cursor-pointer"
        onClick={() => changePage("register")}
      >
        Register here
      </span>
    </div>
  );
};
export default Login;
