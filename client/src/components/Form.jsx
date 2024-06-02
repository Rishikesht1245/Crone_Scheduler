import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import moment from "moment";

const Form = ({ type, scheduleData, handleSubmit, pending }) => {
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  const [formData, setFormData] = useState({
    name: scheduleData?.name || "",
    date: scheduleData?.date
      ? moment(scheduleData?.date).format("YYYY-MM-DD")
      : new Date(),
    type: scheduleData?.type || "none",
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
          placeholder="Schedule Name"
          type="text"
          required={true}
          name="name"
          value={formData?.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Schedule Date"
          type="date"
          required={true}
          name="date"
          value={formData?.date}
          onChange={handleChange}
        />
        <select
          value={formData?.type}
          name="type"
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border focus:border-pink-300 focus:outline-none shadow-md border-slate-200 bg-white px-4 py-2 text-sm "
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <Button className="w-full">
          {pending
            ? "Submitting..."
            : type === "edit"
            ? "Update Schedule"
            : "Add Schedule"}
        </Button>
      </form>
    </div>
  );
};
export default Form;
