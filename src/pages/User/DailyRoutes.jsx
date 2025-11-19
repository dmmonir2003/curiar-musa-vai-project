/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import { useNavigate } from "react-router-dom";
import EDITBTN from "./../../assets/editbtn.svg";
import { PiNotePencilLight } from "react-icons/pi";
import CalendarHeader from "./../../Components/Calendar";
import dayjs from "dayjs";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import {
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

const ROUTESDATA = [
  {
    id: 1,
    address: "19 North Road Piscataway, NJ 08854",
    date: "2025-05-28",
    time: "11:00 AM",
    lat: 40.758895,
    lng: -73.986328,
    status: "pending",
    start: 1,
    end: 0,
  },
  {
    id: 2,
    address: "23 North Road Piscataway, NJ 08854",
    date: "2025-05-28",
    time: "03:00 PM",
    lat: 40.718895,
    lng: -73.986328,
    status: "pending",
    start: 0,
    end: 1,
  },
];

const DailyRoutes = () => {
  const navigate = useNavigate();
  const urlPath = window.location.pathname;
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

  // console.log("editId", editId);tijovakdel

  const [selectedDate, setSelectedDate] = useState(dayjs());

  // console.log("selectdDATE", selectedDate.format("YYYY-MM-DD"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const currentDateKey = selectedDate.format("YYYY-MM-DD");

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

    // localStorage.setItem("fromlat", lat);
    // localStorage.setItem("fromlng", lng);
    // console.log(lat, lng);
  };

  const handleAddOrEditDailyRoutes = async () => {
    if (!editId) {
      try {
        if (!from || !starttime || !endtime) {
          toast.error("Please fill all fields");
          return;
        }

        // console.log(
        //   from,
        //   starttime,
        //   endtime,
        //   "lat",
        //   latitude,
        //   "lng",
        //   longitude
        // );

        // if (starttime > endtime) {
        //   toast.error("Start time should be less than end time");
        //   return;
        // }

        // if (endtime > "21:00") {
        //   toast.error("You can't set time more than 8 PM");
        //   return;
        // }

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

        // console.log(
        //   from,
        //   starttime,
        //   endtime,
        //   "lat",
        //   latitude,
        //   "lng",
        //   longitude
        // );

        // if (starttime > endtime) {
        //   toast.error("Start time should be less than end time");
        //   return;
        // }

        // if (endtime > "21:00") {
        //   toast.error("You can't set time more than 8 PM");
        //   return;
        // }

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
          setEditId(null); // Reset editId after successful edit
          setShowEdit(false); // Close the edit modal
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Error adding route");
      }
    }
  };
  const cType = selectedRouteData?.type === "pickup" ? "start" : "end";
  const [rawMin, rawMax] =
    (!selectedRouteData?.isManuallyAdded &&
      selectedRouteData?.jobRequestId &&
      selectedRouteData?.jobRequestId?.timeSlot[cType]?.split(" - ")) ||
    [];
  const convertTo24HourFormat = (timeStr) => {
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

  console.log("start", minStart, "end", maxEnd, cType);

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
    // Handle responses
    if (pickupResponse.data.success && deliveryResponse.data.success) {
      toast.success("Pickup and delivery routes added successfully");
      // Reset form or navigate away
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
      getRoutes(); // Refresh routes list
      // Refresh routes list if needed
    } else {
      toast.error("Error adding one or both routes");
    }
  };

  const transformRoutesForMap = (routes) => {
    return routes.map((route, index) => ({
      lat: route.address.lat,
      lng: route.address.lng,
      address: route.address.address,
      timeSlot: route.timeSlot,
      // Include additional fields you might need:
      id: route._id,
      status: route.status,
      order: index + 1, // If you need to track original order
    }));
  };
  // alert("starttime " + starttime + " endtime " + endtime);
  const getRoutes = async () => {
    try {
      setLoading(true);
      const response = await fetchData(
        `${GET_ROUTES}/${selectedDate.format("YYYY-MM-DD")}`
      );
      // console.log("today routes", response);
      if (response && response.data) {
        setRoutes(response.data?.routes);

        // Only include routes with address.lat and address.lng
        const validMapRoutes = response?.data?.routes?.filter(
          (route) => route?.address?.lat && route?.address?.lng
        );

        const mapRoutes = transformRoutesForMap(validMapRoutes);
        setMapRoutes(mapRoutes);
        // const mapRoutes = transformRoutesForMap(response.data?.routes);
        // setMapRoutes(mapRoutes);
        // console.log("mapRoutes", mapRoutes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, [selectedDate]);

  const handleEditClick = (route) => {
    setEditId(route?._id);
    setFrom(route.address.address);
    const [start, end] = route.timeSlot.split(" - ");
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
        // Refresh routes or update local state
        getRoutes();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  function getStartTime(timeSlot) {
    if (!timeSlot) return "";

    const [startTime] = timeSlot.split(" - ");
    const [hour, minute] = startTime.trim().split(":").map(Number);

    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  const moveRoute = (index, direction) => {
    setRoutes((prevRoutes) => {
      const newRoutes = [...prevRoutes];

      if (
        (direction === "up" && index === 1) || // Don't move if index is 1 (can't go higher)
        (direction === "down" && index === newRoutes.length - 1) // Can't go below last item
      ) {
        return prevRoutes;
      }

      const swapIndex = direction === "up" ? index - 1 : index + 1;

      // Swap items
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
      positionNumber: index, // or just index, based on your logic
    }));
    try {
      const response = await submitData(
        UPDATE_POSITIONS,
        { routes: reorderedRoutes },
        "POST"
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleViewData = (id) => {
    setShowRouteData(true);
    const selectedRoute = mapRoutes[id]; // maproutes is your full route array
    setMapSingleRoutes([selectedRoute]);
    // console.log(selectedRoute, "selectedRoute")
    // setSelectedRouteId(id);
    // console.log(routes[id], "ROUTE ID")
    setSelectedRouteData(routes[id]);
  };

  console.log("selectedRouteData", selectedRouteData);

  const trimNumberToSixChars = (num) => {
    return num.toString().slice(0, 6);
  };

  // console.log("selected route data", selectedRouteData);

  const handleEditSpecificRoute = async (route) => {
    // alert("Edit route clicked");
    console.log("route", route);
    setEditData(route);
    setMinutesVal(route?.serviceMinutes || 11);
    setM3Val(route?.spaceRequired || 5);
    setType(route.type);
    setEditId(route?._id);
    setFrom(route?.address?.address || "");
    const [start, end] = route.timeSlot.split(" - ");
    console.log("start, end", start, end);
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
        // Case: User must pay to cancel (after 48 hours)
        toast.success("Cancellation requires a fee. Redirecting to payment...");
        localStorage.setItem("paymentId", response?.data?.paymentId);

        window.location.href = response?.data?.checkoutUrl; // Redirect to Mollie checkout
      } else if (response?.data?.message) {
        // Case: Successfully canceled (manually added or within 48 hours)
        toast.success(response?.data?.message);
        setShowConfirm(false);
        setShowEdit(false); // Close the edit modal

        getRoutes();

        // Optional: Refresh list or close modal
      } else {
        // Unexpected format
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
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // This will be base64 string
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

    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setImageSrc(imageData);

    // Stop webcam
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

  // console.log("isMobile", isMobile);
  const shouldHide = isMobile && showRouteData;

  function calculateTotalVolume() {
    let items = selectedRouteData?.jobRequestId?.items;
    let totalVolume = 0;
    items.forEach((item) => {
      const length = parseFloat(item.length);
      const width = parseFloat(item.width);
      const height = parseFloat(item.height);
      const qty = parseInt(item.qty);

      const volumePerItem = (length * width * height) / 1000000; // cm³ to m³
      const itemTotalVolume = volumePerItem * qty;

      totalVolume += itemTotalVolume;
    });

    return totalVolume.toFixed(3); // Round to 3 decimals
  }

  return (
    <DashboardLayout>
      <div className=" w-full relative mb-4 px-5">
        {/* <div className="flex items-center gap-3">
          <h2 className="font-bold text-[15px]">Daily Routes</h2>
        </div> */}
        <div className="flex items-start justify-between gap-10 md:flex-row flex-col">
          <div
            className={`w-full md:w-[40%] ${shouldHide ? "hidden" : "block"}`}
          >
            <CalendarHeader onDateChange={handleDateChange} />
            <div className="mb-5">
              <RouteMap routes={mapRoutes} />
            </div>

            <div className="flex justify-end items-center gap-3">
              <button
                className="rounded-full px-5 flex items-center gap-2 py-2 !bg-[var(--primary-color)] !text-[var(--text-color)]"
                onClick={() => {
                  setEditData("");
                  setEditId(null);
                  setFrom("");
                  setStartTime("");
                  setEndTime("");
                  setLatitude("");
                  setLongitude("");
                  setShowEdit(false);
                  setShowModal(true);
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
              {/* START DOT */}
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
                        {/* {item?.start == 0 && item?.end == 0 && ( */}
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
                          {/* <MdOutlineKeyboardArrowUp
                          size={20}
                          className="cursor-pointer"
                        />
                        <MdOutlineKeyboardArrowDown
                          size={20}
                          className="cursor-pointer"
                        /> */}
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

                        {/* )} */}
                      </div>
                      <div className="flex justify-between  mt-2 items-center">
                        <span className="font-bold mt-0 block text-md uppercase">
                          {index === 0 && "Start - "}
                          {index === routes.length - 1 && "End - "}

                          {item?.timeSlot && (
                            <span className="text-[var(--text-color)] font-normal">
                              {/* {" - "} */}
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
                          {/* {item?.status != "completed" && (
                          <div className="cursor-pointer">
                            <PiNotePencilLight
                              size={20}
                              color="#000000"
                              onClick={() => handleEditClick(item)}
                            />
                          </div>
                        )} */}
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

                        // Optional: Assume avg 40 km/h for rough travel time
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

              {/* <div className="flex items-center gap-4 justify-between">
                    <div className="dot_class_main_routes">
                        <div className="dot_route"></div>
                    </div>
                    <div className="white_box p-4 dot_class_right_routes">
                        <div className="flex justify-between items-center border-b border-[#d2d2d2] pb-3">
                            <p className="font-normal text-[var(--text-color)]">19 North Road Piscataway, NJ 08854</p>
                            <div>
                                <PiNotePencilLight size={20} color="#85e211" />
                            </div>
                        </div>
                        <div>
                            <span className="font-bold mt-3 block text-md uppercase">Start</span>
                        </div>
                    </div>
                </div> */}

              {/* <div className="flex items-center gap-4 justify-between mt-10">
                    <div className="dot_class_main_routes">
                        <div className="dot_route"></div>
                    </div>
                    <div className="white_box p-4 dot_class_right_routes">
                        <div className="flex justify-between items-center border-b border-[#d2d2d2] pb-3">
                            <p className="font-normal text-[var(--text-color)]">19 North Road Piscataway, NJ 08854</p>
                            <div>
                                <PiNotePencilLight size={20} color="#85e211" />
                            </div>
                        </div>
                        <div>
                            <span className="font-bold mt-3 block text-md uppercase">END</span>
                        </div>
                    </div>
                </div> */}
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            {showRouteData && (
              <>
                <div className="white_box py-4 px-6">
                  <h1 className="font-bold text-xl pb-4 flex justify-between items-center">
                    {/* <span>Pickup/Delivery</span> */}
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
                    {/* {(selectedRouteData?.status == "canceled" && (selectedRouteData?.status == "completed" && (selectedRouteData?.type !== "start" || selectedRouteData?.type !== "end"))) && ( */}
                    <>
                      <div
                        className="cursor-pointer font-normal text-md flex items-center gap-1"
                        onClick={() => {
                          handleEditSpecificRoute(selectedRouteData);
                        }}
                      >
                        <PiNotePencilLight size={20} color="#000000" />
                        <span className="!text-[13px] font-semibold">
                          Wijzig
                        </span>
                      </div>
                    </>
                    {/* )} */}
                  </h1>
                  <hr className="mb-4" />

                  <div>
                    <div className="text-lg font-semibold text-[var(--primary-color)] mb-2">
                      {selectedRouteData?.address?.address || "No Address"}
                    </div>
                    {selectedRouteData && selectedRouteData?.serviceMinutes && (
                      <div className="text-lg mt-2">
                        <span>Servicetijd: </span>{" "}
                        <span className="font-semibold">
                          {selectedRouteData?.serviceMinutes} minuten
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
                      <RouteMap
                        routes={mapsingleroutes}
                        letterdisplay={mapsingleroutes[0]?.order}
                      />
                    </div>
                    {selectedRouteData?.isManuallyAdded == false && (
                      <>
                        <h1 className="font-bold text-xl pb-4">Informatie</h1>
                        <hr className="mb-4" />

                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="pills_address capitalize">
                            <b>Pickup From</b> -{" "}
                            {selectedRouteData?.jobRequestId?.pickupType}{" "}
                            {selectedRouteData?.jobRequestId?.itemSource != ""
                              ? `(${selectedRouteData?.jobRequestId?.itemSource})`
                              : ""}
                          </div>
                          <div className="pills_address capitalize">
                            {selectedRouteData?.jobRequestId?.extraServices
                              ?.helpers == 2
                              ? "Extra Helpers Needed"
                              : "No Extra Helpers"}
                          </div>
                          <div className="pills_address capitalize">
                            Floor -{" "}
                            {
                              selectedRouteData?.jobRequestId?.extraServices
                                ?.floor
                            }
                          </div>
                        </div>

                        <div className="mt-5">
                          <h3 className="font-bold text-lg pb-1">
                            Referentienummer
                          </h3>
                          <span className="text-[14px] text-[#5b5b5b]">
                            #{trimNumberToSixChars(selectedRouteData?.shortId)}
                          </span>
                        </div>

                        <div className="mt-5">
                          <h3 className="font-bold text-lg pb-1">
                            Delivery Products
                          </h3>
                        </div>

                        <div className="mt-3">
                          {selectedRouteData?.jobRequestId?.items?.map(
                            (item) => (
                              <>
                                <div className="bg-[#F5F7F9] rounded-xl  mt-2">
                                  <div className="flex items-center  gap-3 p-3">
                                    <div className="text-[15px] text-[#00000070]">
                                      <img
                                        className="w-[30px] h-[30px]"
                                        src={item?.image}
                                        alt=""
                                      />
                                    </div>
                                    <span className="text-xs">
                                      {item?.qty}(x) {item?.height}x
                                      {item?.width}x{item?.length}cm -{" "}
                                      {item?.name}
                                    </span>
                                  </div>
                                </div>
                              </>
                            )
                          )}
                        </div>

                        <div className="mt-5">
                          <h3 className="font-bold text-lg pb-1">
                            Contact Details
                          </h3>
                        </div>

                        <>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[#00000070] font-bold">
                              Name:
                            </span>
                            <span className="text-[var(--text-color)] text-[14px]">
                              {
                                selectedRouteData?.jobRequestId?.contactDetails
                                  ?.firstName
                              }{" "}
                              {
                                selectedRouteData?.jobRequestId?.contactDetails
                                  ?.lastName
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[#00000070] font-bold">
                              Email Address:
                            </span>
                            <span className="text-[var(--text-color)] text-[14px]">
                              {
                                selectedRouteData?.jobRequestId?.contactDetails
                                  ?.email
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[#00000070] font-bold">
                              Phone #:
                            </span>
                            <span className="text-[var(--text-color)] text-[14px]">
                              {
                                selectedRouteData?.jobRequestId?.contactDetails
                                  ?.phoneNumber
                              }
                            </span>
                          </div>
                        </>
                      </>
                    )}

                    {selectedRouteData?.status === "completed" &&
                      selectedRouteData?.type !== "start" &&
                      selectedRouteData?.type !== "end" && (
                        <>
                          <div className="mt-5">
                            <h3 className="font-bold text-lg pb-1">Comemnts</h3>
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

      {/* JOBS POPUP RIGHT */}
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
                        <label>Servicetijd (in minuten)</label>
                        <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesVal(minutesval - 1)}
                          >
                            <TiMinus color="#fff" size={20} />
                          </div>
                          <div className="font-semibold">
                            {minutesval} minuten
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
                            Hoeveel ruimte zal jouw eigen stop in beslag nemen?
                            (max. 10m3)
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
                        <label>Voor welke stop in de dagroute?</label>
                        <select
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          value={tijovak}
                          onChange={(e) => setTijovak(e.target.value)}
                        >
                          <option value="">-- Selecteer een tijovak --</option>
                          {mapRoutes?.map((item, index) => (
                            <option key={index} value={index}>
                              Stop {index + 1}: {item?.address}
                            </option>
                          ))}
                          {/* <option value="1">Stop 1: Address</option>
                          <option value="2">Stop 2: Address</option>
                          <option value="3">Stop 3: Address</option>
                          <option value="4">Stop 4: Address</option>
                          <option value="5">Stop 5: Address</option>
                          <option value="6">Stop 6: Address</option>
                          <option value="7">Stop 7: Address</option>
                          <option value="8">Stop 8: Address</option>
                          <option value="9">Stop 9: Address</option>
                          <option value="10">Stop 10: Address</option> */}
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
                      <h1 className="font-bold text-[20px] mb-4">Ophalen</h1>
                      <div className="form-group">
                        <label>
                          Adres of plaatsnaam{" "}
                          <span className="required">*</span>
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
                        <label>Servicetijd (in minuten)</label>
                        <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesVal(minutesval - 1)}
                          >
                            <TiMinus color="#fff" size={20} />
                          </div>
                          <div className="font-semibold">
                            {minutesval} minuten
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
                          Hoeveel ruimte zal jouw eigen stop in beslag nemen?
                          (max. 10m3)
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
                        <label>Voor welke stop in de dagroute?</label>
                        <select
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          value={tijovak}
                          onChange={(e) => setTijovak(e.target.value)}
                        >
                          <option value="">-- Selecteer een tijovak --</option>
                          <option value="1">Stop 1: Address</option>
                          <option value="2">Stop 2: Address</option>
                          <option value="3">Stop 3: Address</option>
                          <option value="4">Stop 4: Address</option>
                          <option value="5">Stop 5: Address</option>
                          <option value="6">Stop 6: Address</option>
                          <option value="7">Stop 7: Address</option>
                          <option value="8">Stop 8: Address</option>
                          <option value="9">Stop 9: Address</option>
                          <option value="10">Stop 10: Address</option>
                        </select>
                      </div>

                      {/* <div>
                        <button
                          disabled={btnloading}
                          type="submit"
                          className="auth_button w-full mt-[20px]"
                        >
                          {btnloading ? "Loading..." : "Submit"}
                        </button>
                      </div> */}
                    </div>

                    {/* DELIVERY ADDRESS DATA */}
                    <div className="p-7 pt-0">
                      <h1 className="font-bold text-[20px] mb-4">Afleveren</h1>
                      <div className="form-group">
                        <label>
                          Adres of plaatsnaam{" "}
                          <span className="required">*</span>
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
                        <label>Servicetijd (in minuten)</label>
                        <div className="border-2 border-gray-300 rounded-lg flex justify-between items-center gap-3">
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesValDel(minutesvalDel - 1)}
                          >
                            <TiMinus color="#fff" size={20} />
                          </div>
                          <div className="font-semibold">
                            {minutesvalDel} minuten
                          </div>
                          <div
                            className="w-[40px] h-[40px] bg-[var(--primary-color)] flex justify-center items-center cursor-pointer"
                            onClick={() => setMinutesValDel(minutesvalDel + 1)}
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
                        <label>Voor welke stop in de dagroute?</label>
                        <select
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                          value={tijovakdel}
                          onChange={(e) => setTijovakDel(e.target.value)}
                        >
                          <option value="">-- Selecteer een tijovak --</option>
                          <option value="1">Stop 1: Address</option>
                          <option value="2">Stop 2: Address</option>
                          <option value="3">Stop 3: Address</option>
                          <option value="4">Stop 4: Address</option>
                          <option value="5">Stop 5: Address</option>
                          <option value="6">Stop 6: Address</option>
                          <option value="7">Stop 7: Address</option>
                          <option value="8">Stop 8: Address</option>
                          <option value="9">Stop 9: Address</option>
                          <option value="10">Stop 10: Address</option>
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
                  Wijzig of annuleer stop
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
                          <label>Servicetijd (in minuten)</label>
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
                              {minutesval} minuten
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
                          Hoeveel ruimte zal jouw eigen stop in beslag nemen?
                          (max. 10m3)
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
                          {selectedRouteData?.jobRequestId?.timeSlot[cType]}
                        </div>
                      )}

                    <div>
                      <button
                        disabled={btnloading}
                        type="submit"
                        className="auth_button w-full mt-[0px]"
                      >
                        {btnloading ? "Confirming..." : "Bevestig wijziging"}
                      </button>
                    </div>
                  </div>
                </form>

                {!selectedRouteData?.isStartLocation &&
                  !selectedRouteData?.isEndLocation && (
                    <div className="p-7 pt-0">
                      <h1 className="flex justify-between items-center text-[var(--text-color)]">
                        <span className="font-bold text-[16px] text-[var(--primary-color)] uppercase">
                          Annuleren
                        </span>
                      </h1>
                      <div className="p-0">
                        <p className="mt-4 text-gray-400">
                          Het annuleren van een Brenger opdracht is kosteloos
                          tot 48 uur voor het afgesproken ophaalmoment. Daarna
                          zijn er kosten aan verbonden:
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-500 text-md">
                            tot 48 vur van tevoren
                          </span>
                          <p className="font-bold text-lg">€ 0,-</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-500 text-md">
                            48 uur - 24 uur van tevoren
                          </span>
                          <p className="font-bold text-lg">€ 25,-</p>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-gray-500 text-md">
                            24 uur van tevoren
                          </span>
                          <p className="font-bold text-lg">€ 50,-</p>
                        </div>

                        <div className="">
                          <button
                            className="auth_button !bg-red-500 w-full mt-[0px]"
                            onClick={() => setShowConfirm(true)}
                          >
                            Annuleer bundel
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

      {/* SHOW CONFIRM MODAL */}
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
                  Gebundeld transport Annuleren
                </span>
              </h1>

              <>
                <div className="p-7">
                  <p className="text-[16px] text-gray-500">
                    Hethnuleren van een gebundeld transport is kosteloos tot 48
                    uur voor het eerste afgesproken ophaalmoment, tussen de 48
                    en 24 uur van te voren zijn de annuleringskosten €50 en
                    binnen 24 uur voor het eerste afgesproken ophaalmoment zijn
                    de annuleringskosten €100
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5 px-7">
                  <button
                    className="bg-red-500 text-white p-4 font-bold rounded-full hover:bg-red-800"
                    onClick={handleCancel}
                  >
                    Akkoord
                  </button>
                  <button
                    className="!bg-white border border-gray-300 text-black font-bold p-4 rounded-full"
                    onClick={() => setShowConfirm(false)}
                  >
                    Sluiten
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
