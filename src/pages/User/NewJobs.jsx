/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import JobLayoutDriverActive from "../../Components/JobLayoutDriverActive";
import DashboardLayout from "../../Layouts/Dashboard";
import ModalPopup from "../../Components/Modal";
import JobsSidePopup from "../../Components/JobsSidePopup";
import JobsSidePopupData from "../../Components/JobsSidePopupData";
import useFetch from "../../hooks/useFetch";
import { GET_ALL_JOBS } from "../../constants";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import { IoMdArrowRoundBack } from "react-icons/io";

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
  {
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
const RequestsDataDriver = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openSide = () => setSideOpen(true);
  const closeSide = () => setSideOpen(false);
  const { fetchData } = useFetch();
  // const { submitData } = useCreateOrEdit();
  const [usertype, setUsertype] = useState(localStorage.getItem("type"));
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
      actual_status = "Completed";
    }
    return actual_status;
  };

  const openPopup = () => {
    setSideOpen(false);
    setTimeout(() => {
      setSideOpen(true);
    }, 100);
    // console.log(" i cam heree")
  };
  const handleSubmit = () => {
    console.log("Submit function called from the parent component!");
    // You can do other logic here
  };

  const [filters, setFilters] = useState({
    sortByPrice: "", // 'low-to-high' or 'high-to-low'
    locations: [],
    dateFilter: "", // 'today', 'tomorrow', 'custom'
    customDate: null,
    statusFilter: "", // 'accepted', 'in-progress', 'delivered'
  });

  // In RequestsDataDriver.jsx

  const getAllJobs = async () => {
    // 1. Create a single params object for useFetch
    const queryParams = {};

    if (filters.sortByPrice) {
      queryParams.sortByPrice = filters.sortByPrice;
    }
    if (filters.locations && filters.locations.length > 0) {
      queryParams.locations = filters.locations; // Pass the array directly
    }
    if (filters.dateFilter) {
      queryParams.dateFilter = filters.dateFilter;
    }
    if (filters.dateFilter === "custom" && filters.customDate) {
      queryParams.customDate = filters.customDate.toISOString();
    }

    queryParams.status = "pending";
    queryParams.adminApproved = true;

    // This was your commented-out status filter. You can add it back if needed.
    // params.append('statusFilter', tab == 1 ? "in-progress" : tab == 3 ? "delivered" : "active");
    // if (tab === 1) {
    //   queryParams.statusFilter = "in-progress";
    // } else if (tab === 3) {
    //   queryParams.statusFilter = "delivered";
    // } else {
    //   queryParams.statusFilter = "active";
    // }

    try {
      setLoading(true); // Start loading before the fetch

      // 2. Pass the base URL and the single queryParams object.
      //    useFetch and Axios will build the final URL for you.
      const response = await fetchData(GET_ALL_JOBS, queryParams);

      setJobs(response.data?.data);
    } catch (error) {
      console.log("Error fetching jobs:", error);
      setJobs([]); // Clear jobs on error
    } finally {
      setLoading(false);
    }
  };
  const [currentJob, setCurrentJob] = useState({});

  useEffect(() => {
    getAllJobs();
  }, [filters]);

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
      {loading ? (
        <>
          <div className="bg-white p-5 rounded-xl text-center mt-[100px]">
            Please wait, we are loading all jobs....
          </div>
        </>
      ) : jobs?.length > 0 ? (
        <div>
          <div className="page_header flex justify-between md:items-center items-start gap-3  mt-4 md:flex-row flex-col">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-[15px]">Jobs</h2>
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

          <div className="mt-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-start ">
              {/* LEFT SIDE */}
              <div
                className={`rightpopupheightflx  scrollbar   overflow-scroll ${
                  shouldHide ? "hidden" : "block"
                }`}
              >
                <div className="grid grid-cols-1   gap-3 pr-2 pl-1 py-2">
                  {jobs?.map((item, index) => (
                    <>
                      <JobLayoutDriverActive
                        key={index}
                        status={statusValue(tab)}
                        job={item}
                        page={"jobslisting"}
                        openPopup={openPopup}
                        pagetype={"newjobspage"}
                        setCurrentJob={setCurrentJob}
                      />
                    </>
                  ))}
                </div>
              </div>
              {/* RIGHT SIDE */}

              <div className="rightpopupheightflx mt-[10px] ">
                {/* <span className="uppercase flex gap-3 items-center">
                  {shouldHide && (
                    <IoMdArrowRoundBack
                      size={29}
                      color="#85e211"
                      onClick={() => setSideOpen(false)}
                    />
                  )}
                </span> */}
                {sideOpen && (
                  <>
                    <div className=" bg-white  rounded-lg">
                      <JobsSidePopupData //TODO: working now as accept-job
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
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 text-red-400 rounded-xl text-center mt-[100px]">
          No Jobs Found
        </div>
      )}

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

      {/* <JobsSidePopup open={sideOpen} close={closeSide} content={"id"} /> */}
    </DashboardLayout>
  );
};

export default RequestsDataDriver;
