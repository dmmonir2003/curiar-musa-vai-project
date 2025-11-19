/* eslint-disable react/prop-types */
import React, { useState } from "react";
import JobsSidePopup from "./JobsSidePopup";
import ModalPopup from "./Modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useDelete from "../hooks/useDelete";
import { DELETE_COURIER_REQUEST } from "../constants";
import { MdRateReview } from "react-icons/md";
import PickupIcon from "./IconType";

const JobLayout = ({ job, status, openPopup, handleDelete, getUserRequests }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const openSide = () => setSideOpen(true);
  const closeSide = () => setSideOpen(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const openReview = () => setReviewOpen(true);
  const closeReview = () => setReviewOpen(false);

  const handleLinkClick = () => {
    openSide();
  };

  const show_popup_delete = (e) => {
    e.stopPropagation();
    openModal();
  };

  // Handle the delete action here

  function setCourierRequestLocalStorage(data) {
    // localStorage.clear();
    Object.keys(localStorage).forEach((key) => {
      if (key !== "type" && key !== "persist:root" && key !== "messages") {
        localStorage.removeItem(key);
      }
    });

    console.log("setCourierRequestLocalStorage", data);

    if (!data) return;

    // Step 1: Addresses
    const location = {
      from: data.fromAddress?.address,
      to: data.toAddress?.address,
    };
    localStorage.setItem("fromlat", data.fromAddress.lat);
    localStorage.setItem("fromlng", data.fromAddress.lng);
    localStorage.setItem("tolat", data.toAddress.lat);
    localStorage.setItem("tolng", data.toAddress.lng);

    localStorage.setItem("location", JSON.stringify(location));

    // Step 2: Transport type & source
    localStorage.setItem("type_transport", data.pickupType);
    localStorage.setItem("transportoption", data.itemSource);

    // Step 3: Items
    localStorage.setItem("itemslist", JSON.stringify(data.items));

    // Step 4: Pickup date & time
    const dateOnly = new Date(data.pickupDate).toISOString().split("T")[0];
    localStorage.setItem("pickup", dateOnly);

    if (data.timeSlot) {
      // const pickupTimeName = `${data.timeSlot.start} - ${data.timeSlot.end}`;
      localStorage.setItem("pickuptimename", data.timeSlot.start);
      localStorage.setItem("deliverytimename", data.timeSlot.end);
      localStorage.setItem("pickuptimeprice", data.timeSlot.cost.toString());
    }

    // Step 5: Extra services
    localStorage.setItem("helpdelivery", data.extraServices.floor);
    localStorage.setItem("help", data.extraServices.help);

    // Step 6: Contact & addresses
    // You’ll likely use these in a form context (like Formik), so here’s an example return too:
    const formValues = {
      firstName: data.contactDetails.firstName,
      lastName: data.contactDetails.lastName,
      email: data.contactDetails.email,
      phoneNumber: data.contactDetails.phoneNumber,

      pickupStreet: data.pickupContact.smartHomeAddress,
      pickupCity: data.pickupContact.city,
      pickupZipCode: data.pickupContact.zipCode,
      pickupAdditionalInfo: data.pickupContact.additionalInfo || "",

      deliveryStreet: data.deliveryContact.smartHomeAddress,
      deliveryCity: data.deliveryContact.city,
      deliveryZipCode: data.deliveryContact.zipCode,
      deliveryAdditionalInfo: data.deliveryContact.additionalInfo || "",

      newsletter: data.subscribeToNewsletter,
      acceptTerms: data.agreedToTerms,
      acceptPrivacy: data.agreedTopPrivacy,
    };
    localStorage.setItem("formValues", JSON.stringify(formValues));
    localStorage.setItem("isEditing", true);
    localStorage.setItem("_id", data._id);

    // Step 7: Total price
    localStorage.setItem("totalprice", data.totalPrice.toString());
    navigate("/request/form/step/1");
    return formValues; // useful if you're also pre-filling a form UI
  }

  return (
    <>
      <div
        // key={job?._id}
        className="white_box p-4 hover:scale-[1.02] hover:border-[var(--primary-color)] border border-[#fafafa] transition-all duration-700 ease-in-out cursor-pointer"
        onClick={handleLinkClick}
      >
        <div className="flex justify-between items-center">
          <div className="job_top flex items-center gap-3 w-full">
            <div className="job_route">
              <div className="text-[15px] font-normal">
                {job?.fromAddress?.address}
              </div>
              <span className="text-[11px] font-normal text-[var(--light-color-text)]">
                {job?.timeSlot?.start}
              </span>
            </div>
            <div className="route_line flex items-center">
              <span className="route_circle"></span>
              <span className="line_route_full"></span>
              <span className="route_circle"></span>
            </div>
            <div className="job_route">
              <div className="text-[15px] font-normal">
                {job?.toAddress?.address}
              </div>
              <span className="text-[11px] font-normal text-[var(--light-color-text)]">
                {job?.timeSlot?.end}
              </span>
            </div>
          </div>
          <div className="font-bold text-2xl text-[var(--primary-color)]">
            ${job?.totalPrice}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3 items-center">
            <div className="border-0 border-[#f0f0f0] h-9 w-9 rounded-full flex justify-center items-center bg-white svg_smalll_custom">
              <PickupIcon pickupType={job?.pickupType} />
            </div>
            <div className="bg-[#8E8E93] text-[11px] p-1 px-4 rounded-full text-white">
              {status}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {job?.status === "pending" ? (
              <>
                <div
                  className="border cursor-pointer border-[#f0f0f0] h-9 w-9 rounded-full flex justify-center items-center bg-white hover:border-[var(--primary-color)]"
                  onClick={() => setCourierRequestLocalStorage(job)}
                >
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12.3332H11.25M7.75 2.33317L9.5 4.33317M8.625 1.33316C8.85706 1.06794 9.17181 0.918945 9.5 0.918945C9.6625 0.918945 9.82341 0.955525 9.97355 1.0266C10.1237 1.09767 10.2601 1.20184 10.375 1.33316C10.4899 1.46448 10.5811 1.62038 10.6432 1.79196C10.7054 1.96354 10.7374 2.14744 10.7374 2.33316C10.7374 2.51888 10.7054 2.70277 10.6432 2.87435C10.5811 3.04594 10.4899 3.20184 10.375 3.33316L3.08333 11.6665L0.75 12.3332L1.33333 9.66649L8.625 1.33316Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="border cursor-pointer border-[#f0f0f0] h-9 w-9 rounded-full flex justify-center items-center bg-white hover:border-[var(--primary-color)]"
                  onClick={show_popup_delete}
                >
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 3.49984H11.25M10.0833 3.49984V11.6665C10.0833 12.2498 9.5 12.8332 8.91667 12.8332H3.08333C2.5 12.8332 1.91667 12.2498 1.91667 11.6665V3.49984M3.66667 3.49984V2.33317C3.66667 1.74984 4.25 1.1665 4.83333 1.1665H7.16667C7.75 1.1665 8.33333 1.74984 8.33333 2.33317V3.49984"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <MdRateReview
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openReview(job);
                  }}
                  size={26}
                  color="#85e211"
                  title="Add Review"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <ModalPopup
        open={modalOpen}
        close={closeModal}
        heading="Delete Job"
        content="delete_popup"
        onSubmit={() => handleDelete(job)}
        job={job}
        // subcontent="Please select a date to search jobs."
      />

      {/* REVIEW POPUP */}
      <ModalPopup
        open={reviewOpen}
        close={closeReview}
        heading={`REVIEW - JOB # ${job?.jobNumber}`}
        content="review_content"
        // onSubmit={() => handleSub(job)}
        job={job}
        getUserRequests={getUserRequests}
        // subcontent="Please add your review against this job."
      />

      <JobsSidePopup
        open={sideOpen}
        close={closeSide}
        content={"id"}
        type={"user"}
        job={job}
      />
    </>
  );
};

export default JobLayout;
