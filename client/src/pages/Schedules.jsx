import { useMemo, useState } from "react";
import Table, { Media } from "../components/Table";
import Modal from "../components/Modal";
import { Button } from "../components/ui/button";

const Schedules = () => {
  const [scheduleData, setScheduleData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [pending, setPending] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };
  //   columns for data table
  const columns = useMemo(
    () => [
      {
        name: "SI NO",
        sortable: true,
        selector: (row, index) => index,
        hide: Media.SM,
      },
      {
        name: "Schedule Name",
        sortable: true,
        selector: (row) => row.name,
        grow: 2,
      },
      {
        name: "Created Date",
        sortable: true,
        selector: (row) => row.createdAt,
      },
      {
        name: "Repeating",
        selector: (row) => row.type,
      },
      {
        name: "Actions",
        cell: (row) => {
          return (
            <div className="flex gap-1">
              <button
                title="Edit Button"
                onClick={() => {
                  setRoomData(row);
                  setModalOpen(true);
                  setModalType("edit");
                }}
              >
                📝
              </button>
              <button
                title="Delete Button"
                onClick={() => {
                  setRoomData(row);
                }}
              >
                🗑️
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
        <div className="flex flex-col md:flex-row md:max-w-[940px] bg-white rounded-sm shadow-sm w-full h-full">
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full p-5 sm:p-8">
              <h2>Your Schedules</h2>
              <Button
                className="max-w-max px-9"
                type="button"
                onClick={() => openModal("add")}
              >
                New Schedule
              </Button>
            </div>
            <Table columns={columns} data={[]} pending={pending} />
          </div>
        </div>
      </div>
      <Modal
        heading={modalType === "edit" ? "Edit Schedule" : "Add Schedule"}
        isOpen={modalOpen}
      ></Modal>
    </>
  );
};
export default Schedules;
