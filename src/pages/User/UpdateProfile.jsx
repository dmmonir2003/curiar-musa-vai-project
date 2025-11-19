import React, { useState, useRef } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import UserImage from "./../../assets/user_image.jpg";
import On from "./../../assets/on.svg";
import Off from "./../../assets/off.svg";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeadphonesAlt } from "react-icons/fa";
import ProfileGreen from "../../Components/ProfileGreen";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectUser, selectUserType, setUser } from "../../store/userSlice";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import toast from "react-hot-toast";
import { MAPS_API_KEY, UPDATE_PROFILE } from "../../constants";
import httpRequset from '../../axios/index'
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const DashboardUser = () => {
  const [emailnotif, setEmailNotif] = useState(false);
  const [deliverynotif, setDeliveryNotif] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {},
    profileImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const { submitData } = useCreateOrEdit();
  const userType = useSelector(selectUserType)
  console.log('userType', user)

    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: MAPS_API_KEY,
      libraries: ["places"],
    });

  const inputRef = useRef(null);

const handlePlaceChanged = () => {
 const [place] = inputRef.current.getPlaces();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setFormData(prev => ({
      ...prev,
      address:{ address: place.formatted_address , lat , lng},
      
}));
}
  // Initialize form data with user data
 React.useEffect(() => {
  if (user) {
    const initialAddress = user.address || user.companyLocation || {};
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: {
        address: initialAddress.address || "",
        lat: initialAddress.lat || null,
        lng: initialAddress.lng || null
      },
      profileImage: user.profileImage || null,
    });
    setEmailNotif(user.emailNotifications || false);
    setDeliveryNotif(user.alertsDelivery || true);
    setImagePreview(user.profileImage || null);
  }
}, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is the base64 string
        setImagePreview(base64String);
        setFormData(prev => ({
          ...prev,
          profileImage: base64String // Store base64 string instead of File
        }));
      };
      reader.readAsDataURL(file); // This converts to base64
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      // Append all fields to formData
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      // formDataToSend.append('address', formData.address);
       // Append address components separately
    if (formData.address) {
      formDataToSend.append('address[address]', formData.address.address || '');
      formDataToSend.append('address[lat]', formData.address.lat || '');
      formDataToSend.append('address[lng]', formData.address.lng || '');
    }
      formDataToSend.append('emailNotifications', emailnotif);
      formDataToSend.append('alertsDelivery', deliverynotif);
      formDataToSend.append('token', accessToken);
      formDataToSend.append('profileImage', formData.profileImage); // Append the base64 string
      
      

      // console.log(formData)

      const response = await httpRequset.put(
        UPDATE_PROFILE, 
        formDataToSend, 
        "PUT",
        {
          headers: {
            // Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      dispatch(setUser({ user: response.data.user,userType:userType, accessToken }));
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
  value={formData?.address?.address || ""}
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
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
            <span>{loading ?  "Processing..." : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;