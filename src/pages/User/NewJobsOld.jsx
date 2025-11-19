// import React, { useEffect, useState } from "react";
// import JobLayoutDriverActive from "../../Components/JobLayoutDriverActive";
// import DashboardLayout from "../../Layouts/Dashboard";
// import ModalPopup from "../../Components/Modal";
// import JobsSidePopup from "../../Components/JobsSidePopup";

// const JobsData = [
//     {
//       id: 1,
//       from: "",
//       to: "",
//       from_time: "",
//       end_time: "",
//       price: "",
//       type: "",
//       status: "",
//       posted_date: "",
//     },
//     {
//       id: 2,
//       from: "",
//       to: "",
//       from_time: "",
//       end_time: "",
//       price: "",
//       type: "",
//       status: "",
//       posted_date: "",
//     },
//     {
//       id: 3,
//       from: "",
//       to: "",
//       from_time: "",
//       end_time: "",
//       price: "",
//       type: "",
//       status: "",
//       posted_date: "",
//     },
//     {
//       id: 4,
//       from: "",
//       to: "",
//       from_time: "",
//       end_time: "",
//       price: "",
//       type: "",
//       status: "",
//       posted_date: "",
//     },
//     {
//       id: 5,
//       from: "",
//       to: "",
//       from_time: "",
//       end_time: "",
//       price: "",
//       type: "",
//       status: "",
//       posted_date: "",
//     },
//     {
//       id: 6,
//       from: "",
//       to: "",
//       from_time: "",
//       end_time: "",
//       price: "",
//       type: "",
//       status: "",
//       posted_date: "",
//     },
//   ];
// const RequestsDataDriver = () => {
//   const [tab, setTab] = useState(1);
//   const [jobs, setJobs] = useState(JobsData);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [sideOpen, setSideOpen] = useState(false);
//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);
//   const openSide = () => setSideOpen(true);
//   const closeSide = () => setSideOpen(false);
//   const [usertype, setUsertype] = useState(localStorage.getItem("type"));

//   useEffect(() => {
//     const userType = localStorage.getItem("type");
//     setUsertype(userType);
//   },[])
//   const statusValue = (val) => {
//     let actual_status = "";
//     if (val == 1) {
//       actual_status = "Accepted";
//     } else if (val == 2) {
//       actual_status = "Pending";
//     } else if (val == 3) {
//       actual_status = "Completed";
//     }
//     return actual_status;
//   };
//   const handleSubmit = () => {
//     console.log("Submit function called from the parent component!");
//     // You can do other logic here
//   };
//   return (
//     <DashboardLayout>
//       <div>
//         <div className="page_header flex justify-between md:items-center items-start gap-3  mt-4 md:flex-row flex-col">
//           <div className="flex items-center gap-3">
//             <h2 className="font-bold text-[15px]">Jobs</h2>
//           </div>
//           <div className="flex gap-2 items-center md:w-auto w-full justify-center md:justify-end">
//             <button className="rounded-full px-5 flex items-center gap-2 py-2 !bg-white !text-[var(--text-color)]" onClick={() => openModal()} >
//               <span>Filter</span>
//               <svg
//                 width="18"
//                 height="16"
//                 viewBox="0 0 18 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M16.5 1.25H1.5L7.5 8.345V13.25L10.5 14.75V8.345L16.5 1.25Z"
//                   stroke="#85E211"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="mt-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {jobs?.map((item, index) => (
//               <>
//                 <JobLayoutDriverActive
//                   key={index}
//                   status={statusValue(tab)}
//                   job={item}
//                   page={"jobslisting"}
//                   openPopup={openSide}
//                 />
//               </>
//             ))}
//           </div>
//         </div>
//       </div>

//       <ModalPopup
//         open={modalOpen}
//         close={closeModal}
//         heading="Filters"
//         content="filterjobs"
//         subcontent="Please select a date to search jobs."
//         show_buttons={false}
//       />

//       <JobsSidePopup
//         open={sideOpen}
//         close={closeSide}
//         content={"id"}

//       />

//     </DashboardLayout>
//   );
// };

// export default RequestsDataDriver;
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import JobLayoutDriverActive from "../../Components/JobLayoutDriverActive";
import DashboardLayout from "../../Layouts/Dashboard";
import ModalPopup from "../../Components/Modal";
import JobsSidePopupData from "../../Components/JobsSidePopupData"; // Assuming this is the correct component for details
import useFetch from "../../hooks/useFetch";
import { GET_ALL_JOBS } from "../../constants";
import { IoMdArrowRoundBack } from "react-icons/io";

