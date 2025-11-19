/* eslint-disable react/prop-types */
import React, { useState } from "react";
import JobLayout from "./JobLayout";
import ModalPopup from "./Modal";
import JobLayoutDriverActive from "./JobLayoutDriverActive";
import { useNavigate } from "react-router-dom";

const RequestsDataDriver = ({ jobs }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const statusValue = (val) => {
    let actual_status = "";
    if (val == 1) {
      actual_status = "Accepted";
    } else if (val == 2) {
      actual_status = "Pending";
    } else if (val == 3) {
      actual_status = "Completed";
    }
    return actual_status;
  };
  const handleSubmit = () => {
    console.log("Submit function called from the parent component!");
    // You can do other logic here
  };
  return (
    <div>
      <div className="page_header flex justify-between md:items-center items-start gap-3  mt-4 md:flex-row flex-col">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-[15px]">Active Shipments</h2>
        </div>
        <div className="flex gap-2 items-center md:w-auto w-full justify-center md:justify-end">
         
          <button className="small_button" onClick={() => navigate("/my-shipments")}>
            <span>View all</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        {
          jobs?.length == 0 ? <h2 className="font-normal text-[13px] text-red-500 w-full p-5 bg-white rounded-xl text-center mt-[50px]">No Active Shipments</h2> : null
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobs?.map((item, index) => (
            <>
              <JobLayoutDriverActive key={index} status={statusValue(tab)} job={item} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestsDataDriver;
