/* eslint-disable react/prop-types */
// import React from "react";
// import { formatDate, getDistanceFromLatLonInKm } from "../utils/utils";
// import { selectUserType } from "../store/userSlice";
// import { useSelector } from "react-redux";
// import PickupIcon from "./IconType";
// import { PiUserCirclePlusBold, PiUserCirclePlus } from "react-icons/pi";
// import FloorNumberSVG from "./Floor";

// const JobLayoutDriverActive = ({
//   job,
//   status,
//   page,
//   openPopup,
//   pagetype,
//   pagecoming,
//   setCurrentJob,
// }) => {
//   console.log("job", job);
//   const statusManual =
//     job?.id == 3 && page == "shipments" ? "Cancelled" : status;
//   const handleLinkClick = () => {
//     setCurrentJob(job);
//     openPopup();
//   };

//   const userType = useSelector(selectUserType);

//   console.log(job, "job data ");

//   function extractFloorNumber(floorString) {
//     // Match digits at the beginning of the string
//     const match = floorString.match(/^(\d+)/);
//     return match ? parseInt(match[1], 10) : null;
//   }

//   function calculateTotalVolume() {
//     let items = job?.items;
//     let totalVolume = 0;
//     items.forEach((item) => {
//       const length = parseFloat(item.length);
//       const width = parseFloat(item.width);
//       const height = parseFloat(item.height);
//       const qty = parseInt(item.qty);

//       const volumePerItem = (length * width * height) / 1000000; // cm³ to m³
//       const itemTotalVolume = volumePerItem * qty;

//       totalVolume += itemTotalVolume;
//     });

//     return totalVolume.toFixed(3); // Round to 3 decimals
//   }

//   return (
//     <div
//       onClick={handleLinkClick}
//       key={"job_" + job?.id}
//       className="white_box p-4 hover:scale-[1.01] hover:border-[var(--primary-color)] border border-[#fafafa] transition-all duration-700 ease-in-out cursor-pointer"
//     >
//       <div className="flex justify-between items-center">
//         <div
//           className={`job_top flex items-center ${
//             pagetype == "newjobspage" ? "gap-1" : "gap-3"
//           } w-full`}
//         >
//           <div className="job_route">
//             <div className="text-[13px] font-semibold">
//               {job?.status === "pending"
//                 ? job?.fromAddress?.city + " " + job?.fromAddress?.region
//                 : job?.fromAddress?.address || job?.fromLocation}
//             </div>
//             <span className="text-[11px] font-normal text-[var(--light-color-text)]">
//               {formatDate(job?.pickupDate || job?.date)}{" "}
//               {job?.timeSlot?.start || job?.time}
//             </span>
//           </div>
//           <div className="route_line flex items-center">
//             <span className="route_circle"></span>
//             <span
//               className={`${
//                 pagetype == "newjobspage"
//                   ? "line_route_small"
//                   : "line_route_full"
//               }`}
//             ></span>
//             <span className="route_circle"></span>
//           </div>
//           <div className="job_route">
//             <div className="text-[13px] font-semibold">
//               {job?.status === "pending"
//                 ? job?.toAddress?.city + " " + job?.toAddress?.region
//                 : job?.toAddress?.address || job?.toLocation}
//             </div>
//             <span className="text-[11px] font-normal text-[var(--light-color-text)]">
//               {formatDate(job?.pickupDate || job?.date)}{" "}
//               {job?.timeSlot?.end || job?.time}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <div className="flex gap-3 items-center">
//           {page != "jobslisting" && (
//             <>
//               <div className="border border-[var(--primary-color)] h-[33px] w-[52px] rounded-full flex justify-center items-center bg-[var(--primary-color)]">
//                 <svg
//                   width="16"
//                   height="18"
//                   viewBox="0 0 16 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M5.75 16.5V9H10.25V16.5M1.25 6.75L8 1.5L14.75 6.75V15C14.75 15.3978 14.592 15.7794 14.3107 16.0607C14.0294 16.342 13.6478 16.5 13.25 16.5H2.75C2.35218 16.5 1.97064 16.342 1.68934 16.0607C1.40804 15.7794 1.25 15.3978 1.25 15V6.75Z"
//                     stroke="white"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//               <div
//                 className={`${
//                   statusManual == "Cancelled"
//                     ? "bg-[#FF3B30]"
//                     : "bg-[var(--primary-color)]"
//                 } text-[11px] p-1 px-4 rounded-full text-white md:block hidden`}
//               >
//                 {page == "shipments" ? statusManual : status}
//               </div>
//             </>
//           )}

