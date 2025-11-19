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
  EDIT_DAILY_ROUTES,
  GET_ROUTES,
  MAPS_API_KEY,
} from "../../constants";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import RouteMap from "../../Components/RoutesMap";

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
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [from, setFrom] = useState("");
  const [endtime, setEndTime] = useState("");
  const [starttime, setStartTime] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { fetchData } = useFetch();
  const { submitData } = useCreateOrEdit();
  const [editId, setEditId] = useState(null);
  const [mapRoutes, setMapRoutes] = useState([]);

  // console.log("editId", editId);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  console.log("selectdDATE", selectedDate.format("YYYY-MM-DD"));

  const handleDateChange = (date) => {
    // setLoading(true);
    setSelectedDate(date);
    // sleep(1000).then(() => {
    //    setLoading(false);
    // })
  };
  const currentDateKey = selectedDate.format("YYYY-MM-DD");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });
  const handlePlaceChanged = (adress) => {
    const [place] = inputRef.current.getPlaces();
    setFrom(place?.formatted_address);
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setLatitude(lat);
    setLongitude(lng);
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

        if (starttime > endtime) {
          toast.error("Start time should be less than end time");
          return;
        }

        if (endtime > "20:00") {
          toast.error("You can't set time more than 8 PM");
          return;
        }

        const timeSlot = `${starttime} - ${endtime}`;
        const date = selectedDate.format("YYYY-MM-DD");
        setBtnLoading(true);
        const payload = {
          date,
          timeSlot,
          address: { address: from, lat: latitude, lng: longitude },
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
        if (!from || !starttime || !endtime) {
          toast.error("Please fill all fields");
          return;
        }

        console.log(
          from,
          starttime,
          endtime,
          "lat",
          latitude,
          "lng",
          longitude
        );

        if (starttime > endtime) {
          toast.error("Start time should be less than end time");
          return;
        }

        if (endtime > "20:00") {
          toast.error("You can't set time more than 8 PM");
          return;
        }

        const timeSlot = `${starttime} - ${endtime}`;
        const date = selectedDate.format("YYYY-MM-DD");

        const payload = {
          date,
          timeSlot,
          address: { address: from, lat: latitude, lng: longitude },
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
          setStartTime("");
          setEndTime("");
          setLatitude("");
          setLongitude("");
          getRoutes();
          setEditId(null); // Reset editId after successful edit
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Error adding route");
      }
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

  const getRoutes = async () => {
    try {
      setLoading(true);
      const response = await fetchData(
        `${GET_ROUTES}/${selectedDate.format("YYYY-MM-DD")}`
      );
      console.log("today routes", response);
      if (response && response.data) {
        setRoutes(response.data?.routes);
        const mapRoutes = transformRoutesForMap(response.data?.routes);
        setMapRoutes(mapRoutes);
        console.log("mapRoutes", mapRoutes);
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
    setEndTime(end);
    setLatitude(route?.address?.lat);
    setLongitude(route?.address?.lng);

    setShowModal(true);
  };

  const handleMarkComplete = async (routeId) => {
    try {
      const response = await submitData(
        `${EDIT_DAILY_ROUTES}/complete/${routeId}`,
        {},
        "PUT"
      );
      if (response.data.success) {
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

  return (
    <DashboardLayout>
      <div className=" w-full relative mb-4 px-5">
        {/* <div className="flex items-center gap-3">
          <h2 className="font-bold text-[15px]">Daily Routes</h2>
        </div> */}
        <div className="flex items-start justify-between gap-4 md:flex-row flex-col">
          <div className="w-full md:w-[50%]">
            <CalendarHeader onDateChange={handleDateChange} />
            <div className="flex justify-end items-center gap-3">
              <button
                className="rounded-full px-5 flex items-center gap-2 py-2 !bg-[var(--primary-color)] !text-[var(--text-color)]"
                onClick={() => setShowModal(true)}
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
                  <div className="white_box p-4 dot_class_right_routes">
                    <div className="flex justify-between items-center border-b border-[#e9e9e9] pb-3">
                      <p className="font-normal text-[var(--text-color)]">
                        {item?.address?.address}
                      </p>
                      {/* {item?.start == 0 && item?.end == 0 && ( */}
                      {item?.status != "completed" && (
                        <div className="cursor-pointer">
                          <PiNotePencilLight
                            size={20}
                            color="#85e211"
                            onClick={() => handleEditClick(item)}
                          />
                        </div>
                      )}

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
                      </span>
                      <button
                        onClick={() => handleMarkComplete(item._id)}
                        className={`px-3 py-2 rounded-full text-[10px] ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-800 cursor-default"
                            : "bg-red-400 text-white hover:bg-blue-200"
                        }`}
                        disabled={item.status === "completed"}
                      >
                        {item.status === "completed"
                          ? "Completed"
                          : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </div>
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
          <div className="w-full md:w-[30%]">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77816130378!2d2.2646335339291532!3d48.85893848492655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2s!4v1743949549071!5m2!1sen!2s"
              width="100%"
              height="650"
              style={{ border: 0, borderRadius: "10px" }}
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
            <RouteMap routes={mapRoutes} />
          </div>
        </div>
      </div>

      {/* JOBS POPUP RIGHT */}
      {showmodal && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
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
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DailyRoutes;
