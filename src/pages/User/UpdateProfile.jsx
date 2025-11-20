import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import On from "./../../assets/on.svg";
import Off from "./../../assets/off.svg";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeadphonesAlt } from "react-icons/fa";
import ProfileGreen from "../../Components/ProfileGreen";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessToken,
  selectUser,
  selectUserType,
  setUser,
} from "../../store/userSlice";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import toast from "react-hot-toast";
import { MAPS_API_KEY, UPDATE_PROFILE } from "../../constants";
import httpRequset from "../../axios/index";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const DashboardUser = () => {
  const [emailnotif, setEmailNotif] = useState(false);
  const [deliverynotif, setDeliveryNotif] = useState(true);
  const [loading, setLoading] = useState(false);

  // Initialize address as an object
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyLocation: {}, // Changed to match your login logic
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const { submitData } = useCreateOrEdit();
  const userType = useSelector(selectUserType);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const inputRef = useRef(null);

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setFormData((prev) => ({
        ...prev,
        companyLocation: { companyLocation: place.formatted_address, lat, lng },
      }));
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name?.firstName || "",
        lastName: user.name?.lastName || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        // Handle object or string location safely
        companyLocation:
          typeof user.companyLocation === "object"
            ? user.companyLocation
            : {
                companyLocation: user.companyLocation || "",
                lat: null,
                lng: null,
              },
        profileImage: user.profileImg || null,
      });

      setEmailNotif(user.emailNotifications || false);
      setDeliveryNotif(user.alertsDelivery || true);
      setImagePreview(user.profileImg || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData((prev) => ({
          ...prev,
          profileImage: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- UPDATED FUNCTION ---
  const updateProfile = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();

      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);

      // Handle Address/Location
      if (formData.companyLocation) {
        // If it's an object (from Google Maps or parsed data)
        if (typeof formData.companyLocation === "object") {
          formDataToSend.append(
            "companyLocation",
            formData.companyLocation.address || ""
          );
          // if (formData.companyLocation.lat)
          //   formDataToSend.append("address[lat]", formData.companyLocation.lat);
          // if (formData.companyLocation.lng)
          //   formDataToSend.append("address[lng]", formData.companyLocation.lng);
        } else {
          // If it's just a string
          formDataToSend.append("companyLocation", formData.companyLocation);
        }
      }

      formDataToSend.append("emailNotifications", emailnotif);
      formDataToSend.append("alertsDelivery", deliverynotif);
      formDataToSend.append("token", accessToken);

      if (formData.profileImage && formData.profileImage.startsWith("data:")) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      // FIX 1: Set ID to NULL to avoid appending it to URL
      const response = await submitData(
        UPDATE_PROFILE,
        formDataToSend,
        user._id, // <--- ID is NULL so URL stays /api/v1/users
        "PATCH"
      );

      // FIX 2: Handle Response structure carefully
      console.log("Update Response:", response);

      // Check where the user object is inside the response
      // Usually it's response.data.user or response.data.data
      const updatedUser = response?.data?.user || response?.data?.data || user;

      dispatch(
        setUser({
          user: updatedUser, // Save the correct object
          userType: userType,
          accessToken: accessToken, // Keep existing token
        })
      );

      setLoading(false);
      toast.success(response?.data?.message || "Profile updated successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="mt-8">
        <ProfileGreen
          user={{ ...user, profileImage: imagePreview || user?.profileImage }}
          handleImageChange={handleImageChange}
          fileInputRef={fileInputRef}
        />

        <h1 className="font-bold text-[17px] w-full">Account Settings</h1>
        <p className="text-[11px]">
          Manage your account preferences and settings
        </p>

        <div className="white_box p-6 mt-6">
          <div>
            <h1 className="font-bold text-[15px] w-full">
              Personal Information
            </h1>
            <p className="text-[11px]">
              Fill in below details to update your profile information.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* FIRST NAME */}
            <div className="form-group !mb-1">
              <label>
                First name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control w-full"
                placeholder="Enter first name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <div className="icon_input">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 8.75C9.07107 8.75 10.75 7.07107 10.75 5C10.75 2.92893 9.07107 1.25 7 1.25C4.92893 1.25 3.25 2.92893 3.25 5C3.25 7.07107 4.92893 8.75 7 8.75ZM7 8.75C8.5913 8.75 10.1174 9.38214 11.2426 10.5074C12.3679 11.6326 13 13.1587 13 14.75M7 8.75C5.4087 8.75 3.88258 9.38214 2.75736 10.5074C1.63214 11.6326 1 13.1587 1 14.75"
                    stroke="#92939E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* LAST NAME */}
            <div className="form-group !mb-1">
              <label>
                Last name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control w-full"
                placeholder="Enter last name"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <div className="icon_input">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 8.75C9.07107 8.75 10.75 7.07107 10.75 5C10.75 2.92893 9.07107 1.25 7 1.25C4.92893 1.25 3.25 2.92893 3.25 5C3.25 7.07107 4.92893 8.75 7 8.75ZM7 8.75C8.5913 8.75 10.1174 9.38214 11.2426 10.5074C12.3679 11.6326 13 13.1587 13 14.75M7 8.75C5.4087 8.75 3.88258 9.38214 2.75736 10.5074C1.63214 11.6326 1 13.1587 1 14.75"
                    stroke="#92939E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group !mb-1">
              <label>
                Email address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email address"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className="icon_input">
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 3.75L9.7725 8.025C9.54095 8.17007 9.27324 8.24701 9 8.24701C8.72676 8.24701 8.45905 8.17007 8.2275 8.025L1.5 3.75M3 1.5H15C15.8284 1.5 16.5 2.17157 16.5 3V12C16.5 12.8284 15.8284 13.5 15 13.5H3C2.17157 13.5 1.5 12.8284 1.5 12V3C1.5 2.17157 2.17157 1.5 3 1.5Z"
                    stroke="#92939E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* PHONE */}
            <div className="form-group !mb-1">
              <label>
                Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="form-control"
                placeholder="Enter your phone number"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <div className="icon_input">
                <FaHeadphonesAlt color="#B9BAC0" size={16} />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="form-group !mb-1 relative">
              <label className="block mb-1">
                Address <span className="text-red-500">*</span>
              </label>

              {isLoaded && (
                <div className="relative">
                  <StandaloneSearchBox
                    onLoad={(ref) => (inputRef.current = ref)}
                    onPlacesChanged={handlePlaceChanged}
                  >
                    <input
                      type="text"
                      name="address"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your address"
                      required
                      // Handle value safely checking if companyLocation is object or string
                      value={formData.companyLocation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyLocation: {
                            ...prev.companyLocation,
                            address: e.target.value,
                          },
                        }))
                      }
                    />
                  </StandaloneSearchBox>

                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaLocationDot size={16} className="text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NOTIFICATION SETTINGS */}
        <div className="white_box p-6 mt-4">
          <div>
            <h1 className="font-bold text-[14px] w-full">
              Notification Preferences
            </h1>
            <p className="text-[11px]">
              Configure how you receive notifications and alerts
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="alert_section bg-[#F7F7F8] rounded-[15px] px-4 py-3 flex justify-between items-center">
              <div>
                <h1 className="font-semibold text-[13px] w-full">
                  Email Notifications
                </h1>
                <p className="text-[11px]">
                  Receive email notifications about your account activity
                </p>
              </div>
              <div>
                <img
                  className="cursor-pointer"
                  onClick={() => setEmailNotif(!emailnotif)}
                  src={!emailnotif ? Off : On}
                  alt="Email notifications toggle"
                />
              </div>
            </div>
            <div className="alert_section bg-[#F7F7F8] rounded-[15px] px-4 py-3 flex justify-between items-center">
              <div>
                <h1 className="font-semibold text-[13px] w-full">
                  Alerts delivery
                </h1>
                <p className="text-[11px]">
                  Get notified when parcel is picked up
                </p>
              </div>
              <div>
                <img
                  className="cursor-pointer"
                  onClick={() => setDeliveryNotif(!deliverynotif)}
                  src={!deliverynotif ? Off : On}
                  alt="Delivery alerts toggle"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="auth_button mt-3 mb-3 !w-[200px]"
            onClick={updateProfile}
            disabled={loading}
          >
            <span>{loading ? "Processing..." : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
