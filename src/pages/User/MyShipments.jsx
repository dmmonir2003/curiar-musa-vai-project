/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import JobLayoutDriverActive from "../../Components/JobLayoutDriverActive";
import DashboardLayout from "../../Layouts/Dashboard";
import ModalPopup from "../../Components/Modal";
import JobsSidePopup from "../../Components/JobsSidePopup";
import JobsSidePopupData from "../../Components/JobsSidePopupData";
import DriverActiveDataInner from "../../Components/DriverActiveDataInner";
import useFetch from "../../hooks/useFetch";
import { GET_COURIER_SHIPMENTS } from "../../constants";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";

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
const MyShipments = () => {
  const [tab, setTab] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openSide = () => setSideOpen(true);
  const closeSide = () => setSideOpen(false);
  const [usertype, setUsertype] = useState(localStorage.getItem("type"));
  const { fetchData } = useFetch();
  const [currentJob, setCurrentJob] = useState({});

  const [filters, setFilters] = useState({
    sortByPrice: "", // 'low-to-high' or 'high-to-low'
    locations: [],
    dateFilter: "", // 'today', 'tomorrow', 'custom'
    customDate: null,
    statusFilter: "", // 'accepted', 'in-progress', 'delivered'
  });
  // const { submitData } = useCreateOrEdit();

  useEffect(() => {
    const userType = localStorage.getItem("type");
    setUsertype(userType);
  }, []);
  const statusValue = (val) => {
    let actual_status = "";
    if (val == 1) {
      actual_status = "Accepted";
    } else if (val == 2) {
      actual_status = "Pending";
    } else if (val == 3) {
      actual_status = "Delivered";
    }
    return actual_status;
  };
  const handleSubmit = () => {
    console.log("Submit function called from the parent component!");
    // You can do other logic here
  };

  const openPopup = () => {
    setSideOpen(false);
    setTimeout(() => {
      setSideOpen(true);
    }, 400);
    // console.log(" i cam heree")
  };

  const getMyShipments = async () => {
    const params = new URLSearchParams();

    if (filters.sortByPrice) params.append("sortByPrice", filters.sortByPrice);
    if (filters.locations.length > 0) {
      filters.locations.forEach((loc) => params.append("locations", loc));
    }
    if (filters.dateFilter) params.append("dateFilter", filters.dateFilter);
    if (filters.dateFilter === "custom" && filters.customDate) {
      params.append("customDate", filters.customDate.toISOString());
    }

    // params.append(
    //   "statusFilter",
    //   tab == 1 ? "in-progress" : tab == 3 ? "delivered" : "active"
    // );
    try {
      const response = await fetchData(GET_COURIER_SHIPMENTS, params);
      // const response = await fetchData(
      //   `${GET_COURIER_SHIPMENTS}?${params.toString()}`,
      //   { locations: filters?.locations },
      //   "GET"
      // );
      // console.log(response.data)
      setJobs(response.data?.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    getMyShipments();
  }, [tab, filters]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  // console.log("isMobile", isMobile);
  const shouldHide = isMobile && sideOpen;

  return (
    <DashboardLayout>
      <div>
        <div className="page_header flex justify-between md:items-center items-start gap-3  mt-4 md:flex-row flex-col">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-[15px]">Active Shipments</h2>
            <div className="pills_section flex items-center gap-2">
              <div
                className={`pills ${tab == 1 ? "active" : ""}`}
                onClick={() => setTab(1)}
              >
                Accepted
              </div>
              <div
                className={`pills ${tab == 3 ? "active" : ""}`}
                onClick={() => setTab(3)}
              >
                Delivered
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center md:w-auto w-full justify-center md:justify-end">
            <button
              className="rounded-full px-5 flex items-center gap-2 py-2 !bg-white !text-[var(--text-color)]"
              onClick={() => openModal()}
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
            </button>
          </div>
        </div>

        <div className="mt-4">
          {jobs?.length == 0 && (
            <h2 className="font-normal text-[13px] text-red-500 w-full p-5 bg-white rounded-xl text-center mt-[50px]">
              No Active Shipments..
            </h2>
          )}
          <div className="flex justify-between items-start sm:flex-row flex-col">
            {/* LEFT SIDE */}
            <div
              className={`rightpopupheightflx  scrollbar overflow-scroll w-full md:w-[45%] ${
                shouldHide ? "hidden" : "block"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 pr-4 pl-2 py-2">
                {jobs?.map((item, index) => (
                  <>
                    <JobLayoutDriverActive
                      key={index}
                      status={item?.status}
                      job={item}
                      page={tab == 1 ? "shipmentsplaning" : "shipments"}
                      openPopup={openPopup}
                      setCurrentJob={setCurrentJob}
                      // pagecoming={"newjobspage"}
                    />
                  </>
                ))}
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="rightpopupheightflx mt-[10px] w-full md:w-[55%]">
              {sideOpen && (
                <>
                  <div className=" bg-white rounded-lg">
                    <JobsSidePopupData
                      open={sideOpen}
                      type={usertype}
                      close={closeSide}
                      job={currentJob}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobs?.map((item, index) => (
              <>
                <JobLayoutDriverActive
                  key={index}
                  status={statusValue(tab)}
                  job={item}
                  page={tab==1?"shipmentsplaning":"shipments"}
                  openPopup={openSide}
                />
              </>
            ))}
          </div> */}
        </div>
      </div>

      <ModalPopup
        open={modalOpen}
        close={closeModal}
        heading="Filters"
        content="filterjobs"
        subcontent="Please select a date to search jobs."
        show_buttons={false}
        filters={filters}
        setFilters={setFilters}
      />

      {/* <JobsSidePopup
        open={sideOpen}
        close={closeSide}
        content={"id"}

      /> */}
    </DashboardLayout>
  );
};

export default MyShipments;