//           <div
//             className={`job_top flex items-center gap-5 w-full ${
//               (pagetype || pagecoming) == "newjobspage"
//                 ? "flex-col"
//                 : "flex-row"
//             }`}
//           >
//             {/* <div className="job_route">
//               <div className="text-[13px] font-normal text-[#00000080]">
//                 Available, kg
//               </div>
//               <span className="text-[11px] font-normal text-[var(--light-color-text)]">
//                 20 / 200
//               </span>
//             </div> */}
//             <div className="job_route">
//               <div className="text-[13px] font-normal text-[#00000080]">
//                 {page != "jobslisting" ? "Shipment number" : "Total Distance"}
//               </div>
//               <span className="text-[11px] font-normal text-[var(--light-color-text)]">
//                 {page != "jobslisting"
//                   ? job?.jobNumber
//                   : getDistanceFromLatLonInKm(
//                       job?.fromAddress?.lat,
//                       job?.fromAddress?.lng,
//                       job?.toAddress?.lat,
//                       job?.toAddress?.lng
//                     ).toFixed(2) + " km"}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="font-bold text-3xl text-[var(--primary-color)]">
//           ${job?.totalPrice}
//         </div>
//       </div>
//       <div className="mt-2">
//         <span className="text-[var(--light-color-text)]">
//           Maximaal totaal volume:{" "}
//         </span>
//         <span>{calculateTotalVolume() + " m³"}</span>
//       </div>
//       <div className="space-y-1 flex items-center gap-2 mt-4">
//         <div
//           className="svg_smalll_custom"
//           title={job?.itemSource ? `${job.itemSource}` : ""}
//         >
//           <PickupIcon pickupType={job?.pickupType} />
//         </div>
//         <div>
//           {/* Helpers:{" "} */}
//           {job?.extraServices?.helpers === 2 && <PiUserCirclePlus size={22} />}
//           {/* : "No Extra Helpers"} */}
//         </div>
//         <div className="mt-10">
//           <span className="font-bold text-[#202020)]">
//             {job?.extraServices?.floor}
//           </span>
//           {/* <FloorNumberSVG floor={(job?.extraServices?.floor)} textColor="#000" bgColor="#fff" /> */}
//           {/* Floor: {job?.extraServices?.floor} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobLayoutDriverActive;
/* eslint-disable react/prop-types */
import React from "react";
import { formatDate, getDistanceFromLatLonInKm } from "../utils/utils";
import { selectUserType } from "../store/userSlice";
import { useSelector } from "react-redux";
import PickupIcon from "./IconType";
import { PiUserCirclePlusBold, PiUserCirclePlus } from "react-icons/pi";
import FloorNumberSVG from "./Floor";

