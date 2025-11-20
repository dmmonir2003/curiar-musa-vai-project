/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect, useRef } from "react";
// import DashboardLayout from "../../Layouts/Dashboard";
// import { useNavigate } from "react-router-dom";
// import CalendarHeader from "./../../Components/Calendar";
// import dayjs from "dayjs";
// import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
// import {
//   ACCEPT_JOB,
//   ADD_DAILY_ROUTES,
//   CANCEL_DAILY_ROUTES,
//   EDIT_DAILY_ROUTES,
//   GET_ROUTES,
//   MAPS_API_KEY,
//   UPDATE_POSITIONS,
// } from "../../constants";
// import toast from "react-hot-toast";
// import useFetch from "../../hooks/useFetch";
// import useCreateOrEdit from "../../hooks/useCreateOrEdit";
// import RouteMap from "../../Components/RoutesMap";
// import { TiMinus, TiPlus } from "react-icons/ti";
// import {
//   MdOutlineKeyboardArrowUp,
//   MdOutlineKeyboardArrowDown,
// } from "react-icons/md";
// import { CgClose } from "react-icons/cg";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { RiEdit2Line } from "react-icons/ri";
// import { isWithin24Hours } from "../../utils/utils";
// import { PiNotePencilLight } from "react-icons/pi";

// const DailyRoutes = () => {
//   const navigate = useNavigate();
//   const [routes, setRoutes] = useState([]);
//   const [showmodal, setShowModal] = useState(false);
//   const [showedit, setShowEdit] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [editdata, setEditData] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [btnloading, setBtnLoading] = useState(false);
//   const inputRef = useRef(null);
//   const inputRef2 = useRef(null);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [endtime, setEndTime] = useState("");
//   const [endtime2, setEndTime2] = useState("");
//   const [starttime, setStartTime] = useState("");
//   const [starttime2, setStartTime2] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [latitude1, setLatitude1] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [longitude1, setLongitude1] = useState("");
//   const { fetchData } = useFetch();
//   const { submitData } = useCreateOrEdit();
//   const [editId, setEditId] = useState(null);
//   const [mapRoutes, setMapRoutes] = useState([]);
//   const [mapsingleroutes, setMapSingleRoutes] = useState([]);

//   const [choose, setChoose] = useState("");
//   const [minutesval, setMinutesVal] = useState(11);
//   const [minutesvalDel, setMinutesValDel] = useState(11);
//   const [m3sval, setM3Val] = useState(5);
//   const [tijovak, setTijovak] = useState("");
//   const [tijovakdel, setTijovakDel] = useState("");
//   const [showRouteData, setShowRouteData] = useState(false);
//   const [selectedRouteData, setSelectedRouteData] = useState(null);
//   const [type, setType] = useState("");
//   const [comments, setComments] = useState("");

//   const [loadingDetails, setLoadingDetails] = useState(false);

//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   const handlePlaceChanged = (adress) => {
//     if (adress === "from") {
//       const [place] = inputRef.current.getPlaces();
//       setFrom(place?.formatted_address);
//       const lat = place.geometry.location.lat();
//       const lng = place.geometry.location.lng();
//       setLatitude(lat);
//       setLongitude(lng);
//     }

//     if (adress === "to") {
//       const [place] = inputRef2.current.getPlaces();
//       setTo(place?.formatted_address);
//       const lat = place.geometry.location.lat();
//       const lng = place.geometry.location.lng();
//       setLatitude1(lat);
//       setLongitude1(lng);
//     }
//   };

//   // --- MAIN FETCH LOGIC ---
//   const getRoutes = async () => {
//     try {
//       setLoading(true);
//       // Use Query params as requested
//       const formattedDate = selectedDate.format("YYYY-MM-DD");
//       const response = await fetchData(
//         `${GET_ROUTES}?pickupDate=${formattedDate}`
//       );

//       if (response && response.data && response.data.success) {
//         const rawJobs = response.data.data || [];
//         let flatRoutes = [];

//         // Flatten the Jobs into "Stops" (Pickup Node + Delivery Node)
//         rawJobs.forEach((job, index) => {
//           // 1. Create Pickup Stop
//           flatRoutes.push({
//             _id: job._id + "_pickup", // Unique ID for React Key
//             originalId: job._id,
//             type: "pickup",
//             status: job.status,
//             isManuallyAdded: false, // From API
//             serviceMinutes: 0, // Default if not in API
//             spaceRequired: 0, // Default if not in API

//             // Map Address
//             address: {
//               address: `${job.pickupAddress?.streetAddress}, ${job.pickupAddress?.cityOrState}`,
//               lat: job.pickupAddress?.lat || 0,
//               lng: job.pickupAddress?.lng || 0,
//             },

//             // Map Time
//             timeSlot: job.pickupDateInfo?.timeSlot,
//             date: job.pickupDateInfo?.date,

//             // Keep full reference for the "View Data" modal
//             jobRequestId: job,
//           });

//           // 2. Create Delivery Stop
//           flatRoutes.push({
//             _id: job._id + "_delivery",
//             originalId: job._id,
//             type: "delivery",
//             status: job.status,
//             isManuallyAdded: false,
//             serviceMinutes: 0,
//             spaceRequired: 0,

//             // Map Address
//             address: {
//               address: `${job.deliveryAddress?.streetAddress}, ${job.deliveryAddress?.cityOrState}`,
//               lat: job.deliveryAddress?.lat || 0,
//               lng: job.deliveryAddress?.lng || 0,
//             },

//             // Map Time
//             timeSlot: job.deliveryDateInfo?.timeSlot,
//             date: job.deliveryDateInfo?.date,

//             jobRequestId: job,
//           });
//         });

//         setRoutes(flatRoutes);

//         // Only include routes with valid coordinates for the map to avoid crashes
//         const validMapRoutes = flatRoutes.filter(
//           (route) => route?.address?.lat !== 0 && route?.address?.lng !== 0
//         );

//         const mapRoutesData = transformRoutesForMap(validMapRoutes);
//         setMapRoutes(mapRoutesData);
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log("error", error);
//     }
//   };

//   const transformRoutesForMap = (routes) => {
//     return routes.map((route, index) => ({
//       lat: route.address.lat,
//       lng: route.address.lng,
//       address: route.address.address,
//       timeSlot: route.timeSlot,
//       id: route._id,
//       status: route.status,
//       order: index + 1,
//     }));
//   };

//   useEffect(() => {
//     getRoutes();
//   }, [selectedDate]);

//   const handleAddOrEditDailyRoutes = async () => {
//     if (!editId) {
//       try {
//         if (!from || !starttime || !endtime) {
//           toast.error("Please fill all fields");
//           return;
//         }

//         const timeSlot = `${starttime} - ${endtime}`;
//         const date = selectedDate.format("YYYY-MM-DD");
//         setBtnLoading(true);
//         const payload = {
//           date,
//           timeSlot,
//           address: { address: from, lat: latitude, lng: longitude },
//           serviceMinutes: minutesval,
//           spaceRequired: m3sval,
//           positionNumber: tijovak,
//           type:
//             choose == 1
//               ? "pickup_delivery"
//               : choose == 2
//               ? "pickup"
//               : "delivery",
//         };

//         const response = await submitData(ADD_DAILY_ROUTES, payload, "POST");

//         if (response) {
//           toast.success("Route added successfully");
//           setShowModal(false);
//           setFrom("");
//           setStartTime("");
//           setEndTime("");
//           setLatitude("");
//           setLongitude("");
//           getRoutes();
//           setBtnLoading(false);
//         }
//       } catch (error) {
//         setBtnLoading(false);
//         console.log(error);
//         toast.error(error.message || "Error adding route");
//       }
//     }
//     if (editId) {
//       try {
//         if (!from || !starttime) {
//           toast.error("Please fill all fields");
//           return;
//         }

//         const timeSlot = `${starttime} - ${endtime}`;
//         const date = selectedDate.format("YYYY-MM-DD");

//         const payload = {
//           date,
//           timeSlot,
//           address: { address: from, lat: latitude, lng: longitude },
//           type,
//           serviceMinutes: minutesval,
//           spaceRequired: m3sval,
//         };

//         const response = await submitData(
//           `${EDIT_DAILY_ROUTES}/${editId}`,
//           payload,
//           "PUT"
//         );

//         if (response) {
//           toast.success("Route updated successfully");
//           setShowModal(false);
//           setFrom("");
//           setMinutesVal(11);
//           setStartTime("");
//           setEndTime("");
//           setLatitude("");
//           setLongitude("");
//           getRoutes();
//           setEditId(null);
//           setShowEdit(false);
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message || "Error adding route");
//       }
//     }
//   };

//   const handlePickUpAndDelievery = async () => {
//     const date = selectedDate.format("YYYY-MM-DD");

//     const pickupPayload = {
//       address: { address: from, lat: latitude, lng: longitude },
//       timeSlot: `${starttime} - ${endtime}`,
//       serviceMinutes: minutesval,
//       spaceRequired: m3sval,
//       positionNumber: tijovak,
//       type: "pickup",
//       date: date,
//     };

//     const deliveryPayload = {
//       address: { address: to, lat: latitude1, lng: longitude1 },
//       timeSlot: `${starttime2} - ${endtime2}`,
//       serviceMinutes: minutesvalDel,
//       spaceRequired: m3sval,
//       positionNumber: tijovakdel,
//       type: "delivery",
//       date: date,
//     };

//     const [pickupResponse, deliveryResponse] = await Promise.all([
//       submitData(ADD_DAILY_ROUTES, pickupPayload, "POST"),
//       submitData(ADD_DAILY_ROUTES, deliveryPayload, "POST"),
//     ]);

//     if (pickupResponse.data.success && deliveryResponse.data.success) {
//       toast.success("Pickup and delivery routes added successfully");
//       setFrom("");
//       setStartTime("");
//       setEndTime("");
//       setMinutesVal(0);
//       setM3Val(0);
//       setTijovak("");
//       setTijovakDel("");
//       setTo("");
//       setStartTime2("");
//       setEndTime2("");
//       setLatitude("");
//       setLongitude("");
//       setLatitude1("");
//       setLongitude1("");
//       setShowModal(false);
//       getRoutes();
//     } else {
//       toast.error("Error adding one or both routes");
//     }
//   };

//   const cType = selectedRouteData?.type === "pickup" ? "start" : "end";
//   const [rawMin, rawMax] =
//     (!selectedRouteData?.isManuallyAdded &&
//       selectedRouteData?.jobRequestId &&
//       selectedRouteData?.jobRequestId?.timeSlot && // Added check
//       selectedRouteData?.jobRequestId?.timeSlot[cType]?.split(" - ")) ||
//     [];

//   const convertTo24HourFormat = (timeStr) => {
//     if (!timeStr) return "";
//     const [time, modifier] = timeStr.split(" ");
//     let [hours, minutes] = time.split(":");

//     if (modifier === "PM" && hours !== "12") {
//       hours = String(Number(hours) + 12);
//     } else if (modifier === "AM" && hours === "12") {
//       hours = "00";
//     }

//     return `${hours.padStart(2, "0")}:${minutes}`;
//   };

//   const minStart = rawMin ? convertTo24HourFormat(rawMin) : "";
//   const maxEnd = rawMax ? convertTo24HourFormat(rawMax) : "";

//   const handleEditClick = (route) => {
//     setEditId(route?._id);
//     setFrom(route.address.address);
//     // Safety check for splitting timeSlot
//     const [start, end] = route.timeSlot
//       ? route.timeSlot.split(" - ")
//       : ["", ""];
//     setStartTime(start);
//     setEndTime(end || start);
//     setLatitude(route?.address?.lat);
//     setLongitude(route?.address?.lng);
//     setShowModal(true);
//   };

//   const [showcompletepopup, setShowCompletePopup] = useState(false);
//   const [completerouteid, setCompleteRouteID] = useState(false);

//   const handleMarkComplete = async (routeId, status) => {
//     if (status === "completed" || status === "canceled") {
//       return;
//     }

