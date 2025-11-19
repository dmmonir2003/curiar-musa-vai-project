/* eslint-disable react/prop-types */
import React, { useState } from "react";
import JobLayout from "./JobLayout";
import ModalPopup from "./Modal";
import JobsSidePopup from "./JobsSidePopup";
import { useNavigate } from "react-router-dom";

const RequestsData = ({
  jobs,
  tab,
  setTab,
  handleDelete,
  date,
  setDate,
  loading,
  getUserRequests
}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [sideOpen, setSideOpen] = useState(false);
  const openSide = () => setSideOpen(true);
  const closeSide = () => setSideOpen(false);
  const statusValue = (val) => {
    let actual_status = "";
    if (val == "in-progress") {
      actual_status = "Accepted";
    } else if (val == "pending") {
      actual_status = "Pending";
    } else if (val == "completed") {
      actual_status = "Completed";
    }
    return actual_status;
  };
  const handleSubmit = () => {
    console.log("Submit function called from the parent component!");
    // You can do other logic here
  };

  const setDateValue = (date) => {
    setDate(date);
  };

   const handleAddNewRequest = () => {
      const isEdit = localStorage.getItem("isEditing");
      const id = localStorage.getItem("_id");
      if(isEdit && id){
        Object.keys(localStorage).forEach((key) => {
          if (key !== 'type' && key !== 'persist:root' && key !== 'messages') {
            localStorage.removeItem(key);
          }
        });
      }
      
      navigate("/request/form/step/1");
    }

  return (
    <div>
      <div
        key={"job_" + jobs?.id}
        className="page_header flex justify-between md:items-center items-start gap-3  mt-4 md:flex-row flex-col"
      >
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-[15px]">Requests</h2>
          <div className="pills_section flex items-center gap-2">
            <div
              className={`pills ${tab == "in-progress" ? "active" : ""}`}
              onClick={() => setTab("in-progress")}
            >
              Accepted
            </div>
            <div
              className={`pills ${tab == "pending" ? "active" : ""}`}
              onClick={() => setTab("pending")}
            >
              Pending
            </div>
            <div
              className={`pills ${tab == "completed" ? "active" : ""}`}
              onClick={() => setTab("completed")}
            >
              Completed
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center md:w-auto w-full justify-center md:justify-end">
          <button className="small_button" onClick={openModal}>
            <span>
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1.5V4.5M11 1.5V4.5M1.25 7.5H14.75M2.75 3H13.25C14.0784 3 14.75 3.67157 14.75 4.5V15C14.75 15.8284 14.0784 16.5 13.25 16.5H2.75C1.92157 16.5 1.25 15.8284 1.25 15V4.5C1.25 3.67157 1.92157 3 2.75 3Z"
                  stroke="#EEEEF0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Select Date</span>
          </button>
          <button className="small_button" onClick={(() => handleAddNewRequest())}>
            <span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 9H14.25M9 3.75V14.25"
                  stroke="#EEEEF0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Add an new Job</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        {jobs?.length === 0 && (
          <div className="text-center bg-white py-4 text-red-400 rounded-xl">
            {loading ? "Loading..." : "No Jobs Found"}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobs?.length > 0 &&
            jobs.map((item) => (
              <JobLayout
                key={item._id}
                status={statusValue(tab)}
                job={item}
                openPopup={openSide}
                handleDelete={handleDelete}
                getUserRequests={getUserRequests}
              />
            ))}
        </div>
      </div>
      <ModalPopup
        open={modalOpen}
        close={closeModal}
        heading="Search By Date"
        content="date_popup"
        subcontent="Please select a date to search jobs."
        // onSubmit={setDateValue}
        setDate={setDate}
        date={date}
      />
    </div>
  );
};

export default RequestsData;