const JobLayoutDriverActive = ({
  job,
  status,
  page,
  openPopup,
  pagetype,
  pagecoming,
  setCurrentJob,
}) => {
  console.log("job", job);
  const statusManual =
    job?._id == 3 && page == "shipments" ? "Cancelled" : status; // <-- FIXED: job.id to job._id
  const handleLinkClick = () => {
    setCurrentJob(job);
    openPopup();
  };

  const userType = useSelector(selectUserType);

  console.log(job, "job data ");

  function extractFloorNumber(floorString) {
    // Match digits at the beginning of the string
    const match = floorString.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  function calculateTotalVolume() {
    let items = job?.items;
    let totalVolume = 0;
    if (!items) return 0; // <-- ADDED: Safety check
    items.forEach((item) => {
      const length = parseFloat(item.length);
      const width = parseFloat(item.width);
      const height = parseFloat(item.height);
      const qty = parseInt(item.quantity); // <-- FIXED: item.qty to item.quantity

      if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(qty)) return; // <-- ADDED: Safety check

      const volumePerItem = (length * width * height) / 1000000; // cm³ to m³
      const itemTotalVolume = volumePerItem * qty;

      totalVolume += itemTotalVolume;
    });

    return totalVolume.toFixed(3); // Round to 3 decimals
  }

  return (
    <div
      onClick={handleLinkClick}
      key={"job_" + job?._id} // <-- FIXED: job.id to job._id
      className="white_box p-4 hover:scale-[1.01] hover:border-[var(--primary-color)] border border-[#fafafa] transition-all duration-700 ease-in-out cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div
          className={`job_top flex items-center ${
            pagetype == "newjobspage" ? "gap-1" : "gap-3"
          } w-full`}
        >
          <div className="job_route">
            <div className="text-[13px] font-semibold">
              {/* FIXED: fromAddress to pickupAddress, fromLocation to from */}
              {job?.status === "pending"
                ? job?.pickupAddress?.cityOrState
                : job?.pickupAddress?.streetAddress || job?.from}
            </div>
            <span className="text-[11px] font-normal text-[var(--light-color-text)]">
              {/* FIXED: Data structure for date and time */}
              {formatDate(job?.pickupDateInfo?.date)}{" "}
              {job?.pickupDateInfo?.timeSlot}
            </span>
          </div>
          <div className="route_line flex items-center">
            <span className="route_circle"></span>
            <span
              className={`${
                pagetype == "newjobspage"
                  ? "line_route_small"
                  : "line_route_full"
              }`}
            ></span>
            <span className="route_circle"></span>
          </div>
          <div className="job_route">
            <div className="text-[13px] font-semibold">
              {/* FIXED: toAddress to deliveryAddress, toLocation to to */}
              {job?.status === "pending"
                ? job?.deliveryAddress?.cityOrState
                : job?.deliveryAddress?.streetAddress || job?.to}
            </div>
            <span className="text-[11px] font-normal text-[var(--light-color-text)]">
              {/* FIXED: Data structure for date and time */}
              {formatDate(job?.deliveryDateInfo?.date)}{" "}
              {job?.deliveryDateInfo?.timeSlot}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3 items-center">
          {page != "jobslisting" && (
            <>
              <div className="border border-[var(--primary-color)] h-[33px] w-[52px] rounded-full flex justify-center items-center bg-[var(--primary-color)]">
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.75 16.5V9H10.25V16.5M1.25 6.75L8 1.5L14.75 6.75V15C14.75 15.3978 14.592 15.7794 14.3107 16.0607C14.0294 16.342 13.6478 16.5 13.25 16.5H2.75C2.35218 16.5 1.97064 16.342 1.68934 16.0607C1.40804 15.7794 1.25 15.3978 1.25 15V6.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className={`${
                  statusManual == "Cancelled"
                    ? "bg-[#FF3B30]"
                    : "bg-[var(--primary-color)]"
                } text-[11px] p-1 px-4 rounded-full text-white md:block hidden`}
              >
                {page == "shipments" ? statusManual : status}
              </div>
            </>
          )}

          <div
            className={`job_top flex items-center gap-5 w-full ${
              (pagetype || pagecoming) == "newjobspage"
                ? "flex-col"
                : "flex-row"
            }`}
          >
            <div className="job_route">
              <div className="text-[13px] font-normal text-[#00000080]">
                {page != "jobslisting" ? "Shipment number" : "Total Distance"}
              </div>
              <span className="text-[11px] font-normal text-[var(--light-color-text)]">
                {page != "jobslisting"
                  ? job?._id?.slice(-6) // <-- FIXED: Use _id as fallback for jobNumber
                  : job?.totalDistance}{" "}
                {/* <-- FIXED: Use provided totalDistance */}
              </span>
            </div>
          </div>
        </div>

        <div className="font-bold text-3xl text-[var(--primary-color)]">
          ${job?.courierPrice || "100"}
        </div>
      </div>
      <div className="mt-2">
        <span className="text-[var(--light-color-text)]">
          Maximaal total volume:{" "}
        </span>
        <span>{calculateTotalVolume() + " m³"}</span>
      </div>
      <div className="space-y-1 flex items-center gap-2 mt-4">
        <div
          className="svg_smalll_custom"
          title={job?.transportationType?.name} // <-- FIXED: Use transportationType
        >
          <PickupIcon pickupType={job?.transportationType?.name} />{" "}
          {/* <-- FIXED: Use transportationType */}
        </div>
        <div>
          {/* Helpers:{" "} */}
          {/* FIXED: extraServices.helpers to extraService.service.extraHelp */}
          {job?.extraService?.service?.extraHelp === 2 && (
            <PiUserCirclePlus size={22} />
          )}
          {/* : "No Extra Helpers"} */}
        </div>
        <div className="mt-10">
          <span className="font-bold text-[#202020)]">
            {job?.extraService?.service?.extraHelp}
          </span>
          {/* <FloorNumberSVG floor={(job?.extraServices?.floor)} textColor="#000" bgColor="#fff" /> */}
          {/* Floor: {job?.extraServices?.floor} */}
        </div>
      </div>
    </div>
  );
};

export default JobLayoutDriverActive;