//     if (status === "pending" || status == "in-progress") {
//       setShowCompletePopup(true);
//       setCompleteRouteID(routeId);
//       return;
//     } else {
//       setShowCompletePopup(true);
//       if (imageSrc == null) {
//         toast.error("Please upload image or take a picture");
//         return;
//       }
//       if (comments == "") {
//         toast.error("Please enter comments");
//         return;
//       }
//     }
//     try {
//       const response = await submitData(
//         `${EDIT_DAILY_ROUTES}/complete/${routeId}`,
//         { comments, image: imageSrc },
//         "PUT"
//       );
//       if (response.data.success) {
//         setShowCompletePopup(false);
//         toast.success("Route marked as complete");
//         getRoutes();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update status");
//     }
//   };

//   function getStartTime(timeSlot) {
//     if (!timeSlot) return "";
//     const [startTime] = timeSlot.split(" - ");
//     if (!startTime) return "";

//     const parts = startTime.trim().split(":");
//     if (parts.length < 2) return startTime;

//     const [hour, minute] = parts.map(Number);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const hour12 = hour % 12 === 0 ? 12 : hour % 12;

//     return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
//   }

//   const moveRoute = (index, direction) => {
//     setRoutes((prevRoutes) => {
//       const newRoutes = [...prevRoutes];
//       if (
//         (direction === "up" && index === 1) ||
//         (direction === "down" && index === newRoutes.length - 1)
//       ) {
//         return prevRoutes;
//       }
//       const swapIndex = direction === "up" ? index - 1 : index + 1;
//       [newRoutes[index], newRoutes[swapIndex]] = [
//         newRoutes[swapIndex],
//         newRoutes[index],
//       ];
//       handleUpdatePositions(newRoutes);
//       return newRoutes;
//     });
//   };

//   const handleUpdatePositions = async (routess) => {
//     const reorderedRoutes = routess.map((route, index) => ({
//       _id: route._id,
//       positionNumber: index,
//     }));
//     try {
//       await submitData(UPDATE_POSITIONS, { routes: reorderedRoutes }, "POST");
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   // const handleViewData = (id) => {
//   //   setShowRouteData(true);
//   //   const selectedRoute = mapRoutes[id];
//   //   setMapSingleRoutes(selectedRoute ? [selectedRoute] : []);
//   //   setSelectedRouteData(routes[id]);
//   // };

//   // Add specific loading state for the side panel if you haven't already

//   const handleViewData = async (id) => {
//     setShowRouteData(true);
//     const selectedRoute = mapRoutes[id];
//     const initialRouteData = routes[id];

//     setMapSingleRoutes(selectedRoute ? [selectedRoute] : []);
//     // Set initial data so the panel opens immediately
//     setSelectedRouteData(initialRouteData);

//     // FETCH FRESH DATA
//     if (initialRouteData?.originalId) {
//       setLoadingDetails(true);
//       try {
//         // Assuming you have a constant for GET_JOB_BY_ID or similar
//         // Using the logic you provided:
//         const response = await fetchData(
//           `${ACCEPT_JOB}/${initialRouteData.originalId}`
//         );

//         if (response?.data) {
//           const detailedJob = response.data.data || response.data;

//           // Update state by merging the new detailed job info into jobRequestId
//           setSelectedRouteData((prev) => ({
//             ...prev,
//             jobRequestId: detailedJob, // This now contains the full userId object
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching details:", error);
//         toast.error("Could not load full contact details");
//       } finally {
//         setLoadingDetails(false);
//       }
//     }
//   };
//   const trimNumberToSixChars = (num) => {
//     if (!num) return "";
//     return num.toString().slice(0, 6);
//   };

//   const handleEditSpecificRoute = async (route) => {
//     console.log("route", route);
//     setEditData(route);
//     setMinutesVal(route?.serviceMinutes || 11);
//     setM3Val(route?.spaceRequired || 5);
//     setType(route.type);
//     setEditId(route?._id);
//     setFrom(route?.address?.address || "");
//     const [start, end] = route.timeSlot
//       ? route.timeSlot.split(" - ")
//       : ["", ""];
//     setStartTime(start);
//     setEndTime(end || start);
//     setLatitude(route?.address?.lat);
//     setLongitude(route?.address?.lng);
//     setShowEdit(true);
//   };

//   const handleCancel = async () => {
//     try {
//       const response = await submitData(
//         CANCEL_DAILY_ROUTES,
//         { routeId: editId },
//         "POST"
//       );

//       if (response?.data?.paymentRequired && response?.data?.checkoutUrl) {
//         toast.success("Cancellation requires a fee. Redirecting to payment...");
//         localStorage.setItem("paymentId", response?.data?.paymentId);
//         window.location.href = response?.data?.checkoutUrl;
//       } else if (response?.data?.message) {
//         toast.success(response?.data?.message);
//         setShowConfirm(false);
//         setShowEdit(false);
//         getRoutes();
//       } else {
//         toast.error("Unexpected response from server.");
//       }
//     } catch (error) {
//       console.error("Cancel error:", error);
//       const errorMessage =
//         error?.response?.data?.error ||
//         error?.message ||
//         "Something went wrong while cancelling the route.";
//       toast.error(errorMessage);
//     }
//   };

