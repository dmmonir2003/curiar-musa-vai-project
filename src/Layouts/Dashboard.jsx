/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LOGO from "../assets/logo.svg";
import SMALLLOGO from "../assets/smalllogo.png";
import { FaUserLock } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../store/userSlice";
import NotificationDropdown from "../Components/NotificationsDropdown";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const urlPath = window.location.pathname;
  const lastSegment = urlPath.split("/").filter(Boolean).pop();
  const [usertype, setUsertype] = useState(localStorage.getItem("type"));
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("type");
    setUsertype(userType);
    // const updateData
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const today = new Date();

  // Format the date using toLocaleDateString
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleLogout = () => {
    // localStorage.clear();
    dispatch(clearUser());
    // localStorage.clear();
    Object.keys(localStorage).forEach((key) => {
      if (key !== "messages") {
        localStorage.removeItem(key);
      }
    });
    navigate("/");
  };

  const handleAddNewRequest = () => {
    const isEdit = localStorage.getItem("isEditing");
    const id = localStorage.getItem("_id");
    if (isEdit && id) {
      Object.keys(localStorage).forEach((key) => {
        if (key !== "type" && key !== "persist:root" && key !== "messages") {
          localStorage.removeItem(key);
        }
      });
    }

    navigate("/request/form/step/1");
  };

  return (
    <div className="flex justify-between items-start gap-0">
      {/* LEFT NAVBAR */}
      <div
        ref={sidebarRef}
        className={`md:h-screen h-screen overflow-auto fixed left-0 bg-white w-[280px] md:w-[280px] z-50 px-4 md:px-6 py-7 rounded-r-lg flex flex-col justify-between transition-transform duration-1000 ${
          isOpen
            ? "-translate-x-0 md:translate-x-full z-20"
            : "-translate-x-[290px] z-10 md:translate-x-0"
        }`}
      >
        <div className="flex justify-center flex-col items-center w-full ">
          <div className="border-b border-b-[#EBEBEB] pb-6 mb-8 w-full flex justify-center">
            <img src={LOGO} alt="Logo" className="h-14 " />
          </div>
          {usertype == "user" ? (
            <div className="nav_link flex flex-col gap-3 items-center w-full">
              <Link
                to="/dashboard"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "dashboard" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1H2C1.44772 1 1 1.44772 1 2V9C1 9.55229 1.44772 10 2 10H7C7.55228 10 8 9.55229 8 9V2C8 1.44772 7.55228 1 7 1Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 1H13C12.4477 1 12 1.44772 12 2V5C12 5.55228 12.4477 6 13 6H18C18.5523 6 19 5.55228 19 5V2C19 1.44772 18.5523 1 18 1Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 10H13C12.4477 10 12 10.4477 12 11V18C12 18.5523 12.4477 19 13 19H18C18.5523 19 19 18.5523 19 18V11C19 10.4477 18.5523 10 18 10Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 14H2C1.44772 14 1 14.4477 1 15V18C1 18.5523 1.44772 19 2 19H7C7.55228 19 8 18.5523 8 18V15C8 14.4477 7.55228 14 7 14Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/my-requests"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "my-requests" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 7H9C8.46957 7 7.96086 7.21071 7.58579 7.58579C7.21071 7.96086 7 8.46957 7 9C7 9.53043 7.21071 10.0391 7.58579 10.4142C7.96086 10.7893 8.46957 11 9 11H13C13.5304 11 14.0391 11.2107 14.4142 11.5858C14.7893 11.9609 15 12.4696 15 13C15 13.5304 14.7893 14.0391 14.4142 14.4142C14.0391 14.7893 13.5304 15 13 15H7M11 17V5M2.84995 7.6201C2.70399 6.96262 2.7264 6.27894 2.91511 5.63244C3.10381 4.98593 3.4527 4.39754 3.92942 3.92182C4.40614 3.4461 4.99526 3.09844 5.64216 2.91109C6.28905 2.72374 6.97278 2.70276 7.62995 2.8501C7.99166 2.2844 8.48995 1.81886 9.0789 1.49638C9.66785 1.17391 10.3285 1.00488 10.9999 1.00488C11.6714 1.00488 12.332 1.17391 12.921 1.49638C13.5099 1.81886 14.0082 2.2844 14.3699 2.8501C15.0281 2.70212 15.713 2.72301 16.3609 2.91081C17.0089 3.09862 17.5988 3.44724 18.0758 3.92425C18.5528 4.40126 18.9014 4.99117 19.0892 5.6391C19.277 6.28703 19.2979 6.97193 19.1499 7.6301C19.7156 7.99181 20.1812 8.4901 20.5037 9.07905C20.8261 9.668 20.9952 10.3286 20.9952 11.0001C20.9952 11.6715 20.8261 12.3322 20.5037 12.9211C20.1812 13.5101 19.7156 14.0084 19.1499 14.3701C19.2973 15.0273 19.2763 15.711 19.089 16.3579C18.9016 17.0048 18.554 17.5939 18.0782 18.0706C17.6025 18.5473 17.0141 18.8962 16.3676 19.0849C15.7211 19.2736 15.0374 19.2961 14.3799 19.1501C14.0187 19.718 13.52 20.1855 12.9301 20.5094C12.3401 20.8333 11.678 21.0032 11.0049 21.0032C10.3319 21.0032 9.66978 20.8333 9.07982 20.5094C8.48987 20.1855 7.99119 19.718 7.62995 19.1501C6.97278 19.2974 6.28905 19.2765 5.64216 19.0891C4.99526 18.9018 4.40614 18.5541 3.92942 18.0784C3.4527 17.6027 3.10381 17.0143 2.91511 16.3678C2.7264 15.7213 2.70399 15.0376 2.84995 14.3801C2.27991 14.0193 1.81036 13.5203 1.485 12.9293C1.15963 12.3384 0.989014 11.6747 0.989014 11.0001C0.989014 10.3255 1.15963 9.66184 1.485 9.07088C1.81036 8.47992 2.27991 7.98085 2.84995 7.6201Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My Requests</span>
              </Link>
              <div
                onClick={handleAddNewRequest}
                className={`flex gap-4 items-center cursor-pointer p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "new-request" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 8H15M8 1V15"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Add New Request</span>
              </div>
              <Link
                to="/update-profile"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "update-profile" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 19C17 17.4087 16.3679 15.8826 15.2426 14.7574C14.1174 13.6321 12.5913 13 11 13M11 13C9.4087 13 7.88258 13.6321 6.75736 14.7574C5.63214 15.8826 5 17.4087 5 19M11 13C13.2091 13 15 11.2091 15 9C15 6.79086 13.2091 5 11 5C8.79086 5 7 6.79086 7 9C7 11.2091 8.79086 13 11 13ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Update Profile</span>
              </Link>
              <Link
                to="/chat"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "chat" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.9 18C8.80858 18.9791 11.0041 19.2443 13.0909 18.7478C15.1777 18.2514 17.0186 17.0259 18.2818 15.2922C19.545 13.5586 20.1474 11.4308 19.9806 9.29221C19.8137 7.15366 18.8886 5.14502 17.3718 3.62824C15.855 2.11146 13.8464 1.1863 11.7078 1.01946C9.56929 0.852628 7.44147 1.45509 5.70782 2.71829C3.97417 3.98149 2.74869 5.82236 2.25222 7.90916C1.75575 9.99596 2.02094 12.1915 3 14.1L1 20L6.9 18Z"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Chat</span>
              </Link>
              <Link
                to="/customer-support"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "customer-support" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 19.0002C1.00012 17.7412 1.29739 16.5 1.86766 15.3775C2.43792 14.255 3.26506 13.283 4.28182 12.5404C5.29858 11.7979 6.47624 11.3058 7.71904 11.1042C8.96183 10.9026 10.2347 10.9972 11.434 11.3802M18.5001 12.2998L18.1001 13.1998M15.9 18.7998L15.5 19.6998M20.6998 17.5001L19.7998 17.1001M14.1998 14.9L13.2998 14.5M20.6998 14.5L19.7998 14.9M14.1998 17.1001L13.2998 17.5001M18.5001 19.6998L18.1001 18.7998M15.9 13.1998L15.5 12.2998M14 6C14 8.76142 11.7614 11 9 11C6.23858 11 4 8.76142 4 6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6ZM20 16C20 17.6569 18.6569 19 17 19C15.3431 19 14 17.6569 14 16C14 14.3431 15.3431 13 17 13C18.6569 13 20 14.3431 20 16Z"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Customer Support</span>
              </Link>
            </div>
          ) : (
            <div className="nav_link flex flex-col gap-3 items-center w-full">
              {/* <Link
                to="/dashboard"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "dashboard" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1H2C1.44772 1 1 1.44772 1 2V9C1 9.55229 1.44772 10 2 10H7C7.55228 10 8 9.55229 8 9V2C8 1.44772 7.55228 1 7 1Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 1H13C12.4477 1 12 1.44772 12 2V5C12 5.55228 12.4477 6 13 6H18C18.5523 6 19 5.55228 19 5V2C19 1.44772 18.5523 1 18 1Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 10H13C12.4477 10 12 10.4477 12 11V18C12 18.5523 12.4477 19 13 19H18C18.5523 19 19 18.5523 19 18V11C19 10.4477 18.5523 10 18 10Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 14H2C1.44772 14 1 14.4477 1 15V18C1 18.5523 1.44772 19 2 19H7C7.55228 19 8 18.5523 8 18V15C8 14.4477 7.55228 14 7 14Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Dashboard</span>
              </Link> */}
              <Link
                to="/jobs"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "jobs" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 19.0002L14.7 14.7002M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>New jobs</span>
              </Link>
              <Link
                to="/my-shipments"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "my-shipments" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 15V3C13 2.46957 12.7893 1.96086 12.4142 1.58579C12.0391 1.21071 11.5304 1 11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V14C1 14.2652 1.10536 14.5196 1.29289 14.7071C1.48043 14.8946 1.73478 15 2 15H4M4 15C4 16.1046 4.89543 17 6 17C7.10457 17 8 16.1046 8 15M4 15C4 13.8954 4.89543 13 6 13C7.10457 13 8 13.8954 8 15M14 15H8M14 15C14 16.1046 14.8954 17 16 17C17.1046 17 18 16.1046 18 15M14 15C14 13.8954 14.8954 13 16 13C17.1046 13 18 13.8954 18 15M18 15H20C20.2652 15 20.5196 14.8946 20.7071 14.7071C20.8946 14.5196 21 14.2652 21 14V10.35C20.9996 10.1231 20.922 9.90301 20.78 9.726L17.3 5.376C17.2065 5.25888 17.0878 5.16428 16.9528 5.0992C16.8178 5.03412 16.6699 5.00021 16.52 5H13"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My Shipments</span>
              </Link>
              <Link
                to="/daily-routes"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "daily-routes" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.835 13H4C3.79653 13.0111 3.60131 13.0841 3.44046 13.2092C3.27962 13.3343 3.16083 13.5055 3.1 13.7L1.1 19.7C1 19.8 1 19.9 1 20C1 20.6 1.4 21 2 21H20C20.6 21 21 20.6 21 20C21 19.9 21 19.8 20.9 19.7L18.9 13.7C18.8392 13.5055 18.7204 13.3343 18.5595 13.2092C18.3987 13.0841 18.2035 13.0111 18 13H14.165M17 7C17 11.5 11 16 11 16C11 16 5 11.5 5 7C5 5.4087 5.63214 3.88258 6.75736 2.75736C7.88258 1.63214 9.4087 1 11 1C12.5913 1 14.1174 1.63214 15.2426 2.75736C16.3679 3.88258 17 5.4087 17 7ZM13 7C13 8.10457 12.1046 9 11 9C9.89543 9 9 8.10457 9 7C9 5.89543 9.89543 5 11 5C12.1046 5 13 5.89543 13 7Z"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Daily Routes</span>
              </Link>
              <Link
                to="/chat"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "chat" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.9 18C8.80858 18.9791 11.0041 19.2443 13.0909 18.7478C15.1777 18.2514 17.0186 17.0259 18.2818 15.2922C19.545 13.5586 20.1474 11.4308 19.9806 9.29221C19.8137 7.15366 18.8886 5.14502 17.3718 3.62824C15.855 2.11146 13.8464 1.1863 11.7078 1.01946C9.56929 0.852628 7.44147 1.45509 5.70782 2.71829C3.97417 3.98149 2.74869 5.82236 2.25222 7.90916C1.75575 9.99596 2.02094 12.1915 3 14.1L1 20L6.9 18Z"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Chat</span>
              </Link>
              <Link
                to="/customer-support"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "customer-support" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 19.0002C1.00012 17.7412 1.29739 16.5 1.86766 15.3775C2.43792 14.255 3.26506 13.283 4.28182 12.5404C5.29858 11.7979 6.47624 11.3058 7.71904 11.1042C8.96183 10.9026 10.2347 10.9972 11.434 11.3802M18.5001 12.2998L18.1001 13.1998M15.9 18.7998L15.5 19.6998M20.6998 17.5001L19.7998 17.1001M14.1998 14.9L13.2998 14.5M20.6998 14.5L19.7998 14.9M14.1998 17.1001L13.2998 17.5001M18.5001 19.6998L18.1001 18.7998M15.9 13.1998L15.5 12.2998M14 6C14 8.76142 11.7614 11 9 11C6.23858 11 4 8.76142 4 6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6ZM20 16C20 17.6569 18.6569 19 17 19C15.3431 19 14 17.6569 14 16C14 14.3431 15.3431 13 17 13C18.6569 13 20 14.3431 20 16Z"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Customer Support</span>
              </Link>
              <Link
                to="/more"
                className={`flex gap-4 items-center p-4 px-6 bg-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white ${
                  lastSegment == "more" ? "active_menu" : ""
                }`}
              >
                <span>
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1H19M5 7H15M8 13H12"
                      stroke="#010101"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>More</span>
              </Link>
            </div>
          )}
        </div>
        <div className="nav_link flex flex-col gap-4 items-center w-full">
          <div className="border-b border-t border-t-[#EBEBEB] pt-4 border-b-[#EBEBEB] pb-4 w-full">
            <Link
              to="/update-profile"
              className={`flex gap-4 items-center p-4 px-6 bg-[var(--primary-color)] text-white w-full rounded-full hover:bg-[var(--primary-color)] hover:text-white`}
            >
              <span>
                <img
                  src={user?.profileImage || SMALLLOGO}
                  className="w-[32px] h-[32px] rounded-full object-cover"
                />
              </span>
              <span className="uppercase truncate max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {user?.firstName + " " + user?.lastName}
              </span>
            </Link>
          </div>
          <div
            // to="/"
            onClick={handleLogout}
            className={`flex gap-4 items-center p-4 px-6 bg-red-500 text-white w-full rounded-full uppercase hover:bg-red-300 hover:cursor-pointer`}
          >
            <span>
              <FaUserLock size={20} />
            </span>
            <span>Logout</span>
          </div>
        </div>
      </div>

      <div className="border-0 w-[95%] md:w-[79%] border-red-800 mx-auto mt-4 mb-[50px] md:ml-[300px] ">
        <div className="header_top flex justify-between items-center py-5  sticky top-0 z-10">
          <h1 className="font-bold text-[17px] truncate md:truncate-none capitalize">
            Welcome {user?.firstName} {user?.lastName} ({usertype})
          </h1>
          <div className="flex items-center gap-3">
            {/* <div className="rounded-full p-2 px-4 bg-white text-xs flex items-center gap-3 shadow-sm cursor-pointer">
              <span>Notifications</span>
              <span>
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.55 11.175C14.15 12.3 14.75 12.75 14.75 12.75H1.25C1.25 12.75 3.5 11.25 3.5 6C3.5 3.525 5.525 1.5 8 1.5C8.525 1.5 8.975 1.575 9.425 1.725M6.72504 15.75C6.85057 15.9783 7.03512 16.1688 7.2594 16.3014C7.48369 16.434 7.73947 16.504 8.00004 16.504C8.2606 16.504 8.51639 16.434 8.74067 16.3014C8.96495 16.1688 9.1495 15.9783 9.27504 15.75M14.75 6C14.75 7.24264 13.7426 8.25 12.5 8.25C11.2574 8.25 10.25 7.24264 10.25 6C10.25 4.75736 11.2574 3.75 12.5 3.75C13.7426 3.75 14.75 4.75736 14.75 6Z"
                    stroke="#85E211"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div> */}
            <NotificationDropdown />
            <div className="rounded-full p-2 px-4 bg-white text-xs shadow-sm cursor-pointer md:block hidden">
              {formattedDate}
            </div>
            <div className="md:hidden block">
              {isOpen ? (
                <IoClose size={30} onClick={() => setIsOpen(false)} />
              ) : (
                <HiMenuAlt1 size={30} onClick={() => setIsOpen(true)} />
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
