/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import RequestsData from "../../Components/RequestsData";
import RequestsDataDriver from "../../Components/RequestsDataDriver";
import Chart from "react-apexcharts";
import LineChart from "../../Components/LineChart";
import JobsSidePopup from "../../Components/JobsSidePopup";
import { useSelector } from "react-redux";
import { selectUser, selectUserType } from "../../store/userSlice";
import useFetch from "../../hooks/useFetch";
import {
  DELETE_COURIER_REQUEST,
  GET_COURIER_STATS,
  GET_USER_REQUESTS,
} from "../../constants";
import useDelete from "../../hooks/useDelete";
import toast from "react-hot-toast";
import ModalPopup from "../../Components/Modal";

const JobsData = [
  {
    id: 1,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 2,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 3,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 4,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 5,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 6,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
];
const DashboardUser = () => {
  const [jobs, setJobs] = useState(JobsData);
  const urlPath = window.location.pathname;
  const { fetchData } = useFetch();
  const [userRequests, setUserRequests] = useState([]);
  const [tab, setTab] = useState("pending");
  const [totalJobs, setTotalJobs] = useState(0);

  const user = useSelector(selectUser);
  // console.log("user", user);

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [sideOpen, setSideOpen] = useState(false);
  const openSide = () => setSideOpen(true);
  const closeSide = () => setSideOpen(false);
  const lastSegment = urlPath.split("/").filter(Boolean).pop();
  const [date, setDate] = useState();
  const userType = useSelector(selectUserType);
  const [usertype, setUsertype] = useState(userType);
  const [courierStats, setCourierStats] = useState({});

  // console.log("date", date);

  const getUserRequests = async () => {
    setLoading(true);
    try {
      const response = await fetchData(
        `${GET_USER_REQUESTS}?status=${tab}&date=${date}`
      );
      // console.log(response.data)
      setUserRequests(response.data?.requests);
      setTotalJobs(response.data?.totalJobs);
    } catch (error) {
      console.log("Error fetching user requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const { deleteData } = useDelete();
  const handleDelete = async (job) => {
    try {
      const response = await deleteData(
        `${DELETE_COURIER_REQUEST}/${job._id}/${job?.status}`
      );
      toast.success(response?.data?.message || "Job deleted successfully");
      getUserRequests();
    } catch (error) {
      console.log("Error in delete", error);
      toast.error(error.response.data.message);
    }
  };

  const getCourierRequests = async () => {
    setLoading(true);
    try {
      const response = await fetchData(GET_COURIER_STATS);
      // console.log(response.data)
      setCourierStats(response.data);
    } catch (error) {
      console.log("Error fetching user requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // alert(userType)
    // const userType = localStorage.getItem("type");
    // setUsertype(userType);
    if (userType == "user") {
      getUserRequests();
    }
    if (userType == "courier") {
      getCourierRequests();
    }
  }, [tab, date]);

  return (
    <DashboardLayout>
      <div>
        {usertype == "user" ? (
          <>
            <h1 className="font-bold text-[17px] w-full">Dashboard</h1>
            <div className="white_box w-full px-4 py-4 flex justify-between items-center mt-5">
              <div className="flex gap-5 items-center">
                <div className="">
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1H19M6 7H19M6 13H19M1 1H1.01M1 7H1.01M1 13H1.01"
                      stroke="#85E211"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="uppercase text-[17px] font-bold">
                  Total Jobs Posted
                </div>
              </div>
              <div className="font-bold text-4xl mr-3">{totalJobs || 0}</div>
            </div>
            <RequestsData
              loading={loading}
              jobs={userRequests}
              tab={tab}
              setTab={setTab}
              handleDelete={handleDelete}
              date={date}
              setDate={setDate}
              getUserRequests={getUserRequests}
            />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[17px] w-full">Dashboard</h1>
              {/* <button
                className="rounded-full px-5 flex items-center gap-2 py-2 !bg-white !text-[var(--text-color)]"
                onClick={openModal}
              >
                <span>Filter</span>
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 1.25H1.5L7.5 8.345V13.25L10.5 14.75V8.345L16.5 1.25Z"
                    stroke="#85E211"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button> */}
            </div>
            <div className="flex justify-between items-stretch gap-4 mt-4 md:flex-row flex-col">
              <div className="flex justify-between items-start flex-col gap-3 w-full md:w-[18%]">
                <div className="white_box w-full px-4 py-4 flex justify-between items-start flex-col">
                  <div className="flex gap-3 items-center">
                    <div className="">
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 11.5V2.5C10.5 2.10218 10.342 1.72064 10.0607 1.43934C9.77936 1.15804 9.39782 1 9 1H3C2.60218 1 2.22064 1.15804 1.93934 1.43934C1.65804 1.72064 1.5 2.10218 1.5 2.5V10.75C1.5 10.9489 1.57902 11.1397 1.71967 11.2803C1.86032 11.421 2.05109 11.5 2.25 11.5H3.75M3.75 11.5C3.75 12.3284 4.42157 13 5.25 13C6.07843 13 6.75 12.3284 6.75 11.5M3.75 11.5C3.75 10.6716 4.42157 10 5.25 10C6.07843 10 6.75 10.6716 6.75 11.5M11.25 11.5H6.75M11.25 11.5C11.25 12.3284 11.9216 13 12.75 13C13.5784 13 14.25 12.3284 14.25 11.5M11.25 11.5C11.25 10.6716 11.9216 10 12.75 10C13.5784 10 14.25 10.6716 14.25 11.5M14.25 11.5H15.75C15.9489 11.5 16.1397 11.421 16.2803 11.2803C16.421 11.1397 16.5 10.9489 16.5 10.75V8.0125C16.4997 7.8423 16.4415 7.67726 16.335 7.5445L13.725 4.282C13.6549 4.19416 13.5659 4.12321 13.4646 4.0744C13.3633 4.02559 13.2524 4.00016 13.14 4H10.5"
                          stroke="#85E211"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-[12px] font-normal">
                      Active Shipments
                    </div>
                  </div>
                  <div className="font-semibold text-xl mt-4">
                    {courierStats?.summaryStats?.activeShipments}
                  </div>
                </div>
                <div className="white_box w-full px-4 py-4 flex justify-between items-start flex-col">
                  <div className="flex gap-3 items-center">
                    <div className="">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 6.75H3.375C2.87772 6.75 2.40081 6.55246 2.04917 6.20083C1.69754 5.84919 1.5 5.37228 1.5 4.875C1.5 4.37772 1.69754 3.90081 2.04917 3.54917C2.40081 3.19754 2.87772 3 3.375 3H4.5M4.5 6.75V1.5H13.5V6.75M4.5 6.75C4.5 7.94347 4.97411 9.08807 5.81802 9.93198C6.66193 10.7759 7.80653 11.25 9 11.25C10.1935 11.25 11.3381 10.7759 12.182 9.93198C13.0259 9.08807 13.5 7.94347 13.5 6.75M13.5 6.75H14.625C15.1223 6.75 15.5992 6.55246 15.9508 6.20083C16.3025 5.84919 16.5 5.37228 16.5 4.875C16.5 4.37772 16.3025 3.90081 15.9508 3.54917C15.5992 3.19754 15.1223 3 14.625 3H13.5M3 16.5H15M7.5 10.9951V12.7501C7.5 13.1626 7.1475 13.4851 6.7725 13.6576C5.8875 14.0626 5.25 15.1801 5.25 16.5001M10.5 10.9951V12.7501C10.5 13.1626 10.8525 13.4851 11.2275 13.6576C12.1125 14.0626 12.75 15.1801 12.75 16.5001"
                          stroke="#85E211"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-[12px] font-normal">
                      Success Deliveries
                    </div>
                  </div>
                  <div className="font-semibold text-xl mt-4">
                    {courierStats?.summaryStats?.successDeliveries}
                  </div>
                </div>
                <div className="white_box w-full px-4 py-4 flex justify-between items-start flex-col">
                  <div className="flex gap-3 items-center">
                    <div className="">
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 6H5.5C5.10218 6 4.72064 6.15804 4.43934 6.43934C4.15804 6.72064 4 7.10218 4 7.5C4 7.89782 4.15804 8.27936 4.43934 8.56066C4.72064 8.84196 5.10218 9 5.5 9H8.5C8.89782 9 9.27936 9.15804 9.56066 9.43934C9.84196 9.72064 10 10.1022 10 10.5C10 10.8978 9.84196 11.2794 9.56066 11.5607C9.27936 11.842 8.89782 12 8.5 12H4M7 13.125V4.875M1 1.5V16.5L2.5 15.75L4 16.5L5.5 15.75L7 16.5L8.5 15.75L10 16.5L11.5 15.75L13 16.5V1.5L11.5 2.25L10 1.5L8.5 2.25L7 1.5L5.5 2.25L4 1.5L2.5 2.25L1 1.5Z"
                          stroke="#85E211"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-[12px] font-normal">Revenue</div>
                  </div>
                  <div className="font-semibold text-xl mt-4">
                    ${courierStats?.summaryStats?.revenue}
                  </div>
                </div>
              </div>
              <div className="white_box w-full md:w-[82%] ">
                <LineChart chartStats={courierStats?.monthlyStats} />
              </div>
            </div>
            <RequestsDataDriver jobs={courierStats?.activeShipments} />
            <ModalPopup
              open={modalOpen}
              close={closeModal}
              heading="Filter By Date"
              content="date_popup"
              subcontent="Please select a date to filter"
              // onSubmit={setDateValue}
              setDate={setDate}
              date={date}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