//   const [imageSrc, setImageSrc] = useState(null);
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [takingPhoto, setTakingPhoto] = useState(false);

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleTakePicture = async () => {
//     setTakingPhoto(true);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();
//     } catch (err) {
//       console.error("Camera error:", err);
//     }
//   };

//   const haversineDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = (value) => (value * Math.PI) / 180;
//     const R = 6371;
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const handleCapture = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL("image/png");
//     setImageSrc(imageData);
//     const stream = video.srcObject;
//     const tracks = stream.getTracks();
//     tracks.forEach((track) => track.stop());
//     setTakingPhoto(false);
//   };

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     if (/android|iPad|iPhone|iPod/i.test(userAgent.toLowerCase())) {
//       setIsMobile(true);
//     }
//   }, []);

//   const shouldHide = isMobile && showRouteData;

//   function calculateTotalVolume() {
//     let items = selectedRouteData?.jobRequestId?.items;
//     if (!items) return 0;
//     let totalVolume = 0;
//     items.forEach((item) => {
//       const length = parseFloat(item.length);
//       const width = parseFloat(item.width);
//       const height = parseFloat(item.height);
//       const qty = parseInt(item.quantity || item.qty);
//       const volumePerItem = (length * width * height) / 1000000;
//       const itemTotalVolume = volumePerItem * qty;
//       totalVolume += itemTotalVolume;
//     });
//     return totalVolume.toFixed(3);
//   }

//   return (
//     <DashboardLayout>
//       <div className=" w-full relative mb-4 px-5">
//         <div className="flex items-start justify-between gap-10 md:flex-row flex-col">
//           <div
//             className={`w-full md:w-[40%] ${shouldHide ? "hidden" : "block"}`}
//           >
//             <CalendarHeader onDateChange={handleDateChange} />
//             <div className="mb-5">
//               <RouteMap routes={mapRoutes} />
//             </div>

//             <div className="flex justify-end items-center gap-3">
//               <button
//                 className="rounded-full px-5 flex items-center gap-2 py-2 !bg-[var(--primary-color)] !text-[var(--text-color)]"
//                 onClick={() => {
//                   setEditData("");
//                   setEditId(null);
//                   setFrom("");
//                   setStartTime("");
//                   setEndTime("");
//                   setLatitude("");
//                   setLongitude("");
//                   setShowEdit(false);
//                   setShowModal(true);
//                 }}
//               >
//                 <span>Add Route</span>
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 12 12"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M0.75 6H11.25M6 0.75V11.25"
//                     stroke="#202020"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* JOBS SECTION */}
//             <div className="mt-8">
//               {routes.length == 0 && (
//                 <div className="flex items-center justify-center bg-white w-full p-4 rounded-xl">
//                   {loading ? "Loading..." : "No routes found"}
//                 </div>
//               )}
//               {routes?.map((item, index) => (
//                 <React.Fragment key={index}>
//                   <div
//                     key={index}
//                     className="flex items-center gap-4 justify-between mb-6"
//                   >
//                     <div className="dot_class_main_routes">
//                       <div
//                         className={`dot_route ${
//                           index === routes.length - 1 ? "no-border" : ""
//                         }`}
//                       ></div>
//                     </div>
//                     <div
//                       className="white_box p-4 dot_class_right_routes cursor-pointer hover:shadow-lg hover:scale-[1.01]"
//                       onClick={() => handleViewData(index)}
//                     >
//                       <div className="flex justify-between items-center border-b border-[#e9e9e9] pb-3">
//                         <p className="font-normal text-[var(--text-color)]">
//                           {item?.address?.address}
//                         </p>
//                         <span className="flex items-center gap-2">
//                           <span>
//                             <RiEdit2Line
//                               size={16}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleEditSpecificRoute(item);
//                                 setSelectedRouteData(item);
//                               }}
//                             />
//                           </span>
//                           {index > 0 && (
//                             <>
//                               <MdOutlineKeyboardArrowUp
//                                 size={20}
//                                 className={`cursor-pointer ${
//                                   index === 1
//                                     ? "opacity-50 cursor-not-allowed"
//                                     : ""
//                                 }`}
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   e.stopPropagation();
//                                   moveRoute(index, "up");
//                                 }}
//                               />
//                               {index < routes.length - 1 && (
//                                 <MdOutlineKeyboardArrowDown
//                                   size={20}
//                                   className={`cursor-pointer ${
//                                     index === routes.length - 1
//                                       ? "opacity-50 cursor-not-allowed"
//                                       : ""
//                                   }`}
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     e.stopPropagation();
//                                     moveRoute(index, "down");
//                                   }}
//                                 />
//                               )}
//                             </>
//                           )}
//                         </span>
//                       </div>
//                       <div className="flex justify-between  mt-2 items-center">
//                         <span className="font-bold mt-0 block text-md uppercase">
//                           {index === 0 && "Start - "}
//                           {index === routes.length - 1 && "End - "}

//                           {item?.timeSlot && (
//                             <span className="text-[var(--text-color)] font-normal">
//                               {getStartTime(item?.timeSlot)}
//                             </span>
//                           )}
//                           {index === 0 || routes.length - 1 === index ? (
//                             ""
//                           ) : (
//                             <span className="ml-1 font-semibold">
//                               | {item?.type}
//                             </span>
//                           )}
//                         </span>
//                         <span className="flex items-center gap-3">
//                           {index != 0 && !item.isEndLocation && (
//                             <button
//                               onClick={() =>
//                                 handleMarkComplete(item._id, item.status)
//                               }
//                               className={`px-3 py-2 rounded-full text-[10px] ${
//                                 item.status === "completed"
//                                   ? "bg-green-100 text-green-800 cursor-default"
//                                   : `${
//                                       item.status === "pending" ||
//                                       item?.status == "in-progress"
//                                         ? "bg-orange-400"
//                                         : "bg-red-400"
//                                     } text-white hover:bg-blue-200`
//                               }`}
//                               disabled={
//                                 item.status === "completed" ||
//                                 item.status === "canceled"
//                               }
//                             >
//                               {item.status === "completed"
//                                 ? "Completed"
//                                 : item.status === "canceled"
//                                 ? "Cancelled"
//                                 : "Mark Complete"}
//                             </button>
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {index < routes.length - 1 &&
//                     (() => {
//                       const current = item?.address;
//                       const next = routes[index + 1]?.address;

//                       if (
//                         current?.lat &&
//                         current?.lng &&
//                         next?.lat &&
//                         next?.lng
//                       ) {
//                         const distanceKm = haversineDistance(
//                           current.lat,
//                           current.lng,
//                           next.lat,
//                           next.lng
//                         );
//                         const avgSpeedKmH = 40;
//                         const travelTimeMinutes =
//                           (distanceKm / avgSpeedKmH) * 60;

//                         return (
//                           <div className="text-center mb-4 text-gray-500 text-sm italic">
//                             Distance to next: {distanceKm.toFixed(2)} km —
//                             approx. {Math.round(travelTimeMinutes)} min
//                           </div>
//                         );
//                       }
//                       return null;
//                     })()}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//           <div className="w-full md:w-[60%]">
//             {showRouteData && (
//               <>
//                 <div className="white_box py-4 px-6">
//                   <h1 className="font-bold text-xl pb-4 flex justify-between items-center">
//                     <span className="uppercase flex gap-3 items-center">
//                       {shouldHide && (
//                         <IoMdArrowRoundBack
//                           size={29}
//                           color="#85e211"
//                           onClick={() => setShowRouteData(false)}
//                         />
//                       )}
//                       {selectedRouteData?.type}
//                     </span>
//                     <>
//                       <div
//                         className="cursor-pointer font-normal text-md flex items-center gap-1"
//                         onClick={() => {
//                           handleEditSpecificRoute(selectedRouteData);
//                         }}
//                       >
//                         <PiNotePencilLight size={20} color="#000000" />
//                         <span className="!text-[13px] font-semibold">Edit</span>
//                       </div>
//                     </>
//                   </h1>
//                   <hr className="mb-4" />

//                   <div>
//                     <div className="text-lg font-semibold text-[var(--primary-color)] mb-2">
//                       {selectedRouteData?.address?.address || "No Address"}
//                     </div>
//                     {selectedRouteData && selectedRouteData?.serviceMinutes && (
//                       <div className="text-lg mt-2">
//                         <span>Service time: </span>{" "}
//                         <span className="font-semibold">
//                           {selectedRouteData?.serviceMinutes} minutes
//                         </span>
//                       </div>
//                     )}

//                     {selectedRouteData && selectedRouteData?.spaceRequired && (
//                       <div className="text-lg mt-2">
//                         <span>Space Owned: </span>{" "}
//                         <span className="font-semibold">
//                           {selectedRouteData?.spaceRequired} m<sup>3</sup>
//                         </span>
//                       </div>
//                     )}

//                     <div className="mb-5 mt-4">
//                       <RouteMap
//                         routes={mapsingleroutes}
//                         letterdisplay={mapsingleroutes[0]?.order}
//                       />
//                     </div>
//                     {selectedRouteData?.isManuallyAdded == false && (
//                       <>
//                         <h1 className="font-bold text-xl pb-4">Information</h1>
//                         <hr className="mb-4" />

//                         {loadingDetails ? (
//                           <div className="text-center py-4">
//                             Loading details...
//                           </div>
//                         ) : (
//                           <>
//                             {/* Service Time & Space (If available in root or calculated) */}
//                             <div className="mb-4">
//                               <div className="text-md mt-2">
//                                 <span>Service time: </span>{" "}
//                                 <span className="font-semibold">
//                                   {selectedRouteData?.serviceMinutes || 15}{" "}
//                                   minutes
//                                 </span>
//                               </div>
//                               <div className="text-md mt-2">
//                                 <span>Space Owned: </span>{" "}
//                                 <span className="font-semibold">
//                                   {selectedRouteData?.spaceRequired ||
//                                     calculateTotalVolume()}{" "}
//                                   m<sup>3</sup>
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex items-center gap-2 flex-wrap">
//                               <div className="pills_address capitalize">
//                                 <b>Pickup From</b> -{" "}
//                                 {
//                                   selectedRouteData?.jobRequestId
//                                     ?.transportationType?.name
//                                 }{" "}
//                                 {
//                                   selectedRouteData?.jobRequestId
//                                     ?.transportationType?.options
//                                 }
//                               </div>
//                               <div className="pills_address capitalize">
//                                 Floor:{" "}
//                                 {
//                                   selectedRouteData?.jobRequestId?.extraService
//                                     ?.floor?.level
//                                 }
//                               </div>
//                             </div>

//                             {/* ... Items section (remains the same) ... */}

//                             <div className="mt-5">
//                               <h3 className="font-bold text-lg pb-1">
//                                 Contact Details
//                               </h3>
//                             </div>

//                             {/* UPDATED MAPPING BASED ON YOUR JSON */}
//                             <div className="flex items-center gap-2 mt-1">
//                               <span className="text-[#00000070] font-bold">
//                                 Name:
//                               </span>
//                               <span className="text-[var(--text-color)] text-[14px]">
//                                 {/* Accessing via userId.name based on your JSON */}
//                                 {
//                                   selectedRouteData?.jobRequestId?.userId?.name
//                                     ?.firstName
//                                 }{" "}
//                                 {
//                                   selectedRouteData?.jobRequestId?.userId?.name
//                                     ?.lastName
//                                 }
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-2 mt-2">
//                               <span className="text-[#00000070] font-bold">
//                                 Email Address:
//                               </span>
//                               <span className="text-[var(--text-color)] text-[14px]">
//                                 {/* Accessing via userId.email based on your JSON */}
//                                 {selectedRouteData?.jobRequestId?.userId?.email}
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-2 mt-2">
//                               <span className="text-[#00000070] font-bold">
//                                 Phone #:
//                               </span>
//                               <span className="text-[var(--text-color)] text-[14px]">
//                                 {/* Accessing via userId.phone based on your JSON */}
//                                 {selectedRouteData?.jobRequestId?.userId?.phone}
//                               </span>
//                             </div>
//                           </>
//                         )}
//                       </>
//                     )}

//                     {selectedRouteData?.status === "completed" &&
//                       selectedRouteData?.type !== "start" &&
//                       selectedRouteData?.type !== "end" && (
//                         <>
//                           <div className="mt-5">
//                             <h3 className="font-bold text-lg pb-1">Comments</h3>
//                             <span className="text-[16px] text-[#5b5b5b]">
//                               {selectedRouteData?.comments}
//                             </span>
//                           </div>
//                           <div className="mt-5">
//                             <h3 className="font-bold text-lg pb-1">Picture</h3>
//                             <span className="text-[16px] text-[#5b5b5b]">
//                               {selectedRouteData?.image &&
//                                 selectedRouteData?.image != "" && (
//                                   <img
//                                     src={selectedRouteData?.image}
//                                     className="h-[140px] w-[140px] rounded-xl"
//                                     alt=""
//                                   />
//                                 )}
//                             </span>
//                           </div>
//                         </>
//                       )}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {showmodal && (
//         <div
//           className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
//           onClick={() => {
//             setShowModal(false);
//             setChoose("");
//           }}
//         >
//           <div className="flex justify-end items-center h-full w-full">
//             <div
//               className="bg-white w-[90%] md:w-[37%] h-screen overflow-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="flex justify-between items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)]">
//                 <span className="font-bold text-[16px] text-[var(--primary-color)] uppercase">
//                   Add Daily Route
//                 </span>
//                 <span className="font-bold ">
//                   {selectedDate.format("MMM D, YYYY")}
//                 </span>
//               </h1>
//               {choose == "" && (
//                 <div className="px-7 py-6 grid grid-cols-2 gap-3">
//                   <div className="tab_route_form" onClick={() => setChoose(1)}>
//                     <span>Transport from A to B</span>
//                     <p>A pickup and a delivery</p>
//                   </div>
//                   <div className="tab_route_form" onClick={() => setChoose(2)}>
//                     <span>Pickup stop</span>
//                     <p>A single stop</p>
//                   </div>
//                   <div className="tab_route_form" onClick={() => setChoose(3)}>
//                     <span>Delivery stop</span>
//                     <p>A single stop</p>
//                   </div>
//                 </div>
//               )}

//               {(choose == 2 || choose == 3) && (
//                 <>
//                   <form
//                     method="post"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       handleAddOrEditDailyRoutes();
//                     }}
//                   >
//                     <div className="p-7">
//                       <div className="form-group">
//                         <label>
//                           Address <span className="required">*</span>
//                         </label>
//                         {isLoaded && (
//                           <StandaloneSearchBox
//                             onLoad={(ref) => (inputRef.current = ref)}
//                             onPlacesChanged={() => handlePlaceChanged("from")}
//                           >
//                             <input
//                               type="text"
//                               placeholder="Enter Address"
//                               value={from}
//                               required
//                               onChange={(e) => setFrom(e.target.value)}
//                               className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                             />
//                           </StandaloneSearchBox>
//                         )}
//                       </div>
//                       <div className="form-group">
//                         <label>Service time (in minutes)</label>
//                         <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => setMinutesVal(minutesval - 1)}
//                           >
//                             <TiMinus color="#fff" size={20} />
//                           </div>
//                           <div className="font-semibold">
//                             {minutesval} minutes
//                           </div>
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => setMinutesVal(minutesval + 1)}
//                           >
//                             <TiPlus color="#fff" size={20} />
//                           </div>
//                         </div>
//                       </div>
//                       {choose === 2 && (
//                         <div className="form-group">
//                           <label>
//                             How much space will your stop require? (max. 10m3)
//                           </label>
//                           <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
//                             <div
//                               className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                               onClick={() => setM3Val(m3sval - 1)}
//                             >
//                               <TiMinus color="#fff" size={20} />
//                             </div>
//                             <div className="font-semibold">
//                               {m3sval} m<sup>3</sup>
//                             </div>
//                             <div
//                               className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                               onClick={() => {
//                                 if (m3sval < 10) {
//                                   setM3Val(m3sval + 1);
//                                 }
//                               }}
//                             >
//                               <TiPlus color="#fff" size={20} />
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="form-group">
//                           <label>
//                             Start Time <span className="required">*</span>
//                           </label>

//                           <input
//                             type="time"
//                             placeholder="Start Time"
//                             value={starttime}
//                             required
//                             onChange={(e) => setStartTime(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>
//                             End Time <span className="required">*</span>
//                           </label>

//                           <input
//                             type="time"
//                             required
//                             placeholder="End Time"
//                             value={endtime}
//                             onChange={(e) => setEndTime(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           />
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label>For which stop in the daily route?</label>
//                         <select
//                           className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           value={tijovak}
//                           onChange={(e) => setTijovak(e.target.value)}
//                         >
//                           <option value="">-- Select a time slot --</option>
//                           {mapRoutes?.map((item, index) => (
//                             <option key={index} value={index}>
//                               Stop {index + 1}: {item?.address}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <button
//                           disabled={btnloading}
//                           type="submit"
//                           className="auth_button w-full mt-[20px]"
//                         >
//                           {btnloading ? "Loading..." : "Submit"}
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </>
//               )}

//               {choose == 1 && (
//                 <>
//                   <form
//                     method="post"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       handlePickUpAndDelievery();
//                     }}
//                   >
//                     <div className="p-7">
//                       <h1 className="font-bold text-[20px] mb-4">Pickup</h1>
//                       <div className="form-group">
//                         <label>
//                           Address or City <span className="required">*</span>
//                         </label>
//                         {isLoaded && (
//                           <StandaloneSearchBox
//                             onLoad={(ref) => (inputRef.current = ref)}
//                             onPlacesChanged={() => handlePlaceChanged("from")}
//                           >
//                             <input
//                               type="text"
//                               placeholder="Enter Address"
//                               value={from}
//                               required
//                               onChange={(e) => setFrom(e.target.value)}
//                               className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                             />
//                           </StandaloneSearchBox>
//                         )}
//                       </div>
//                       <div className="form-group">
//                         <label>Service time (in minutes)</label>
//                         <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => setMinutesVal(minutesval - 1)}
//                           >
//                             <TiMinus color="#fff" size={20} />
//                           </div>
//                           <div className="font-semibold">
//                             {minutesval} minutes
//                           </div>
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => setMinutesVal(minutesval + 1)}
//                           >
//                             <TiPlus color="#fff" size={20} />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label>
//                           How much space will your stop require? (max. 10m3)
//                         </label>
//                         <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => setM3Val(m3sval - 1)}
//                           >
//                             <TiMinus color="#fff" size={20} />
//                           </div>
//                           <div className="font-semibold">
//                             {m3sval} m<sup>3</sup>
//                           </div>
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => {
//                               if (m3sval < 10) {
//                                 setM3Val(m3sval + 1);
//                               }
//                             }}
//                           >
//                             <TiPlus color="#fff" size={20} />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="form-group">
//                           <label>
//                             Start Time <span className="required">*</span>
//                           </label>

//                           <input
//                             type="time"
//                             placeholder="Start Time"
//                             value={starttime}
//                             required
//                             onChange={(e) => setStartTime(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>
//                             End Time <span className="required">*</span>
//                           </label>

//                           <input
//                             type="time"
//                             required
//                             placeholder="End Time"
//                             value={endtime}
//                             onChange={(e) => setEndTime(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label>For which stop in the daily route?</label>
//                         <select
//                           className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           value={tijovak}
//                           onChange={(e) => setTijovak(e.target.value)}
//                         >
//                           <option value="">-- Select a time slot --</option>
//                           {mapRoutes?.map((item, index) => (
//                             <option key={index} value={index}>
//                               Stop {index + 1}: {item?.address}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* DELIVERY ADDRESS DATA */}
//                     <div className="p-7 pt-0">
//                       <h1 className="font-bold text-[20px] mb-4">Delivery</h1>
//                       <div className="form-group">
//                         <label>
//                           Address or City <span className="required">*</span>
//                         </label>
//                         {isLoaded && (
//                           <StandaloneSearchBox
//                             onLoad={(ref) => (inputRef2.current = ref)}
//                             onPlacesChanged={() => handlePlaceChanged("to")}
//                           >
//                             <input
//                               type="text"
//                               placeholder="Enter Address"
//                               value={to}
//                               required
//                               onChange={(e) => setTo(e.target.value)}
//                               className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                             />
//                           </StandaloneSearchBox>
//                         )}
//                       </div>
//                       <div className="form-group">
//                         <label>Service time (in minutes)</label>
//                         <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => setMinutesValDel(minutesvalDel - 1)}
//                           >
//                             <TiMinus color="#fff" size={20} />
//                           </div>
//                           <div className="font-semibold">
//                             {minutesvalDel} minutes
//                           </div>
//                           <div
//                             className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
//                             onClick={() => setMinutesValDel(minutesvalDel + 1)}
//                           >
//                             <TiPlus color="#fff" size={20} />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="form-group">
//                           <label>
//                             Start Time <span className="required">*</span>
//                           </label>

//                           <input
//                             type="time"
//                             placeholder="Start Time"
//                             value={starttime2}
//                             required
//                             onChange={(e) => setStartTime2(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>
//                             End Time <span className="required">*</span>
//                           </label>

//                           <input
//                             type="time"
//                             required
//                             placeholder="End Time"
//                             value={endtime2}
//                             onChange={(e) => setEndTime2(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label>For which stop in the daily route?</label>
//                         <select
//                           className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                           value={tijovakdel}
//                           onChange={(e) => setTijovakDel(e.target.value)}
//                         >
//                           <option value="">-- Select a time slot --</option>
//                           {mapRoutes?.map((item, index) => (
//                             <option key={index} value={index}>
//                               Stop {index + 1}: {item?.address}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <button
//                           disabled={btnloading}
//                           type="submit"
//                           className="auth_button w-full mt-[20px]"
//                         >
//                           {btnloading ? "Loading..." : "Submit"}
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {showedit && (
//         <div
//           className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
//           onClick={() => {
//             setShowModal(false);
//             setShowEdit(false);
//             setChoose("");
//             setEditId("");
//           }}
//         >
//           <div className="flex justify-end items-center h-full w-full">
//             <div
//               className="bg-white w-[90%] md:w-[37%] h-screen overflow-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="flex justify-between items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)]">
//                 <span className="font-bold text-[16px] text-[var(--primary-color)] uppercase">
//                   Edit or cancel stop
//                 </span>
//               </h1>

//               <>
//                 <form
//                   method="post"
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleAddOrEditDailyRoutes();
//                   }}
//                 >
//                   <div className="p-7">
//                     <div className="form-group">
//                       <label>
//                         Address <span className="required">*</span>
//                       </label>
//                       {isLoaded && (
//                         <StandaloneSearchBox
//                           onLoad={(ref) => (inputRef.current = ref)}
//                           onPlacesChanged={() => handlePlaceChanged("from")}
//                         >
//                           <input
//                             type="text"
//                             placeholder="Enter Address"
//                             value={from}
//                             required
//                             onChange={(e) => setFrom(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                             disabled={
//                               !selectedRouteData?.isManuallyAdded &&
//                               selectedRouteData?.jobRequestId
//                             }
//                           />
//                         </StandaloneSearchBox>
//                       )}
//                     </div>
//                     {!selectedRouteData?.isStartLocation &&
//                       !selectedRouteData?.isEndLocation && (
//                         <div className="form-group">
//                           <label>Service time (in minutes)</label>
//                           <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
//                             <div
//                               className={`w-[40px] h-[40px] ${
//                                 selectedRouteData?.isManuallyAdded &&
//                                 "bg-[var(--primary-color)]"
//                               } flex justify-center items-center cursor-pointer`}
//                             >
//                               {selectedRouteData?.isManuallyAdded &&
//                                 !selectedRouteData?.jobRequestId && (
//                                   <TiMinus
//                                     color="#fff"
//                                     size={20}
//                                     onClick={() =>
//                                       setMinutesVal(minutesval - 1)
//                                     }
//                                   />
//                                 )}
//                             </div>
//                             <div className="font-semibold">
//                               {minutesval} minutes
//                             </div>
//                             <div
//                               className={`w-[40px] h-[40px] ${
//                                 selectedRouteData?.isManuallyAdded &&
//                                 "bg-[var(--primary-color)]"
//                               } flex justify-center items-center cursor-pointer`}
//                             >
//                               {selectedRouteData?.isManuallyAdded &&
//                                 !selectedRouteData?.jobRequestId && (
//                                   <TiPlus
//                                     color="#fff"
//                                     size={20}
//                                     onClick={() =>
//                                       setMinutesVal(minutesval + 1)
//                                     }
//                                   />
//                                 )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     {editdata?.type === "pickup" && (
//                       <div className="form-group">
//                         <label>
//                           How much space will your stop require? (max. 10m3)
//                         </label>
//                         <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
//                           <div
//                             className={`w-[40px] h-[40px] ${
//                               selectedRouteData?.isManuallyAdded &&
//                               "bg-[var(--primary-color)]"
//                             } flex justify-center items-center cursor-pointer`}
//                           >
//                             {selectedRouteData?.isManuallyAdded &&
//                               !selectedRouteData?.jobRequestId && (
//                                 <TiMinus
//                                   color="#fff"
//                                   size={20}
//                                   onClick={() => setM3Val(m3sval - 1)}
//                                 />
//                               )}
//                           </div>
//                           <div className="font-semibold">
//                             {calculateTotalVolume()} m<sup>3</sup>
//                           </div>
//                           <div
//                             className={`w-[40px] h-[40px] ${
//                               selectedRouteData?.isManuallyAdded &&
//                               "bg-[var(--primary-color)]"
//                             } flex justify-center items-center cursor-pointer`}
//                           >
//                             {selectedRouteData?.isManuallyAdded &&
//                               !selectedRouteData?.jobRequestId && (
//                                 <TiPlus
//                                   color="#fff"
//                                   size={20}
//                                   onClick={() => {
//                                     if (m3sval < 10) {
//                                       setM3Val(m3sval + 1);
//                                     }
//                                   }}
//                                 />
//                               )}
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     <div className="grid grid-cols-2 gap-4">
//                       {!selectedRouteData?.isEndLocation && (
//                         <div className="form-group">
//                           <label>
//                             Start Time <span className="required">*</span>
//                           </label>
//                           <input
//                             type="time"
//                             placeholder="Start Time"
//                             value={starttime}
//                             min={minStart}
//                             required
//                             onChange={(e) => setStartTime(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                             disabled={
//                               selectedRouteData?.date &&
//                               !selectedRouteData?.isStartLocation &&
//                               !selectedRouteData?.isEndLocation &&
//                               isWithin24Hours(selectedRouteData.date)
//                             }
//                           />
//                         </div>
//                       )}
//                       {!selectedRouteData?.isStartLocation && (
//                         <div className="form-group">
//                           <label>
//                             End Time <span className="required">*</span>
//                           </label>
//                           <input
//                             type="time"
//                             placeholder="End Time"
//                             value={endtime}
//                             max={maxEnd}
//                             onChange={(e) => setEndTime(e.target.value)}
//                             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
//                             disabled={
//                               selectedRouteData?.date &&
//                               !selectedRouteData?.isStartLocation &&
//                               !selectedRouteData?.isEndLocation &&
//                               isWithin24Hours(selectedRouteData.date)
//                             }
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {!selectedRouteData?.isManuallyAdded &&
//                       selectedRouteData?.jobRequestId && (
//                         <div className=" mb-3">
//                           <b>Time Slot:</b>{" "}
//                           {/* {selectedRouteData?.jobRequestId?.timeSlot[cType]} */}
//                         </div>
//                       )}

//                     <div>
//                       <button
//                         disabled={btnloading}
//                         type="submit"
//                         className="auth_button w-full mt-[0px]"
//                       >
//                         {btnloading ? "Confirming..." : "Confirm changes"}
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                 {!selectedRouteData?.isStartLocation &&
//                   !selectedRouteData?.isEndLocation && (
//                     <div className="p-7 pt-0">
//                       <h1 className="flex justify-between items-center text-[var(--text-color)]">
//                         <span className="font-bold text-[16px] text-[var(--primary-color)] uppercase">
//                           Cancel
//                         </span>
//                       </h1>
//                       <div className="p-0">
//                         <p className="mt-4 text-gray-400">
//                           Canceling a courier assignment is free of charge up to
//                           48 hours before the agreed pickup time. After that,
//                           costs are involved:
//                         </p>
//                       </div>
//                       <div className="mt-4">
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="font-bold text-gray-500 text-md">
//                             Up to 48 hours in advance
//                           </span>
//                           <p className="font-bold text-lg">€ 0,-</p>
//                         </div>
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="font-bold text-gray-500 text-md">
//                             48 hours - 24 hours in advance
//                           </span>
//                           <p className="font-bold text-lg">€ 25,-</p>
//                         </div>
//                         <div className="flex justify-between items-center mb-4">
//                           <span className="font-bold text-gray-500 text-md">
//                             Within 24 hours
//                           </span>
//                           <p className="font-bold text-lg">€ 50,-</p>
//                         </div>

//                         <div className="">
//                           <button
//                             className="auth_button !bg-red-500 w-full mt-[0px]"
//                             onClick={() => setShowConfirm(true)}
//                           >
//                             Cancel bundle
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//               </>
//             </div>
//           </div>
//         </div>
//       )}
//       {showConfirm && (
//         <div
//           className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
//           onClick={() => {
//             setShowConfirm(false);
//           }}
//         >
//           <div className="flex justify-center items-center h-full w-full">
//             <div
//               className="bg-white w-[90%] md:w-[37%] pb-7 overflow-auto rounded-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="flex justify-center items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)]">
//                 <span className="font-bold text-[16px] text-red-500 uppercase">
//                   Cancel Bundled Transport
//                 </span>
//               </h1>

//               <>
//                 <div className="p-7">
//                   <p className="text-[16px] text-gray-500">
//                     Canceling a courier assignment is free of charge up to 48
//                     hours before the agreed pickup time. After that, costs are
//                     involved: Between 48 and 24 hours in advance, the
//                     cancellation fee is €50. Within 24 hours before the first
//                     agreed pickup time, the cancellation fee is €100.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-5 px-7">
//                   <button
//                     className="bg-red-500 text-white p-4 font-bold rounded-full hover:bg-red-800"
//                     onClick={handleCancel}
//                   >
//                     Confirm
//                   </button>
//                   <button
//                     className="!bg-white border border-gray-300 text-black font-bold p-4 rounded-full"
//                     onClick={() => setShowConfirm(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </>
//             </div>
//           </div>
//         </div>
//       )}

//       {showcompletepopup && (
//         <>
//           <div
//             className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
//             // onClick={() => {
//             //   setShowCompletePopup(false);
//             // }}
//           >
//             <div className="flex justify-center items-center h-full w-full">
//               <div
//                 className="bg-white w-[90%] md:w-[37%] pb-7 overflow-auto rounded-xl"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <h1 className="flex justify-center items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)] relative">
//                   <span className="font-bold text-[16px] text-red-500 uppercase">
//                     MARK JOB AS COMPLETED
//                   </span>
//                   <CgClose
//                     size={20}
//                     color="red"
//                     className="absolute right-4 cursor-pointer"
//                     onClick={() => setShowCompletePopup(false)}
//                   />
//                 </h1>

//                 <>
//                   <div className="p-7">
//                     <p className="text-[12px] text-gray-500">
//                       Upload Or Take a Picture
//                     </p>
//                     <div className="grid grid-cols-2 gap-5 mt-4">
//                       <div
//                         className="border border-[#ccc] py-8 px-4 w-full rounded-md text-center uppercase font-bold cursor-pointer hover:bg-[#f0f0f0]"
//                         onClick={handleUploadClick}
//                       >
//                         Upload Picture
//                       </div>
//                       <div
//                         className="border border-[#ccc] py-8 px-4 w-full text-center rounded-md uppercase font-bold cursor-pointer hover:bg-[#f0f0f0]"
//                         onClick={handleTakePicture}
//                       >
//                         Take Picture
//                       </div>
//                       {/* Hidden File Input */}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         ref={fileInputRef}
//                         style={{ display: "none" }}
//                         onChange={handleFileChange}
//                       />
//                     </div>
//                     {/* Camera View & Capture */}
//                     {takingPhoto && (
//                       <div className="mt-4 relative">
//                         <video
//                           ref={videoRef}
//                           width="100%"
//                           className="rounded-md"
//                         />
//                         <CgClose
//                           size={24}
//                           color="red"
//                           className="absolute top-2 right-2 cursor-pointer bg-white p-1 rounded-full"
//                           onClick={() => {
//                             setTakingPhoto(false);
//                             setImageSrc(null);
//                           }}
//                         />
//                         <button
//                           onClick={handleCapture}
//                           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
//                         >
//                           Capture Photo
//                         </button>
//                         <canvas
//                           ref={canvasRef}
//                           width={640}
//                           height={480}
//                           style={{ display: "none" }}
//                         />
//                       </div>
//                     )}

//                     {/* Display Image */}
//                     {imageSrc && !takingPhoto && (
//                       <div className="mt-6 relative">
//                         <h2 className="text-lg font-bold mb-2">
//                           Image Preview:
//                         </h2>
//                         <div className="relative inline-block">
//                           <img
//                             src={imageSrc}
//                             alt="Captured or Uploaded"
//                             className="rounded-md h-[100px]"
//                           />
//                           <CgClose
//                             size={20}
//                             color="red"
//                             className="absolute -top-2 -right-2 cursor-pointer bg-white rounded-full p-0.5"
//                             onClick={() => setImageSrc(null)}
//                           />
//                         </div>
//                       </div>
//                     )}
//                     <div className="mt-3">
//                       <p className="text-[12px] text-gray-500 mb-2">Comments</p>
//                       <textarea
//                         value={comments}
//                         onChange={(e) => setComments(e.target.value)}
//                         className="border resize-none border-[#ccc] py-4 px-4 w-full rounded-md"
//                         placeholder="Enter your comments...."
//                       ></textarea>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 gap-5 px-7">
//                     <button
//                       className="bg-green-500 text-white p-4 font-bold rounded-full hover:bg-red-800"
//                       onClick={() => handleMarkComplete(completerouteid, "abc")}
//                     >
//                       SUBMIT
//                     </button>
//                   </div>
//                 </>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </DashboardLayout>
//   );
// };

// export default DailyRoutes;

import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import { useNavigate } from "react-router-dom";
import CalendarHeader from "./../../Components/Calendar";
import dayjs from "dayjs";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import {
  ACCEPT_JOB,
  ADD_DAILY_ROUTES,
  CANCEL_DAILY_ROUTES,
  EDIT_DAILY_ROUTES,
  GET_ROUTES,
  MAPS_API_KEY,
  UPDATE_POSITIONS,
} from "../../constants";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import RouteMap from "../../Components/RoutesMap";
import { TiMinus, TiPlus } from "react-icons/ti";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import { isWithin24Hours } from "../../utils/utils";
import { PiNotePencilLight } from "react-icons/pi";
import { FiExternalLink } from "react-icons/fi";

const DailyRoutes = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [showedit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editdata, setEditData] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [endtime, setEndTime] = useState("");
  const [endtime2, setEndTime2] = useState("");
  const [starttime, setStartTime] = useState("");
  const [starttime2, setStartTime2] = useState("");
  const [latitude, setLatitude] = useState("");
  const [latitude1, setLatitude1] = useState("");
  const [longitude, setLongitude] = useState("");
  const [longitude1, setLongitude1] = useState("");
  const { fetchData } = useFetch();
  const { submitData } = useCreateOrEdit();
  const [editId, setEditId] = useState(null);
  const [mapRoutes, setMapRoutes] = useState([]);
  const [mapsingleroutes, setMapSingleRoutes] = useState([]);

  const [choose, setChoose] = useState("");
  const [minutesval, setMinutesVal] = useState(11);
  const [minutesvalDel, setMinutesValDel] = useState(11);
  const [m3sval, setM3Val] = useState(5);
  const [tijovak, setTijovak] = useState("");
  const [tijovakdel, setTijovakDel] = useState("");
  const [showRouteData, setShowRouteData] = useState(false);
  const [selectedRouteData, setSelectedRouteData] = useState(null);
  const [type, setType] = useState("");
  const [comments, setComments] = useState("");

  const [loadingDetails, setLoadingDetails] = useState(false);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const handlePlaceChanged = (adress) => {
    if (adress === "from") {
      const [place] = inputRef.current.getPlaces();
      setFrom(place?.formatted_address);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLatitude(lat);
      setLongitude(lng);
    }

    if (adress === "to") {
      const [place] = inputRef2.current.getPlaces();
      setTo(place?.formatted_address);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLatitude1(lat);
      setLongitude1(lng);
    }
  };

  // --- HELPER: Geocode Address String to Lat/Lng ---
  const geocodeAddress = (addressString) => {
    return new Promise((resolve, reject) => {
      if (!window.google || !window.google.maps) {
        resolve({ lat: 0, lng: 0 }); // Fail gracefully if maps not loaded
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: addressString }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          resolve({ lat: 0, lng: 0 });
        }
      });
    });
  };

  // --- MAIN FETCH LOGIC ---
  const getRoutes = async () => {
    try {
      setLoading(true);
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await fetchData(
        `${GET_ROUTES}?pickupDate=${formattedDate}`
      );

      if (response && response.data && response.data.success) {
        const rawJobs = response.data.data || [];
        let flatRoutes = [];

        // Flatten the Jobs into "Stops" (Pickup Node + Delivery Node)
        rawJobs.forEach((job, index) => {
          // Construct address strings safely
          const pickupStr = `${job.pickupAddress?.streetAddress}, ${
            job.pickupAddress?.cityOrState
          }, ${job.pickupAddress?.country || ""}`;
          const deliveryStr = `${job.deliveryAddress?.streetAddress}, ${
            job.deliveryAddress?.cityOrState
          }, ${job.deliveryAddress?.country || ""}`;

          // 1. Create Pickup Stop
          flatRoutes.push({
            _id: job._id + "_pickup",
            originalId: job._id,
            type: "pickup",
            status: job.status,
            isManuallyAdded: false,
            serviceMinutes: 0,
            spaceRequired: 0,
            address: {
              address: pickupStr,
              lat: job.pickupAddress?.lat || 0,
              lng: job.pickupAddress?.lng || 0,
            },
            timeSlot: job.pickupDateInfo?.timeSlot,
            date: job.pickupDateInfo?.date,
            jobRequestId: job,
          });

          // 2. Create Delivery Stop
          flatRoutes.push({
            _id: job._id + "_delivery",
            originalId: job._id,
            type: "delivery",
            status: job.status,
            isManuallyAdded: false,
            serviceMinutes: 0,
            spaceRequired: 0,
            address: {
              address: deliveryStr,
              lat: job.deliveryAddress?.lat || 0,
              lng: job.deliveryAddress?.lng || 0,
            },
            timeSlot: job.deliveryDateInfo?.timeSlot,
            date: job.deliveryDateInfo?.date,
            jobRequestId: job,
          });
        });

        // 2. Geocode All Addresses (This ensures pins show up even without lat/lng in DB)
        if (window.google && window.google.maps) {
          const geocodedRoutes = await Promise.all(
            flatRoutes.map(async (route) => {
              // Only geocode if address exists and coords are missing (0)
              if (route.address.address && route.address.lat === 0) {
                const coords = await geocodeAddress(route.address.address);
                return {
                  ...route,
                  address: {
                    ...route.address,
                    lat: coords.lat,
                    lng: coords.lng,
                  },
                };
              }
              return route;
            })
          );
          setRoutes(geocodedRoutes);
        } else {
          // Fallback if maps API isn't ready yet
          setRoutes(flatRoutes);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  // --- SYNC MAP WITH ROUTES STATE ---
  // This effect runs whenever `routes` changes (e.g., moveRoute up/down)
  // It ensures the map pins re-order (1, 2, 3...) correctly
  useEffect(() => {
    const transformed = routes.map((route, index) => ({
      lat: route.address.lat,
      lng: route.address.lng,
      address: route.address.address,
      timeSlot: route.timeSlot,
      id: route._id,
      status: route.status,
      order: index + 1, // Explicitly setting order based on current array index
    }));
    setMapRoutes(transformed);
  }, [routes]);

  // Initial Fetch
  useEffect(() => {
    if (isLoaded) {
      getRoutes();
    }
  }, [selectedDate, isLoaded]);

  // --- HANDLE VIEW DATA (Click on Right Panel) ---
  const handleViewData = async (id) => {
    setShowRouteData(true);
    const initialRouteData = routes[id];
    setSelectedRouteData(initialRouteData);
    setMapSingleRoutes([]); // Reset side map

    // 1. Use existing coordinates immediately
    if (initialRouteData?.address?.lat && initialRouteData?.address?.lng) {
      setMapSingleRoutes([
        {
          lat: initialRouteData.address.lat,
          lng: initialRouteData.address.lng,
          address: initialRouteData.address.address,
          timeSlot: initialRouteData.timeSlot,
        },
      ]);
    }

    // 2. Fetch Details for detailed view (e.g. for Pickup & Delivery pins)
    if (initialRouteData?.originalId) {
      setLoadingDetails(true);
      try {
        const response = await fetchData(
          `${ACCEPT_JOB}/${initialRouteData.originalId}`
        );

        if (response?.data) {
          const detailedJob = response.data.data || response.data;
          setSelectedRouteData((prev) => ({
            ...prev,
            jobRequestId: detailedJob,
          }));

          // Geocode specific addresses for detail map
          if (
            isLoaded &&
            detailedJob.pickupAddress &&
            detailedJob.deliveryAddress
          ) {
            const pickupStr = `${detailedJob.pickupAddress.streetAddress}, ${detailedJob.pickupAddress.cityOrState}, ${detailedJob.pickupAddress.country}`;
            const deliveryStr = `${detailedJob.deliveryAddress.streetAddress}, ${detailedJob.deliveryAddress.cityOrState}, ${detailedJob.deliveryAddress.country}`;

            const pickupCoords = await geocodeAddress(pickupStr);
            const deliveryCoords = await geocodeAddress(deliveryStr);

            setMapSingleRoutes([
              {
                lat: pickupCoords.lat,
                lng: pickupCoords.lng,
                address: `Pickup: ${pickupStr}`,
                timeSlot: detailedJob.pickupDateInfo?.timeSlot,
              },
              {
                lat: deliveryCoords.lat,
                lng: deliveryCoords.lng,
                address: `Delivery: ${deliveryStr}`,
                timeSlot: detailedJob.deliveryDateInfo?.timeSlot,
              },
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        toast.error("Could not load full details");
      } finally {
        setLoadingDetails(false);
      }
    }
  };

  const handleAddOrEditDailyRoutes = async () => {
    if (!editId) {
      try {
        if (!from || !starttime || !endtime) {
          toast.error("Please fill all fields");
          return;
        }

        const timeSlot = `${starttime} - ${endtime}`;
        const date = selectedDate.format("YYYY-MM-DD");
        setBtnLoading(true);
        const payload = {
          date,
          timeSlot,
          address: { address: from, lat: latitude, lng: longitude },
          serviceMinutes: minutesval,
          spaceRequired: m3sval,
          positionNumber: tijovak,
          type:
            choose == 1
              ? "pickup_delivery"
              : choose == 2
              ? "pickup"
              : "delivery",
        };

        const response = await submitData(ADD_DAILY_ROUTES, payload, "POST");

        if (response) {
          toast.success("Route added successfully");
          setShowModal(false);
          setFrom("");
          setStartTime("");
          setEndTime("");
          setLatitude("");
          setLongitude("");
          getRoutes();
          setBtnLoading(false);
        }
      } catch (error) {
        setBtnLoading(false);
        console.log(error);
        toast.error(error.message || "Error adding route");
      }
    }
    if (editId) {
      try {
        if (!from || !starttime) {
          toast.error("Please fill all fields");
          return;
        }

        const timeSlot = `${starttime} - ${endtime}`;
        const date = selectedDate.format("YYYY-MM-DD");

        const payload = {
          date,
          timeSlot,
          address: { address: from, lat: latitude, lng: longitude },
          type,
          serviceMinutes: minutesval,
          spaceRequired: m3sval,
        };

        const response = await submitData(
          `${EDIT_DAILY_ROUTES}/${editId}`,
          payload,
          "PUT"
        );

        if (response) {
          toast.success("Route updated successfully");
          setShowModal(false);
          setFrom("");
          setMinutesVal(11);
          setStartTime("");
          setEndTime("");
          setLatitude("");
          setLongitude("");
          getRoutes();
          setEditId(null);
          setShowEdit(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Error adding route");
      }
    }
  };

  const handlePickUpAndDelievery = async () => {
    const date = selectedDate.format("YYYY-MM-DD");

    const pickupPayload = {
      address: { address: from, lat: latitude, lng: longitude },
      timeSlot: `${starttime} - ${endtime}`,
      serviceMinutes: minutesval,
      spaceRequired: m3sval,
      positionNumber: tijovak,
      type: "pickup",
      date: date,
    };

    const deliveryPayload = {
      address: { address: to, lat: latitude1, lng: longitude1 },
      timeSlot: `${starttime2} - ${endtime2}`,
      serviceMinutes: minutesvalDel,
      spaceRequired: m3sval,
      positionNumber: tijovakdel,
      type: "delivery",
      date: date,
    };

    const [pickupResponse, deliveryResponse] = await Promise.all([
      submitData(ADD_DAILY_ROUTES, pickupPayload, "POST"),
      submitData(ADD_DAILY_ROUTES, deliveryPayload, "POST"),
    ]);

    if (pickupResponse.data.success && deliveryResponse.data.success) {
      toast.success("Pickup and delivery routes added successfully");
      setFrom("");
      setStartTime("");
      setEndTime("");
      setMinutesVal(0);
      setM3Val(0);
      setTijovak("");
      setTijovakDel("");
      setTo("");
      setStartTime2("");
      setEndTime2("");
      setLatitude("");
      setLongitude("");
      setLatitude1("");
      setLongitude1("");
      setShowModal(false);
      getRoutes();
    } else {
      toast.error("Error adding one or both routes");
    }
  };

  const cType = selectedRouteData?.type === "pickup" ? "start" : "end";
  const [rawMin, rawMax] =
    (!selectedRouteData?.isManuallyAdded &&
      selectedRouteData?.jobRequestId &&
      selectedRouteData?.jobRequestId?.timeSlot &&
      selectedRouteData?.jobRequestId?.timeSlot[cType]?.split(" - ")) ||
    [];

  const convertTo24HourFormat = (timeStr) => {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = String(Number(hours) + 12);
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const minStart = rawMin ? convertTo24HourFormat(rawMin) : "";
  const maxEnd = rawMax ? convertTo24HourFormat(rawMax) : "";

  const handleEditClick = (route) => {
    setEditId(route?._id);
    setFrom(route.address.address);
    const [start, end] = route.timeSlot
      ? route.timeSlot.split(" - ")
      : ["", ""];
    setStartTime(start);
    setEndTime(end || start);
    setLatitude(route?.address?.lat);
    setLongitude(route?.address?.lng);
    setShowModal(true);
  };

  const [showcompletepopup, setShowCompletePopup] = useState(false);
  const [completerouteid, setCompleteRouteID] = useState(false);

  const handleMarkComplete = async (routeId, status) => {
    if (status === "completed" || status === "canceled") {
      return;
    }

    if (status === "pending" || status == "in-progress") {
      setShowCompletePopup(true);
      setCompleteRouteID(routeId);
      return;
    } else {
      setShowCompletePopup(true);
      if (imageSrc == null) {
        toast.error("Please upload image or take a picture");
        return;
      }
      if (comments == "") {
        toast.error("Please enter comments");
        return;
      }
    }
    try {
      const response = await submitData(
        `${EDIT_DAILY_ROUTES}/complete/${routeId}`,
        { comments, image: imageSrc },
        "PUT"
      );
      if (response.data.success) {
        setShowCompletePopup(false);
        toast.success("Route marked as complete");
        getRoutes();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  function getStartTime(timeSlot) {
    if (!timeSlot) return "";
    const [startTime] = timeSlot.split(" - ");
    if (!startTime) return "";

    const parts = startTime.trim().split(":");
    if (parts.length < 2) return startTime;

    const [hour, minute] = parts.map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  const moveRoute = (index, direction) => {
    setRoutes((prevRoutes) => {
      const newRoutes = [...prevRoutes];
      if (
        (direction === "up" && index === 1) ||
        (direction === "down" && index === newRoutes.length - 1)
      ) {
        return prevRoutes;
      }
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      [newRoutes[index], newRoutes[swapIndex]] = [
        newRoutes[swapIndex],
        newRoutes[index],
      ];
      handleUpdatePositions(newRoutes);
      return newRoutes;
    });
  };

  const handleUpdatePositions = async (routess) => {
    const reorderedRoutes = routess.map((route, index) => ({
      _id: route._id,
      positionNumber: index,
    }));
    try {
      await submitData(UPDATE_POSITIONS, { routes: reorderedRoutes }, "POST");
    } catch (error) {
      console.log("error", error);
    }
  };

  const trimNumberToSixChars = (num) => {
    if (!num) return "";
    return num.toString().slice(0, 6);
  };

  const handleEditSpecificRoute = async (route) => {
    setEditData(route);
    setMinutesVal(route?.serviceMinutes || 11);
    setM3Val(route?.spaceRequired || 5);
    setType(route.type);
    setEditId(route?._id);
    setFrom(route?.address?.address || "");
    const [start, end] = route.timeSlot
      ? route.timeSlot.split(" - ")
      : ["", ""];
    setStartTime(start);
    setEndTime(end || start);
    setLatitude(route?.address?.lat);
    setLongitude(route?.address?.lng);
    setShowEdit(true);
  };

  const handleCancel = async () => {
    try {
      const response = await submitData(
        CANCEL_DAILY_ROUTES,
        { routeId: editId },
        "POST"
      );

      if (response?.data?.paymentRequired && response?.data?.checkoutUrl) {
        toast.success("Cancellation requires a fee. Redirecting to payment...");
        localStorage.setItem("paymentId", response?.data?.paymentId);
        window.location.href = response?.data?.checkoutUrl;
      } else if (response?.data?.message) {
        toast.success(response?.data?.message);
        setShowConfirm(false);
        setShowEdit(false);
        getRoutes();
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong while cancelling the route.";
      toast.error(errorMessage);
    }
  };

  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [takingPhoto, setTakingPhoto] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePicture = async () => {
    setTakingPhoto(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setImageSrc(imageData);
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setTakingPhoto(false);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  const shouldHide = isMobile && showRouteData;

  function calculateTotalVolume() {
    let items = selectedRouteData?.jobRequestId?.items;
    if (!items) return 0;
    let totalVolume = 0;
    items.forEach((item) => {
      const length = parseFloat(item.length);
      const width = parseFloat(item.width);
      const height = parseFloat(item.height);
      const qty = parseInt(item.quantity || item.qty);
      const volumePerItem = (length * width * height) / 1000000;
      const itemTotalVolume = volumePerItem * qty;
      totalVolume += itemTotalVolume;
    });
    return totalVolume.toFixed(3);
  }

  return (
    <DashboardLayout>
      <div className=" w-full relative mb-4 px-5">
        <div className="flex items-start justify-between gap-10 md:flex-row flex-col">
          <div
            className={`w-full md:w-[40%] ${shouldHide ? "hidden" : "block"}`}
          >
            <CalendarHeader onDateChange={handleDateChange} />

            {/* MAIN MAP (Syncs with routes list) */}
            <div className="mb-5">
              <RouteMap routes={mapRoutes} letterdisplay={""} />
            </div>

            <div className="flex justify-end items-center gap-3">
              <button
                className="rounded-full px-5 flex items-center gap-2 py-2 !bg-[var(--primary-color)] !text-[var(--text-color)] opacity-50"
                onClick={() => {
                  //TODO: under working
                  // setEditData("");
                  // setEditId(null);
                  // setFrom("");
                  // setStartTime("");
                  // setEndTime("");
                  // setLatitude("");
                  // setLongitude("");
                  // setShowEdit(false);
                  // setShowModal(true);
                }}
              >
                <span>Add Route</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 6H11.25M6 0.75V11.25"
                    stroke="#202020"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* JOBS SECTION */}
            <div className="mt-8">
              {routes.length == 0 && (
                <div className="flex items-center justify-center bg-white w-full p-4 rounded-xl">
                  {loading ? "Loading..." : "No routes found"}
                </div>
              )}
              {routes?.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    key={index}
                    className="flex items-center gap-4 justify-between mb-6"
                  >
                    <div className="dot_class_main_routes">
                      <div
                        className={`dot_route ${
                          index === routes.length - 1 ? "no-border" : ""
                        }`}
                      ></div>
                    </div>
                    <div
                      className="white_box p-4 dot_class_right_routes cursor-pointer hover:shadow-lg hover:scale-[1.01]"
                      onClick={() => handleViewData(index)}
                    >
                      <div className="flex justify-between items-center border-b border-[#e9e9e9] pb-3">
                        <p className="font-normal text-[var(--text-color)]">
                          {item?.address?.address}
                        </p>
                        <span className="flex items-center gap-2">
                          <span>
                            <RiEdit2Line
                              size={16}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSpecificRoute(item);
                                setSelectedRouteData(item);
                              }}
                            />
                          </span>
                          {index > 0 && (
                            <>
                              <MdOutlineKeyboardArrowUp
                                size={20}
                                className={`cursor-pointer ${
                                  index === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  moveRoute(index, "up");
                                }}
                              />
                              {index < routes.length - 1 && (
                                <MdOutlineKeyboardArrowDown
                                  size={20}
                                  className={`cursor-pointer ${
                                    index === routes.length - 1
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    moveRoute(index, "down");
                                  }}
                                />
                              )}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between  mt-2 items-center">
                        <span className="font-bold mt-0 block text-md uppercase">
                          {index === 0 && "Start - "}
                          {index === routes.length - 1 && "End - "}

                          {item?.timeSlot && (
                            <span className="text-[var(--text-color)] font-normal">
                              {getStartTime(item?.timeSlot)}
                            </span>
                          )}
                          {index === 0 || routes.length - 1 === index ? (
                            ""
                          ) : (
                            <span className="ml-1 font-semibold">
                              | {item?.type}
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-3">
                          {index != 0 && !item.isEndLocation && (
                            <button
                              onClick={() =>
                                handleMarkComplete(item._id, item.status)
                              }
                              className={`px-3 py-2 rounded-full text-[10px] ${
                                item.status === "completed"
                                  ? "bg-green-100 text-green-800 cursor-default"
                                  : `${
                                      item.status === "pending" ||
                                      item?.status == "in-progress"
                                        ? "bg-orange-400"
                                        : "bg-red-400"
                                    } text-white hover:bg-blue-200`
                              }`}
                              disabled={
                                item.status === "completed" ||
                                item.status === "canceled"
                              }
                            >
                              {item.status === "completed"
                                ? "Completed"
                                : item.status === "canceled"
                                ? "Cancelled"
                                : "Mark Complete"}
                            </button>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index < routes.length - 1 &&
                    (() => {
                      const current = item?.address;
                      const next = routes[index + 1]?.address;

                      if (
                        current?.lat &&
                        current?.lng &&
                        next?.lat &&
                        next?.lng
                      ) {
                        const distanceKm = haversineDistance(
                          current.lat,
                          current.lng,
                          next.lat,
                          next.lng
                        );
                        const avgSpeedKmH = 40;
                        const travelTimeMinutes =
                          (distanceKm / avgSpeedKmH) * 60;

                        return (
                          <div className="text-center mb-4 text-gray-500 text-sm italic">
                            Distance to next: {distanceKm.toFixed(2)} km —
                            approx. {Math.round(travelTimeMinutes)} min
                          </div>
                        );
                      }
                      return null;
                    })()}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE PANEL */}
          <div className="w-full md:w-[60%]">
            {showRouteData && (
              <>
                <div className="white_box py-4 px-6">
                  <h1 className="font-bold text-xl pb-4 flex justify-between items-center">
                    <span className="uppercase flex gap-3 items-center">
                      {shouldHide && (
                        <IoMdArrowRoundBack
                          size={29}
                          color="#85e211"
                          onClick={() => setShowRouteData(false)}
                        />
                      )}
                      {selectedRouteData?.type}
                    </span>
                    <>
                      <div
                        className="cursor-pointer font-normal text-md flex items-center gap-1"
                        onClick={() => {
                          handleEditSpecificRoute(selectedRouteData);
                        }}
                      >
                        <PiNotePencilLight size={20} color="#000000" />
                        <span className="!text-[13px] font-semibold">Edit</span>
                      </div>
                    </>
                  </h1>
                  <hr className="mb-4" />

                  <div>
                    <div className="text-lg font-semibold text-[var(--primary-color)] mb-2">
                      {selectedRouteData?.address?.address || "No Address"}
                    </div>
                    {selectedRouteData && selectedRouteData?.serviceMinutes && (
                      <div className="text-lg mt-2">
                        <span>Service time: </span>{" "}
                        <span className="font-semibold">
                          {selectedRouteData?.serviceMinutes} minutes
                        </span>
                      </div>
                    )}

                    {selectedRouteData && selectedRouteData?.spaceRequired && (
                      <div className="text-lg mt-2">
                        <span>Space Owned: </span>{" "}
                        <span className="font-semibold">
                          {selectedRouteData?.spaceRequired} m<sup>3</sup>
                        </span>
                      </div>
                    )}

                    <div className="mb-5 mt-4">
                      <RouteMap routes={mapsingleroutes} letterdisplay={""} />
                    </div>
                    {selectedRouteData?.isManuallyAdded == false && (
                      <>
                        <h1 className="font-bold text-xl pb-4">Information</h1>
                        <hr className="mb-4" />

                        {loadingDetails ? (
                          <div className="text-center py-4">
                            Loading details...
                          </div>
                        ) : (
                          <>
                            {/* Service Time & Space Fallback */}
                            <div className="mb-4">
                              <div className="text-md mt-2">
                                <span>Service time: </span>{" "}
                                <span className="font-semibold">
                                  {selectedRouteData?.serviceMinutes || 15}{" "}
                                  minutes
                                </span>
                              </div>
                              <div className="text-md mt-2">
                                <span>Space Owned: </span>{" "}
                                <span className="font-semibold">
                                  {selectedRouteData?.spaceRequired ||
                                    calculateTotalVolume()}{" "}
                                  m<sup>3</sup>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="pills_address capitalize">
                                <b>Pickup From</b> -{" "}
                                {
                                  selectedRouteData?.jobRequestId
                                    ?.transportationType?.name
                                }{" "}
                                {
                                  selectedRouteData?.jobRequestId
                                    ?.transportationType?.options
                                }
                              </div>
                              <div className="pills_address capitalize">
                                Floor:{" "}
                                {
                                  selectedRouteData?.jobRequestId?.extraService
                                    ?.floor?.level
                                }
                              </div>
                            </div>

                            <div className="mt-5">
                              <h3 className="font-bold text-lg pb-1">
                                Reference Number
                              </h3>
                              <span className="text-[14px] text-[#5b5b5b]">
                                #
                                {trimNumberToSixChars(
                                  selectedRouteData?.jobRequestId?._id
                                )}
                              </span>
                            </div>

                            <div className="mt-5">
                              <h3 className="font-bold text-lg pb-1">
                                Delivery Products
                              </h3>
                            </div>

                            <div className="mt-3">
                              {selectedRouteData?.jobRequestId?.items?.map(
                                (item, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-[#F5F7F9] rounded-xl  mt-2"
                                  >
                                    <div className="flex items-center  gap-3 p-3">
                                      <div className="text-[15px] text-[#00000070]">
                                        <img
                                          className="w-[30px] h-[30px]"
                                          src={item?.img}
                                          alt=""
                                        />
                                      </div>
                                      <span className="text-xs">
                                        {item?.quantity}(x){" "}
                                        {item?.dimensions || "N/A"} -{" "}
                                        {item?.name}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="mt-5">
                              <h3 className="font-bold text-lg pb-1">
                                Contact Details
                              </h3>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[#00000070] font-bold">
                                Name:
                              </span>
                              <span className="text-[var(--text-color)] text-[14px]">
                                {
                                  selectedRouteData?.jobRequestId?.userId?.name
                                    ?.firstName
                                }{" "}
                                {
                                  selectedRouteData?.jobRequestId?.userId?.name
                                    ?.lastName
                                }
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[#00000070] font-bold">
                                Email Address:
                              </span>
                              <span className="text-[var(--text-color)] text-[14px]">
                                {selectedRouteData?.jobRequestId?.userId?.email}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[#00000070] font-bold">
                                Phone #:
                              </span>
                              <span className="text-[var(--text-color)] text-[14px]">
                                {selectedRouteData?.jobRequestId?.userId?.phone}
                              </span>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {selectedRouteData?.status === "completed" &&
                      selectedRouteData?.type !== "start" &&
                      selectedRouteData?.type !== "end" && (
                        <>
                          <div className="mt-5">
                            <h3 className="font-bold text-lg pb-1">Comments</h3>
                            <span className="text-[16px] text-[#5b5b5b]">
                              {selectedRouteData?.comments}
                            </span>
                          </div>
                          <div className="mt-5">
                            <h3 className="font-bold text-lg pb-1">Picture</h3>
                            <span className="text-[16px] text-[#5b5b5b]">
                              {selectedRouteData?.image &&
                                selectedRouteData?.image != "" && (
                                  <img
                                    src={selectedRouteData?.image}
                                    className="h-[140px] w-[140px] rounded-xl"
                                    alt=""
                                  />
                                )}
                            </span>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showmodal && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
          onClick={() => {
            setShowModal(false);
            setChoose("");
          }}
        >
          <div className="flex justify-end items-center h-full w-full">
            <div
              className="bg-white w-[90%] md:w-[37%] h-screen overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="flex justify-between items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)]">
                <span className="font-bold text-[16px] text-[var(--primary-color)] uppercase">
                  Add Daily Route
                </span>
                <span className="font-bold ">
                  {selectedDate.format("MMM D, YYYY")}
                </span>
              </h1>
              {choose == "" && (
                <div className="px-7 py-6 grid grid-cols-2 gap-3">
                  <div className="tab_route_form" onClick={() => setChoose(1)}>
                    <span>Transport from A to B</span>
                    <p>A pickup and a delivery</p>
                  </div>
                  <div className="tab_route_form" onClick={() => setChoose(2)}>
                    <span>Pickup stop</span>
                    <p>A single stop</p>
                  </div>
                  <div className="tab_route_form" onClick={() => setChoose(3)}>
                    <span>Delivery stop</span>
                    <p>A single stop</p>
                  </div>
                </div>
              )}

              {(choose == 2 || choose == 3) && (
                <>
                  <form
                    method="post"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddOrEditDailyRoutes();
                    }}
                  >
                    <div className="p-7">
                      <div className="form-group">
                        <label>
                          Address <span className="required">*</span>
                        </label>
                        {isLoaded && (
                          <StandaloneSearchBox
                            onLoad={(ref) => (inputRef.current = ref)}
                            onPlacesChanged={() => handlePlaceChanged("from")}
                          >
                            <input
                              type="text"
                              placeholder="Enter Address"
                              value={from}
                              required
                              onChange={(e) => setFrom(e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                          </StandaloneSearchBox>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Service time (in minutes)</label>
                        <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesVal(minutesval - 1)}
                          >
                            <TiMinus color="#fff" size={20} />
                          </div>
                          <div className="font-semibold">
                            {minutesval} minutes
                          </div>
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesVal(minutesval + 1)}
                          >
                            <TiPlus color="#fff" size={20} />
                          </div>
                        </div>
                      </div>
                      {choose === 2 && (
                        <div className="form-group">
                          <label>
                            How much space will your stop require? (max. 10m3)
                          </label>
                          <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                            <div
                              className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                              onClick={() => setM3Val(m3sval - 1)}
                            >
                              <TiMinus color="#fff" size={20} />
                            </div>
                            <div className="font-semibold">
                              {m3sval} m<sup>3</sup>
                            </div>
                            <div
                              className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                              onClick={() => {
                                if (m3sval < 10) {
                                  setM3Val(m3sval + 1);
                                }
                              }}
                            >
                              <TiPlus color="#fff" size={20} />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label>
                            Start Time <span className="required">*</span>
                          </label>

                          <input
                            type="time"
                            placeholder="Start Time"
                            value={starttime}
                            required
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            End Time <span className="required">*</span>
                          </label>

                          <input
                            type="time"
                            required
                            placeholder="End Time"
                            value={endtime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>For which stop in the daily route?</label>
                        <select
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          value={tijovak}
                          onChange={(e) => setTijovak(e.target.value)}
                        >
                          <option value="">-- Select a time slot --</option>
                          {mapRoutes?.map((item, index) => (
                            <option key={index} value={index}>
                              Stop {index + 1}: {item?.address}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <button
                          disabled={btnloading}
                          type="submit"
                          className="auth_button w-full mt-[20px]"
                        >
                          {btnloading ? "Loading..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {choose == 1 && (
                <>
                  <form
                    method="post"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePickUpAndDelievery();
                    }}
                  >
                    <div className="p-7">
                      <h1 className="font-bold text-[20px] mb-4">Pickup</h1>
                      <div className="form-group">
                        <label>
                          Address or City <span className="required">*</span>
                        </label>
                        {isLoaded && (
                          <StandaloneSearchBox
                            onLoad={(ref) => (inputRef.current = ref)}
                            onPlacesChanged={() => handlePlaceChanged("from")}
                          >
                            <input
                              type="text"
                              placeholder="Enter Address"
                              value={from}
                              required
                              onChange={(e) => setFrom(e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                          </StandaloneSearchBox>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Service time (in minutes)</label>
                        <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesVal(minutesval - 1)}
                          >
                            <TiMinus color="#fff" size={20} />
                          </div>
                          <div className="font-semibold">
                            {minutesval} minutes
                          </div>
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesVal(minutesval + 1)}
                          >
                            <TiPlus color="#fff" size={20} />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          How much space will your stop require? (max. 10m3)
                        </label>
                        <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setM3Val(m3sval - 1)}
                          >
                            <TiMinus color="#fff" size={20} />
                          </div>
                          <div className="font-semibold">
                            {m3sval} m<sup>3</sup>
                          </div>
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => {
                              if (m3sval < 10) {
                                setM3Val(m3sval + 1);
                              }
                            }}
                          >
                            <TiPlus color="#fff" size={20} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label>
                            Start Time <span className="required">*</span>
                          </label>

                          <input
                            type="time"
                            placeholder="Start Time"
                            value={starttime}
                            required
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            End Time <span className="required">*</span>
                          </label>

                          <input
                            type="time"
                            required
                            placeholder="End Time"
                            value={endtime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>For which stop in the daily route?</label>
                        <select
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          value={tijovak}
                          onChange={(e) => setTijovak(e.target.value)}
                        >
                          <option value="">-- Select a time slot --</option>
                          {mapRoutes?.map((item, index) => (
                            <option key={index} value={index}>
                              Stop {index + 1}: {item?.address}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* DELIVERY ADDRESS DATA */}
                      <div className=" pt-0">
                        <h1 className="font-bold text-[20px] mb-4">Delivery</h1>
                        <div className="form-group">
                          <label>
                            Address or City <span className="required">*</span>
                          </label>
                          {isLoaded && (
                            <StandaloneSearchBox
                              onLoad={(ref) => (inputRef2.current = ref)}
                              onPlacesChanged={() => handlePlaceChanged("to")}
                            >
                              <input
                                type="text"
                                placeholder="Enter Address"
                                value={to}
                                required
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                              />
                            </StandaloneSearchBox>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Service time (in minutes)</label>
                          <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                            <div
                              className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                              onClick={() =>
                                setMinutesValDel(minutesvalDel - 1)
                              }
                            >
                              <TiMinus color="#fff" size={20} />
                            </div>
                            <div className="font-semibold">
                              {minutesvalDel} minutes
                            </div>
                            <div
                              className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                              onClick={() =>
                                setMinutesValDel(minutesvalDel + 1)
                              }
                            >
                              <TiPlus color="#fff" size={20} />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-group">
                            <label>
                              Start Time <span className="required">*</span>
                            </label>

                            <input
                              type="time"
                              placeholder="Start Time"
                              value={starttime2}
                              required
                              onChange={(e) => setStartTime2(e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                          <div className="form-group">
                            <label>
                              End Time <span className="required">*</span>
                            </label>

                            <input
                              type="time"
                              required
                              placeholder="End Time"
                              value={endtime2}
                              onChange={(e) => setEndTime2(e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>For which stop in the daily route?</label>
                          <select
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            value={tijovakdel}
                            onChange={(e) => setTijovakDel(e.target.value)}
                          >
                            <option value="">-- Select a time slot --</option>
                            {mapRoutes?.map((item, index) => (
                              <option key={index} value={index}>
                                Stop {index + 1}: {item?.address}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <button
                            disabled={btnloading}
                            type="submit"
                            className="auth_button w-full mt-[20px]"
                          >
                            {btnloading ? "Loading..." : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showedit && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
          onClick={() => {
            setShowModal(false);
            setShowEdit(false);
            setChoose("");
            setEditId("");
          }}
        >
          <div className="flex justify-end items-center h-full w-full">
            <div
              className="bg-white w-[90%] md:w-[37%] h-screen overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="flex justify-between items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)]">
                <span className="font-bold text-[16px] text-[var(--primary-color)] uppercase">
                  Edit or cancel stop
                </span>
              </h1>

              <>
                <form
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddOrEditDailyRoutes();
                  }}
                >
                  <div className="p-7">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      {isLoaded && (
                        <StandaloneSearchBox
                          onLoad={(ref) => (inputRef.current = ref)}
                          onPlacesChanged={() => handlePlaceChanged("from")}
                        >
                          <input
                            type="text"
                            placeholder="Enter Address"
                            value={from}
                            required
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            disabled={
                              !selectedRouteData?.isManuallyAdded &&
                              selectedRouteData?.jobRequestId
                            }
                          />
                        </StandaloneSearchBox>
                      )}
                    </div>
                    {!selectedRouteData?.isStartLocation &&
                      !selectedRouteData?.isEndLocation && (
                        <div className="form-group">
                          <label>Service time (in minutes)</label>
                          <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                            <div
                              className={`w-[40px] h-[40px] ${
                                selectedRouteData?.isManuallyAdded &&
                                "bg-[var(--primary-color)]"
                              } flex justify-center items-center cursor-pointer`}
                            >
                              {selectedRouteData?.isManuallyAdded &&
                                !selectedRouteData?.jobRequestId && (
                                  <TiMinus
                                    color="#fff"
                                    size={20}
                                    onClick={() =>
                                      setMinutesVal(minutesval - 1)
                                    }
                                  />
                                )}
                            </div>
                            <div className="font-semibold">
                              {minutesval} minutes
                            </div>
                            <div
                              className={`w-[40px] h-[40px] ${
                                selectedRouteData?.isManuallyAdded &&
                                "bg-[var(--primary-color)]"
                              } flex justify-center items-center cursor-pointer`}
                            >
                              {selectedRouteData?.isManuallyAdded &&
                                !selectedRouteData?.jobRequestId && (
                                  <TiPlus
                                    color="#fff"
                                    size={20}
                                    onClick={() =>
                                      setMinutesVal(minutesval + 1)
                                    }
                                  />
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    {editdata?.type === "pickup" && (
                      <div className="form-group">
                        <label>
                          How much space will your stop require? (max. 10m3)
                        </label>
                        <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                          <div
                            className={`w-[40px] h-[40px] ${
                              selectedRouteData?.isManuallyAdded &&
                              "bg-[var(--primary-color)]"
                            } flex justify-center items-center cursor-pointer`}
                          >
                            {selectedRouteData?.isManuallyAdded &&
                              !selectedRouteData?.jobRequestId && (
                                <TiMinus
                                  color="#fff"
                                  size={20}
                                  onClick={() => setM3Val(m3sval - 1)}
                                />
                              )}
                          </div>
                          <div className="font-semibold">
                            {calculateTotalVolume()} m<sup>3</sup>
                          </div>
                          <div
                            className={`w-[40px] h-[40px] ${
                              selectedRouteData?.isManuallyAdded &&
                              "bg-[var(--primary-color)]"
                            } flex justify-center items-center cursor-pointer`}
                          >
                            {selectedRouteData?.isManuallyAdded &&
                              !selectedRouteData?.jobRequestId && (
                                <TiPlus
                                  color="#fff"
                                  size={20}
                                  onClick={() => {
                                    if (m3sval < 10) {
                                      setM3Val(m3sval + 1);
                                    }
                                  }}
                                />
                              )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {!selectedRouteData?.isEndLocation && (
                        <div className="form-group">
                          <label>
                            Start Time <span className="required">*</span>
                          </label>
                          <input
                            type="time"
                            placeholder="Start Time"
                            value={starttime}
                            min={minStart}
                            required
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            disabled={
                              selectedRouteData?.date &&
                              !selectedRouteData?.isStartLocation &&
                              !selectedRouteData?.isEndLocation &&
                              isWithin24Hours(selectedRouteData.date)
                            }
                          />
                        </div>
                      )}
                      {!selectedRouteData?.isStartLocation && (
                        <div className="form-group">
                          <label>
                            End Time <span className="required">*</span>
                          </label>
                          <input
                            type="time"
                            placeholder="End Time"
                            value={endtime}
                            max={maxEnd}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                            disabled={
                              selectedRouteData?.date &&
                              !selectedRouteData?.isStartLocation &&
                              !selectedRouteData?.isEndLocation &&
                              isWithin24Hours(selectedRouteData.date)
                            }
                          />
                        </div>
                      )}
                    </div>

                    {!selectedRouteData?.isManuallyAdded &&
                      selectedRouteData?.jobRequestId && (
                        <div className=" mb-3">
                          <b>Time Slot:</b>{" "}
                          {/* {selectedRouteData?.jobRequestId?.timeSlot[cType]} */}
                        </div>
                      )}

                    <div>
                      <button
                        disabled={btnloading}
                        type="submit"
                        className="auth_button w-full mt-[0px]"
                      >
                        {btnloading ? "Confirming..." : "Confirm changes"}
                      </button>
                    </div>
                  </div>
                </form>

                {!selectedRouteData?.isStartLocation &&
                  !selectedRouteData?.isEndLocation && (
                    <div className="p-7 pt-0">
                      <h1 className="flex justify-between items-center text-[var(--text-color)]">
                        <span className="font-bold text-[16px] text-[var(--primary-color)] uppercase">
                          Cancel
                        </span>
                      </h1>
                      <div className="p-0">
                        <p className="mt-4 text-gray-400">
                          Canceling a courier assignment is free of charge up to
                          48 hours before the agreed pickup time. After that,
                          costs are involved:
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-500 text-md">
                            Up to 48 hours in advance
                          </span>
                          <p className="font-bold text-lg">€ 0,-</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-500 text-md">
                            48 hours - 24 hours in advance
                          </span>
                          <p className="font-bold text-lg">€ 25,-</p>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-gray-500 text-md">
                            Within 24 hours
                          </span>
                          <p className="font-bold text-lg">€ 50,-</p>
                        </div>

                        <div className="">
                          <button
                            className="auth_button !bg-red-500 w-full mt-[0px]"
                            onClick={() => setShowConfirm(true)}
                          >
                            Cancel bundle
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </>
            </div>
          </div>
        </div>
      )}
      {showConfirm && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
          onClick={() => {
            setShowConfirm(false);
          }}
        >
          <div className="flex justify-center items-center h-full w-full">
            <div
              className="bg-white w-[90%] md:w-[37%] pb-7 overflow-auto rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="flex justify-center items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)]">
                <span className="font-bold text-[16px] text-red-500 uppercase">
                  Cancel Bundled Transport
                </span>
              </h1>

              <>
                <div className="p-7">
                  <p className="text-[16px] text-gray-500">
                    Canceling a courier assignment is free of charge up to 48
                    hours before the agreed pickup time. After that, costs are
                    involved: Between 48 and 24 hours in advance, the
                    cancellation fee is €50. Within 24 hours before the first
                    agreed pickup time, the cancellation fee is €100.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5 px-7">
                  <button
                    className="bg-red-500 text-white p-4 font-bold rounded-full hover:bg-red-800"
                    onClick={handleCancel}
                  >
                    Confirm
                  </button>
                  <button
                    className="!bg-white border border-gray-300 text-black font-bold p-4 rounded-full"
                    onClick={() => setShowConfirm(false)}
                  >
                    Close
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}

      {showcompletepopup && (
        <>
          <div
            className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
            // onClick={() => {
            //   setShowCompletePopup(false);
            // }}
          >
            <div className="flex justify-center items-center h-full w-full">
              <div
                className="bg-white w-[90%] md:w-[37%] pb-7 overflow-auto rounded-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="flex justify-center items-center p-4 border-b border-[#d2d2d2] text-[var(--text-color)] relative">
                  <span className="font-bold text-[16px] text-red-500 uppercase">
                    MARK JOB AS COMPLETED
                  </span>
                  <CgClose
                    size={20}
                    color="red"
                    className="absolute right-4 cursor-pointer"
                    onClick={() => setShowCompletePopup(false)}
                  />
                </h1>

                <>
                  <div className="p-7">
                    <p className="text-[12px] text-gray-500">
                      Upload Or Take a Picture
                    </p>
                    <div className="grid grid-cols-2 gap-5 mt-4">
                      <div
                        className="border border-[#ccc] py-8 px-4 w-full rounded-md text-center uppercase font-bold cursor-pointer hover:bg-[#f0f0f0]"
                        onClick={handleUploadClick}
                      >
                        Upload Picture
                      </div>
                      <div
                        className="border border-[#ccc] py-8 px-4 w-full text-center rounded-md uppercase font-bold cursor-pointer hover:bg-[#f0f0f0]"
                        onClick={handleTakePicture}
                      >
                        Take Picture
                      </div>
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    {/* Camera View & Capture */}
                    {takingPhoto && (
                      <div className="mt-4 relative">
                        <video
                          ref={videoRef}
                          width="100%"
                          className="rounded-md"
                        />
                        <CgClose
                          size={24}
                          color="red"
                          className="absolute top-2 right-2 cursor-pointer bg-white p-1 rounded-full"
                          onClick={() => {
                            setTakingPhoto(false);
                            setImageSrc(null);
                          }}
                        />
                        <button
                          onClick={handleCapture}
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Capture Photo
                        </button>
                        <canvas
                          ref={canvasRef}
                          width={640}
                          height={480}
                          style={{ display: "none" }}
                        />
                      </div>
                    )}

                    {/* Display Image */}
                    {imageSrc && !takingPhoto && (
                      <div className="mt-6 relative">
                        <h2 className="text-lg font-bold mb-2">
                          Image Preview:
                        </h2>
                        <div className="relative inline-block">
                          <img
                            src={imageSrc}
                            alt="Captured or Uploaded"
                            className="rounded-md h-[100px]"
                          />
                          <CgClose
                            size={20}
                            color="red"
                            className="absolute -top-2 -right-2 cursor-pointer bg-white rounded-full p-0.5"
                            onClick={() => setImageSrc(null)}
                          />
                        </div>
                      </div>
                    )}
                    <div className="mt-3">
                      <p className="text-[12px] text-gray-500 mb-2">Comments</p>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="border resize-none border-[#ccc] py-4 px-4 w-full rounded-md"
                        placeholder="Enter your comments...."
                      ></textarea>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 px-7">
                    <button
                      className="bg-green-500 text-white p-4 font-bold rounded-full hover:bg-red-800"
                      onClick={() => handleMarkComplete(completerouteid, "abc")}
                    >
                      SUBMIT
                    </button>
                  </div>
                </>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default DailyRoutes;
