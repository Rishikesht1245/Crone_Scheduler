import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Table, { Media } from "../components/Table";
import { Button } from "../components/ui/button";
import {
  addScheduleAPI,
  deleteScheduleAPI,
  getSchedulesAPI,
  updateScheduleAPI,
} from "../api/api";
import { UserContext } from "../context/UserContext";
import { Pencil, Trash2 } from "lucide-react";
import Modal from "../components/Modal";
import moment from "moment";
import Form from "../components/Form";
import toast from "react-hot-toast";
import { PageContext } from "../context/PageContext";

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [scheduleData, setScheduleData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [pending, setPending] = useState(false);
  const { user, logoutUser } = useContext(UserContext);
  const { changePage } = useContext(PageContext);

  // fetching all schedules
  const fetchSchedules = useCallback(async () => {
    setPending(true);
    try {
      const response = await getSchedulesAPI(user?._id);
      if (response && response?.data?.success) {
        setSchedules(response?.data?.data);
      }
    } catch (error) {
      console.log("Error in fetching schedule");
    } finally {
      setPending(false);
    }
  }, [getSchedulesAPI]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  // adding schedule
  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    const SubmitAPI = formType === "edit" ? updateScheduleAPI : addScheduleAPI;
    if (formType === "edit") {
      formData = { ...formData, _id: scheduleData?._id };
    }
    try {
      setPending(true);
      const response = await SubmitAPI(formData, user?._id);
      if (response && response?.data?.success) {
        toast.success(
          response?.data?.message || "Schedule created successfully!"
        );
        setModalOpen(false);
        fetchSchedules();
      }
    } catch (error) {
      console.log("Error in schedule form submitting : ", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setPending(false);
    }
  };

  // for delete
  const handleDelete = async (scheduleId) => {
    const userConfirmed = confirm(
      "Are you sure you want to delete this schedule"
    );
    if (userConfirmed) {
      const userId = user?._id;
      try {
        const response = await deleteScheduleAPI(userId, scheduleId);
        if (response && response?.data?.success) {
          toast.success(
            response?.data?.message || "Schedule deleted successfully!"
          );
        }
        fetchSchedules();
      } catch (error) {
        console.log("Error in deleting schedule", error);
        toast.error("Something went wrong!");
      }
    }
  };

  const openModal = (type) => {
    setFormType(type);
    setModalOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    changePage("login");
  };
  //   columns for data table
  const columns = useMemo(
    () => [
      {
        name: "SI NO",
        sortable: true,
        selector: (row, index) => index + 1,
        hide: Media.SM,
      },
      {
        name: "Schedule Name",
        sortable: true,
        selector: (row) => row.name,
        grow: 2,
      },
      {
        name: "Schedule Date",
        sortable: true,
        selector: (row) => moment(row.date).format("DD-MM-YYYY"),
        grow: 2,
      },
      {
        name: "Repeating",
        selector: (row) => row.type,
        hide: Media.SM,
      },
      {
        name: "Actions",
        cell: (row) => {
          return (
            <div className="flex gap-3">
              <button
                title="Edit Button"
                onClick={() => {
                  openModal("edit");
                  setScheduleData(row);
                }}
              >
                <Pencil size={"20px"} color="green" />
              </button>
              <button
                title="Delete Button"
                onClick={() => handleDelete(row?._id)}
              >
                <Trash2 size={"20px"} color="red" />
              </button>
            </div>
          );
        },
        ignoreRowClick: true,
        button: true,
      },
    ],
    []
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full sm:mt-[100px] mt-[50px]">
        <div className="flex flex-col md:flex-row w-full md:max-w-[940px] bg-white rounded-sm shadow-sm h-full">
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full p-5 sm:p-8">
              <h2>Schedules</h2>
              <div className="flex gap-3">
                <Button
                  className="max-w-max px-9"
                  type="button"
                  onClick={() => openModal("add")}
                >
                  New
                </Button>
                <Button className="bg-red-500" onClick={() => handleLogout()}>
                  Logout
                </Button>
              </div>
            </div>
            <div className="w-full h-full overflow-x-auto">
              <Table columns={columns} data={schedules} pending={pending} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        heading={formType === "edit" ? "Edit Schedule" : "Add Schedule"}
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
      >
        <Form
          type={formType}
          scheduleData={scheduleData}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};
export default Schedules;
