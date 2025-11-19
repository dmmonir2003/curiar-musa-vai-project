/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Zoom from "react-medium-image-zoom";
import GalleryImage from "./../assets/image_gallery.avif";
import { formatDate } from "../utils/utils";
import MapComponent from "./MapComponent";
import useCreateOrEdit from "../hooks/useCreateOrEdit";
import useFetch from "../hooks/useFetch"; // Import the fetch hook
import { ACCEPT_JOB } from "../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JobsSidePopupData = ({ type, close, job }) => {
  // console.log("initialJobProp", job);
  const navigate = useNavigate();
  const { submitData } = useCreateOrEdit();
  const { fetchData } = useFetch(); // Initialize fetch hook

  const [isLoading, setIsLoading] = useState(false); // For Accept button
  const [loadingDetails, setLoadingDetails] = useState(false); // For fetching job details

  // State to hold the job data (starts with prop, updates with fetch)
  const [currentJob, setCurrentJob] = useState(job || {});
  const [tab, setTab] = useState(1);

  // Fetch specific job details when the component opens with an ID
  useEffect(() => {
    const getJobDetails = async () => {
      if (job?._id) {
        setLoadingDetails(true);
        try {
          // GET request to /jobs/:id
          const response = await fetchData(`${ACCEPT_JOB}/${job._id}`);

          // Check response structure (assuming response.data or response.data.data)
          if (response?.data) {
            // Adjust this based on your exact API response structure (e.g. response.data.data)
            const freshJobData = response.data.data || response.data;
            setCurrentJob(freshJobData);
          }
        } catch (error) {
          console.error("Error fetching job details:", error);
          // Optional: toast.error("Failed to load latest job details");
        } finally {
          setLoadingDetails(false);
        }
      }
    };

    getJobDetails();
  }, [job?._id]); // Runs whenever the job ID changes

  // Update local state if the prop changes directly (e.g. parent updates)
  useEffect(() => {
    if (job) {
      setCurrentJob((prev) => ({ ...prev, ...job }));
    }
  }, [job]);

  function calculateTotalVolume() {
    let items = currentJob?.items; // Use currentJob
    let totalVolume = 0;
    if (!items) return 0;
    items.forEach((item) => {
      const length = parseFloat(item.length);
      const width = parseFloat(item.width);
      const height = parseFloat(item.height);
      const qty = parseInt(item.quantity);

      if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(qty)) return;

      const volumePerItem = (length * width * height) / 1000000; // cm³ to m³
      const itemTotalVolume = volumePerItem * qty;

      totalVolume += itemTotalVolume;
    });

    return totalVolume.toFixed(3);
  }

  const svgs = [
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.375 21.6668C11.375 22.0978 11.5462 22.5111 11.851 22.8159C12.1557 23.1206 12.5691 23.2918 13 23.2918C13.431 23.2918 13.8443 23.1206 14.1491 22.8159C14.4538 22.5111 14.625 22.0978 14.625 21.6668V14.6252H21.6667C22.0977 14.6252 22.511 14.454 22.8158 14.1492C23.1205 13.8445 23.2917 13.4311 23.2917 13.0002C23.2917 12.5692 23.1205 12.1559 22.8158 11.8511C22.511 11.5464 22.0977 11.3752 21.6667 11.3752H14.625V4.3335C14.625 3.90252 14.4538 3.48919 14.1491 3.18445C13.8443 2.8797 13.431 2.7085 13 2.7085C12.5691 2.7085 12.1557 2.8797 11.851 3.18445C11.5462 3.48919 11.375 3.90252 11.375 4.3335V11.3752H4.33337C3.9024 11.3752 3.48907 11.5464 3.18433 11.8511C2.87958 12.1559 2.70837 12.5692 2.70837 13.0002C2.70837 13.4311 2.87958 13.8445 3.18433 14.1492C3.48907 14.454 3.9024 14.6252 4.33337 14.6252H11.375V21.6668Z"
        fill="white"
      />
    </svg>,
    <svg
      width="26"
      height="36"
      viewBox="0 0 26 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.9813 16.8147C21.1483 16.6418 21.2407 16.4103 21.2386 16.1699C21.2365 15.9296 21.1401 15.6997 20.9702 15.5297C20.8002 15.3598 20.5703 15.2634 20.33 15.2613C20.0896 15.2592 19.8581 15.3516 19.6852 15.5185L12.9999 22.2038L9.98134 19.1852C9.80846 19.0182 9.57691 18.9258 9.33656 18.9279C9.09621 18.93 8.8663 19.0264 8.69634 19.1964C8.52639 19.3663 8.42998 19.5963 8.42789 19.8366C8.4258 20.0769 8.5182 20.3085 8.68518 20.4814L12.9999 24.7961L20.9813 16.8147Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.8333 9.75016V29.0002C25.8333 29.7295 25.5435 30.429 25.0278 30.9447C24.5121 31.4604 23.8126 31.7502 23.0833 31.7502H6.58325C5.85391 31.7502 5.15443 31.4604 4.63871 30.9447C4.12298 30.429 3.83325 29.7295 3.83325 29.0002V3.3335C3.83325 2.60415 4.12298 1.90468 4.63871 1.38895C5.15443 0.873227 5.85391 0.583496 6.58325 0.583496H16.6666L25.8333 9.75016ZM16.6666 10.6668C16.4235 10.6668 16.1903 10.5703 16.0184 10.3983C15.8465 10.2264 15.7499 9.99328 15.7499 9.75016V2.41683H6.58325C6.34014 2.41683 6.10698 2.51341 5.93507 2.68531C5.76316 2.85722 5.66659 3.09038 5.66659 3.3335V29.0002C5.66659 29.2433 5.76316 29.4764 5.93507 29.6483C6.10698 29.8203 6.34014 29.9168 6.58325 29.9168H23.0833C23.3264 29.9168 23.5595 29.8203 23.7314 29.6483C23.9033 29.4764 23.9999 29.2433 23.9999 29.0002V10.6668H16.6666ZM17.5833 4.0925L22.3243 8.8335H17.5833V4.0925Z"
        fill="white"
      />
      <path
        d="M1.99996 6.0835V30.8335C1.99996 31.5628 2.28969 32.2623 2.80542 32.778C3.32114 33.2938 4.02061 33.5835 4.74996 33.5835H22.1666V35.4168H4.74996C3.53438 35.4168 2.3686 34.9339 1.50905 34.0744C0.649511 33.2149 0.166626 32.0491 0.166626 30.8335V6.0835H1.99996Z"
        fill="white"
      />
    </svg>,
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.08337 18.0833C4.08337 18.8348 4.38188 19.5554 4.91324 20.0868C5.44459 20.6182 6.16526 20.9167 6.91671 20.9167C7.66815 20.9167 8.38882 20.6182 8.92018 20.0868C9.45153 19.5554 9.75004 18.8348 9.75004 18.0833C9.75004 17.3319 9.45153 16.6112 8.92018 16.0799C8.38882 15.5485 7.66815 15.25 6.91671 15.25C6.16526 15.25 5.44459 15.5485 4.91324 16.0799C4.38188 16.6112 4.08337 17.3319 4.08337 18.0833ZM18.25 18.0833C18.25 18.8348 18.5486 19.5554 19.0799 20.0868C19.6113 20.6182 20.3319 20.9167 21.0834 20.9167C21.8348 20.9167 22.5555 20.6182 23.0868 20.0868C23.6182 19.5554 23.9167 18.8348 23.9167 18.0833C23.9167 17.3319 23.6182 16.6112 23.0868 16.0799C22.5555 15.5485 21.8348 15.25 21.0834 15.25C20.3319 15.25 19.6113 15.5485 19.0799 16.0799C18.5486 16.6112 18.25 17.3319 18.25 18.0833Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.08333 18.0835H1.25V2.50016C1.25 2.12444 1.39926 1.7641 1.66493 1.49843C1.93061 1.23275 2.29094 1.0835 2.66667 1.0835H15.4167V18.0835M9.75 18.0835H18.25M23.9167 18.0835H26.75V9.5835M26.75 9.5835H15.4167M26.75 9.5835L22.5 2.50016H15.4167"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.546 1.11107C19.8272 1.39236 19.9852 1.77382 19.9852 2.17157C19.9852 2.56931 19.8272 2.95077 19.546 3.23207L8.30303 14.4751C8.15445 14.6237 7.97805 14.7416 7.7839 14.822C7.58976 14.9024 7.38167 14.9438 7.17153 14.9438C6.96138 14.9438 6.75329 14.9024 6.55915 14.822C6.365 14.7416 6.1886 14.6237 6.04003 14.4751L0.454026 8.89007C0.310761 8.7517 0.196488 8.58618 0.117874 8.40317C0.0392605 8.22017 -0.00211889 8.02334 -0.00384962 7.82417C-0.00558034 7.625 0.0323724 7.42748 0.107794 7.24313C0.183215 7.05879 0.294595 6.89131 0.435434 6.75047C0.576273 6.60963 0.74375 6.49826 0.928095 6.42283C1.11244 6.34741 1.30996 6.30946 1.50913 6.31119C1.7083 6.31292 1.90513 6.3543 2.08813 6.43291C2.27114 6.51153 2.43666 6.6258 2.57503 6.76907L7.17103 11.3651L17.424 1.11107C17.5633 0.971677 17.7287 0.861101 17.9108 0.785659C18.0928 0.710217 18.288 0.671387 18.485 0.671387C18.6821 0.671387 18.8772 0.710217 19.0593 0.785659C19.2413 0.861101 19.4067 0.971677 19.546 1.11107Z"
        fill="white"
      />
    </svg>,
  ];

  const data_delivery = [
    {
      id: 1,
      title: "Job Posted",
      date: currentJob?.createdAt
        ? new Date(currentJob.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "17, Sep 2022",
    },
  ];

  useEffect(() => {
    if (type === "user") {
      // setTab(1);
    } else {
      setTab(2);
    }
  }, [tab, type]);

  const handleAcceptJob = async () => {
    setIsLoading(true);
    try {
      // Use currentJob._id
      const response = await submitData(
        `${ACCEPT_JOB}/${currentJob?._id}`,
        {
          status: "accepted",
        },
        "PATCH"
      );
      toast.success(response?.data?.message);
      navigate("/my-shipments");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  function formatDateToShortString(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      <div className="content_modal mt-0 px-6 py-4 font-normal mb-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaArrowLeftLong
            size={24}
            color="var(--primary-color) cursor-pointer"
            onClick={close}
          />
          <div className="flex items-center gap-2 text-[15px] ml-[120px]">
            {loadingDetails && (
              <span className="text-xs text-gray-500">Loading details...</span>
            )}
            <span className="text-[#00000070]">Shipment number:</span>
            <span className="text-[var(--primary-color)]">
              {currentJob?._id?.slice(-6)}
            </span>
          </div>
        </div>
        {type === "user" ? (
          <>
            <div className="mt-8 flex justify-between items-center gap-4">
              <div className="flex flex-col items-start">
                <h1 className="font-semibold text-[14px]">
                  {currentJob?.pickupAddress?.streetAddress}
                </h1>
                <span className="text-[var(--light-color-text)] text-[12px] mt-1">
                  {`(${currentJob?.pickupDateInfo?.timeSlot})`}
                </span>
              </div>
              <div>
                <svg
                  width="56"
                  height="9"
                  viewBox="0 0 56 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M55.8536 4.85355C56.0488 4.65829 56.0488 4.34171 55.8536 4.14645L52.6716 0.964466C52.4763 0.769204 52.1597 0.769204 51.9645 0.964466C51.7692 1.15973 51.7692 1.47631 51.9645 1.67157L54.7929 4.5L51.9645 7.32843C51.7692 7.52369 51.7692 7.84027 51.9645 8.03553C52.1597 8.2308 52.4763 8.2308 52.6716 8.03553L55.8536 4.85355ZM55.5 4L0.5 4L0.5 5L55.5 5L55.5 4Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="font-semibold text-[14px] text-right">
                  {currentJob?.deliveryAddress?.streetAddress}
                </h1>
                <span className="text-[var(--light-color-text)] text-[12px] mt-1">
                  {`(${currentJob?.deliveryDateInfo?.timeSlot})`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className={`${tab == 1 && "small_button"} mt-4 justify-center`}
                onClick={() => setTab(1)}
              >
                Order Track
              </button>
              <button
                className={`${tab == 2 && "small_button"} mt-4 justify-center`}
                onClick={() => setTab(2)}
              >
                Order Details
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[#00000070]">Pickup:</span>
              <span className="text-[var(--primary-color)]">
                {currentJob?.status === "pending"
                  ? currentJob?.pickupAddress?.cityOrState
                  : currentJob?.pickupAddress?.streetAddress}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#00000070]">Date & Time:</span>
              <span className="text-[var(--text-color)] text-[11px]">
                {formatDate(currentJob?.pickupDateInfo?.date)}{" "}
                {`(${currentJob?.pickupDateInfo?.timeSlot})`}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#00000070]">Total Distance:</span>
              <span className="text-[var(--text-color)] text-[11px]">
                {currentJob?.totalDistance}{" "}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#00000070]">Maximaal totaal volume:</span>
              <span className="text-[var(--text-color)] text-[11px]">
                {calculateTotalVolume() + " m³"}
              </span>
            </div>
          </>
        )}

        {tab == 1 && type === "user" && (
          <>
            <div className="flex justify-between flex-col gap-5 mt-10">
              {data_delivery.map((item, index) => (
                <>
                  <div className="flex items-center gap-6 mt-6 mb-4 orderdetailsafter relative">
                    <div className="bg-[var(--primary-color)] w-[46px] h-[46px] rounded-full flex justify-center items-center svgsdata">
                      {svgs[index]}
                    </div>
                    <div className="">
                      <h2 className="font-semibold text-[16px]">
                        {item.title}
                      </h2>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}

        {tab == 2 && (
          <>
            <div className="flex items-center gap-2 mt-6 mb-4">
              <span className="text-[var(--primary-color)] text-4xl font-bold">
                ${currentJob?.totalPrice}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="pills_address capitalize">
                <b>Pickup Type</b> - {currentJob?.transportationType?.name}
              </div>
              <div className="pills_address capitalize">
                {currentJob?.extraService?.service?.extraHelp >= 2
                  ? "Extra Helpers Needed"
                  : "No Extra Helpers"}
              </div>
              <div className="pills_address capitalize">
                Floor - {currentJob?.extraService?.floor?.level}
              </div>
            </div>

            {/* DELIVERY PRODUCTS */}
            <div className="mt-5">
              <h2 className="font-semibold text-lg text-[var(--primary-color)]">
                Delivery Products
              </h2>
              <div className="mt-3 flex flex-col gap-2">
                {currentJob?.items?.map((item) => (
                  <>
                    <div className="bg-[#F5F7F9] rounded-xl  mt-2">
                      <div className="flex items-center  gap-3 p-3">
                        <div className="text-[15px] text-[#00000070]">
                          <img
                            className="w-[30px] h-[30px]"
                            src={item?.img}
                            alt={item?.name}
                          />
                        </div>
                        <span className="text-xs ml-2">
                          {item?.quantity} (x) {item?.height}x{item?.width}x
                          {item?.length}cm - {item?.name}
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>

            {/* STOPS */}
            <div className="mt-5">
              <div className="flex flex-col gap-2">
                <>
                  <div className="bg-[#F5F7F9] rounded-xl  mt-2">
                    <div className="p-3">
                      <h2 className="font-semibold text-[15px] text-[var(--text-color)] w-full mb-2">
                        Stop 1 - Pickup
                      </h2>
                      <div className="flex justify-start items-center gap-2 flex-wrap">
                        {currentJob.status !== "pending" && (
                          <div className="bg-[var(--primary-color)] shadow-lg px-3 py-2 rounded-full text-xs">
                            {currentJob?.pickupAddress?.streetAddress}{" "}
                          </div>
                        )}
                        <div className="bg-[var(--primary-color)] shadow-lg px-3 py-2 rounded-full text-xs">
                          {currentJob?.pickupAddress?.cityOrState}
                        </div>
                        <div className="bg-[#fff] px-3 py-2 shadow-lg rounded-full text-xs">
                          {formatDateToShortString(
                            currentJob?.pickupDateInfo?.date
                          )}{" "}
                          ({currentJob?.pickupDateInfo?.timeSlot}){" "}
                        </div>
                        {currentJob?.pickupAddress?.description && (
                          <div className="bg-[#fff] px-3 py-2 shadow-lg rounded-full text-xs">
                            <b> Additional Info - </b>{" "}
                            {currentJob?.pickupAddress?.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F5F7F9] rounded-xl  mt-2">
                    <div className="p-3">
                      <h2 className="font-semibold text-[15px] text-[var(--text-color)] w-full mb-2">
                        Stop 2 - Delivery
                      </h2>
                      <div className="flex justify-start items-center gap-2 flex-wrap">
                        {currentJob.status !== "pending" && (
                          <div className="bg-[var(--primary-color)] shadow-lg px-3 py-2 rounded-full text-xs">
                            {currentJob?.deliveryAddress?.streetAddress}{" "}
                          </div>
                        )}
                        <div className="bg-[var(--primary-color)] shadow-lg px-3 py-2 rounded-full text-xs">
                          {currentJob?.deliveryAddress?.cityOrState}
                        </div>
                        <div className="bg-[#fff] px-3 py-2 shadow-lg rounded-full text-xs">
                          {formatDateToShortString(
                            currentJob?.deliveryDateInfo?.date
                          )}{" "}
                          ({currentJob?.deliveryDateInfo?.timeSlot}){" "}
                        </div>
                        {currentJob?.deliveryAddress?.description && (
                          <div className="bg-[#fff] px-3 py-2 shadow-lg rounded-full text-xs">
                            <b> Additional Info - </b>{" "}
                            {currentJob?.deliveryAddress?.description}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
            {/* Gallery */}

            {type === "courier" && (
              <>
                <h2 className="font-semibold text-lg text-[var(--primary-color)] mt-4 mb-4">
                  Contact Details
                </h2>
                {currentJob.status === "pending" ? (
                  <p className="text-[#00000070] font-semibold">
                    Accept job to view details
                  </p>
                ) : (
                  <div className="bg-[#F5F7F9] p-4 rounded-xl">
                    {/* Changed logic to check for userId based on JSON structure */}
                    {currentJob?.userId ? (
                      <>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#00000070] font-bold">
                            Full Name:
                          </span>
                          <span className="text-[var(--text-color)] text-[12px]">
                            {currentJob?.userId?.name?.firstName}{" "}
                            {currentJob?.userId?.name?.lastName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#00000070] font-bold">
                            Phone:
                          </span>
                          <span className="text-[var(--text-color)] text-[12px]">
                            {currentJob?.userId?.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#00000070] font-bold">
                            Email:
                          </span>
                          <span className="text-[var(--text-color)] text-[12px]">
                            {currentJob?.userId?.email}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs">Loading contact info...</p>
                    )}
                  </div>
                )}
              </>
            )}

            <div>
              <h2 className="font-semibold text-lg text-[var(--primary-color)] mt-4">
                Images
              </h2>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {currentJob?.items?.map((item, index) => (
                  <>
                    {item?.img != "" && item.img !== undefined && (
                      <Zoom key={index}>
                        <img
                          src={item?.img || GalleryImage}
                          className="h-full w-full rounded-lg cursor-pointer"
                        />
                      </Zoom>
                    )}
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {type === "courier" && currentJob.status === "pending" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="bg-[var(--primary-color)] uppercase font-bold text-white px-6 py-3 mb-4 rounded-md hover:bg-black transition"
            onClick={handleAcceptJob}
            disabled={isLoading}
          >
            {isLoading ? "Processing" : "Accept Job"}
          </button>
        </div>
      )}
    </>
  );
};

export default JobsSidePopupData;