const RequestsDataDriver = () => {
  // --- States from both files ---
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(1);
  const [jobs, setJobs] = useState([]); // Use empty array, not mock data
  const [modalOpen, setModalOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState({});
  const [usertype, setUsertype] = useState(localStorage.getItem("type"));

  // --- Hooks ---
  const { fetchData, error } = useFetch();
  const [filters, setFilters] = useState({
    sortByPrice: "",
    locations: [],
    dateFilter: "",
    customDate: null,
    statusFilter: "",
  });

  // --- Popup Handlers ---
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openSide = () => setSideOpen(true);
  const closeSide = () => setSideOpen(false);

  const openPopup = (item) => {
    setCurrentJob(item);
    setSideOpen(false); // Close first to re-trigger animation/data
    setTimeout(() => {
      setSideOpen(true);
    }, 100);
  };

  // --- Lifecycle for usertype ---
  useEffect(() => {
    const userType = localStorage.getItem("type");
    setUsertype(userType);
  }, []);

  // --- Helper Functions ---
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

  // --- Data Fetching Logic ---
  const getAllJobs = useCallback(async () => {
    setLoading(true);

    const queryParams = {
      sortByPrice: filters.sortByPrice || undefined,
      locations: filters.locations.length > 0 ? filters.locations : undefined,
      dateFilter: filters.dateFilter || undefined,
      customDate:
        filters.dateFilter === "custom" && filters.customDate
          ? filters.customDate.toISOString()
          : undefined,
    };

    try {
      const response = await fetchData(GET_ALL_JOBS, queryParams);
      setJobs(response.data?.data || []); // Safety check for empty data
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Clear jobs on error
    } finally {
      setLoading(false);
    }
  }, [fetchData, filters]);

  // --- useEffect to call data fetching ---
  useEffect(() => {
    getAllJobs();
  }, [getAllJobs]);

  // --- Mobile device check ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  const shouldHide = isMobile && sideOpen;

  // --- Render Logic ---
  return (
    <DashboardLayout>
      {loading ? (
        <div className="bg-white p-5 rounded-xl text-center mt-[100px]">
          Please wait, we are loading all jobs....
        </div>
      ) : error ? (
        <div className="bg-white p-6 text-red-400 rounded-xl text-center mt-[100px]">
          Failed to load jobs. Please try again.
        </div>
      ) : (
        <div>
          <div className="page_header flex justify-between md:items-center items-start gap-3 mt-4 md:flex-row flex-col">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-[15px]">Jobs</h2>
            </div>
            <div className="flex gap-2 items-center md:w-auto w-full justify-center md:justify-end">
              <button
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
              </button>
            </div>
          </div>

          {jobs.length > 0 ? (
            <div className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 items-start">
                {/* LEFT SIDE */}
                <div
                  className={`rightpopupheightflx scrollbar overflow-scroll ${
                    shouldHide ? "hidden" : "block"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-2 pl-1 py-2">
                    {jobs.map((item, index) => (
                      <JobLayoutDriverActive
                        key={index}
                        status={statusValue(tab)}
                        job={item}
                        page={"jobslisting"}
                        pagetype={"newjobspage"}
                        openPopup={() => openPopup(item)} // Pass item to handler
                        setCurrentJob={setCurrentJob}
                      />
                    ))}
                  </div>
                </div>
                {/* RIGHT SIDE */}
                <div className="rightpopupheightflx mt-[10px]">
                  {shouldHide && (
                    <span className="uppercase flex gap-3 items-center">
                      <IoMdArrowRoundBack
                        size={29}
                        color="#85e211"
                        onClick={() => setSideOpen(false)}
                      />
                    </span>
                  )}
                  {sideOpen && (
                    <div className="bg-white rounded-lg">
                      <JobsSidePopupData
                        open={sideOpen}
                        type={usertype}
                        close={closeSide}
                        job={currentJob} // Pass the selected job data
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 text-red-400 rounded-xl text-center mt-[100px]">
              No Jobs Found
            </div>
          )}
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
    </DashboardLayout>
  );
};

export default RequestsDataDriver;
