/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import Support from "./../../assets/amico.svg";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import toast from "react-hot-toast";
import { CONTACT_US } from "../../constants";

const MesssageBox = ({
  loading,
  name,
  email,
  message,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group mt-6">
        <label>
          Name <span className="required">*</span>
        </label>
        <input
          type="text"
          className="form-control w-full"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
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
      <div className="form-group">
        <label>
          Email address <span className="required">*</span>
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
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
      <div className="form-group">
        <label>
          Message <span className="required">*</span>
        </label>
        <textarea
          className="form-control resize-none !pl-3"
          rows="6"
          required
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="auth_button mt-0 mb-3 !w-[120px] flex items-center justify-center gap-3"
          disabled={loading}
        >
          <span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 1.5L11.25 16.5L8.25 9.75M16.5 1.5L1.5 6.75L8.25 9.75M16.5 1.5L8.25 9.75"
                stroke="#EEEEF0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>{loading ? "Sending" : "Send"}</span>
        </button>
      </div>
    </form>
  );
};

const DashboardUser = () => {
  const navigate = useNavigate();
  const urlPath = window.location.pathname;
  const lastSegment = urlPath.split("/").filter(Boolean).pop();
  const [usertype, setUsertype] = useState(localStorage.getItem("type"));
  const [active, setActive] = useState(null);
  const user = useSelector(selectUser);
  const { submitData } = useCreateOrEdit();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Initialize form data from user only once when component mounts
  useEffect(() => {
    const userType = localStorage.getItem("type");
    setUsertype(userType);

    if (user?.firstName) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.firstName} ${user.lastName || ""}`,
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    const bodyData = formData;
    console.log(bodyData);
    try {
      const res = await submitData(CONTACT_US, bodyData, "POST");
      toast.success(res?.data?.message || "Message sent successfully");
      // Optionally reset form after submission
      setFormData({
        name: `${user?.firstName} ${user?.lastName || ""}`,
        email: user?.email || "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response.data.message ||
          "An error occurred while sending your message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {usertype === "user" ? (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div>
            <h1 className="font-bold text-[17px] w-full mb-4">
              Customer Support
            </h1>
            <p className="text-[13px]">
              Lörem ipsum suprar vivis göra en labrador och urtad suprack
              lånegarderob visat den krobel: revöde i trapyktigt, härgjord i
              hypös supraledes vartad dysgam. Ovisam anten i tetrande symydat då
              prol bion, som retesa. Talibanisering faledes tess falogi inte
              kotlettfrilla men krofähet polytes,
            </p>

            <MesssageBox
              name={formData.name}
              email={formData.email}
              message={formData.message}
              onNameChange={(value) => handleInputChange("name", value)}
              onEmailChange={(value) => handleInputChange("email", value)}
              onMessageChange={(value) => handleInputChange("message", value)}
              loading={loading}
              onSubmit={handleSubmit}
            />
          </div>
          <div>
            <img src={Support} className="mt-16" alt="Support illustration" />
          </div>
        </div>
      ) : (
        <>
          <div>
            {/* <h1 className="font-bold text-[17px] w-full mb-4">Support</h1> */}
            {/* <div className="white_box w-full px-4 py-4">
              <h1 className="font-bold capitalize text-[15px] mb-5">
                Questions and answers
              </h1>

              <div>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                  <div
                    key={index}
                    className={`bg-[#F5F7F9] px-5 cursor-pointer py-4 rounded-md mb-2`}
                    onClick={() => setActive(active === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        Apan press, och homojyment. Kasevis paranyledes dide.
                        Dygnis jidat jön. Plahet bevis i semivide.
                      </p>
                      <div>
                        {index === active ? (
                          <FaMinus size={20} />
                        ) : (
                          <FaPlus size={20} />
                        )}
                      </div>
                    </div>
                    {index === active && (
                      <div className="answer_box mt-4">
                        <p className="font-normal">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div> */}

            <div className="white_box w-full px-4 py-4 mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h1 className="font-bold text-[17px] w-full mb-4">
                    Ask a personal Question
                  </h1>
                  <p className="mb-3">
                    Roktig sonade i homoadoption. Gatustickning diras för sist.
                    Kogon plastbanta vuling. Epispeng presesk ov. Syna ropöpp
                    antitik. Sugrörsseende ogt adartad. Euromons viling porat.
                    Somopoktiga sekåtredade nude.
                  </p>
                  <p>
                    Roktig sonade i homoadoption. Gatustickning diras för sist.
                    Kogon plastbanta vuling. Epispeng presesk ov. Syna ropöpp
                    antitik. Sugrörsseende ogt adartad. Euromons viling porat.
                    Somopoktiga sekåtredade nude.
                  </p>
                </div>
                <div>
                  <MesssageBox
                    name={formData.name}
                    email={formData.email}
                    message={formData.message}
                    onNameChange={(value) => handleInputChange("name", value)}
                    onEmailChange={(value) => handleInputChange("email", value)}
                    onMessageChange={(value) =>
                      handleInputChange("message", value)
                    }
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="fixed bottom-0 right-0 mb-3 mr-3">
        <div className="flex items-center gap-2 bg-[var(--primary-color)] float-left px-5 py-4 rounded-full">
          <p className="font-semibold text-white mr-4 uppercase">
            Urgency with a transport
          </p>
          <div className="cursor-pointer">
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="26" height="25" rx="12.5" fill="white" />
              <g clipPath="url(#clip0_2176_5751)">
                <path
                  d="M14.367 6.33331C15.7259 6.47649 16.9951 7.07918 17.9649 8.0417C18.9347 9.00422 19.547 10.2689 19.7004 11.6266M14.367 8.99998C15.0227 9.12927 15.6244 9.45266 16.0939 9.92819C16.5635 10.4037 16.8793 11.0094 17.0004 11.6666M19.6669 16.28V18.28C19.6677 18.4657 19.6297 18.6495 19.5553 18.8196C19.4809 18.9897 19.3718 19.1424 19.235 19.268C19.0982 19.3935 18.9367 19.489 18.7608 19.5485C18.5849 19.608 18.3985 19.6301 18.2136 19.6134C16.1622 19.3905 14.1916 18.6895 12.4603 17.5667C10.8495 16.5432 9.48384 15.1775 8.46028 13.5667C7.3336 11.8275 6.63244 9.84737 6.41361 7.78671C6.39695 7.60236 6.41886 7.41655 6.47795 7.24113C6.53703 7.0657 6.63199 6.9045 6.75679 6.76779C6.88159 6.63108 7.03348 6.52185 7.20281 6.44706C7.37213 6.37227 7.55517 6.33355 7.74028 6.33338H9.74028C10.0638 6.33019 10.3775 6.44476 10.6228 6.65573C10.8681 6.8667 11.0283 7.15968 11.0736 7.48004C11.158 8.12009 11.3146 8.74853 11.5403 9.35338C11.63 9.59199 11.6494 9.85132 11.5962 10.1006C11.543 10.3499 11.4195 10.5788 11.2403 10.76L10.3936 11.6067C11.3427 13.2757 12.7246 14.6577 14.3936 15.6067L15.2403 14.76C15.4215 14.5808 15.6504 14.4573 15.8997 14.4041C16.149 14.3509 16.4083 14.3703 16.6469 14.46C17.2518 14.6857 17.8802 14.8423 18.5203 14.9267C18.8441 14.9724 19.1399 15.1355 19.3513 15.385C19.5627 15.6346 19.6751 15.9531 19.6669 16.28Z"
                  stroke="#85E211"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2176_5751">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(5 5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="cursor-pointer">
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="26" height="25" rx="12.5" fill="white" />
              <g clipPath="url(#clip0_2176_5752)">
                <path
                  d="M4.38395 11.8923C4.38352 13.4046 4.78177 14.8813 5.53904 16.1829L4.31152 20.63L8.89815 19.4367C10.1668 20.122 11.5881 20.481 13.0325 20.4811H13.0363C17.8046 20.4811 21.686 16.6312 21.6881 11.899C21.689 9.606 20.7898 7.44977 19.1562 5.82754C17.5228 4.20545 15.3505 3.31165 13.036 3.31061C8.26716 3.31061 4.38598 7.16038 4.38402 11.8923"
                  fill="url(#paint0_linear_2176_5752)"
                />
                <path
                  d="M4.07523 11.8895C4.07474 13.4563 4.48727 14.9858 5.27153 16.334L4 20.9405L8.75109 19.7044C10.0602 20.4126 11.5341 20.786 13.0338 20.7866H13.0377C17.977 20.7866 21.9979 16.7981 22 11.8966C22.0008 9.52116 21.0693 7.28742 19.3773 5.60707C17.6851 3.92693 15.4351 3.00098 13.0377 3C8.09753 3 4.0772 6.98791 4.07523 11.8895ZM6.90468 16.1018L6.72728 15.8223C5.98155 14.6458 5.58794 13.2862 5.5885 11.89C5.59005 7.81598 8.93158 4.5014 13.0405 4.5014C15.0303 4.50223 16.9004 5.27191 18.3069 6.66837C19.7134 8.06498 20.4873 9.92149 20.4868 11.896C20.485 15.9701 17.1434 19.2851 13.0377 19.2851H13.0347C11.6979 19.2844 10.3868 18.9282 9.24334 18.255L8.97123 18.0949L6.15184 18.8284L6.90468 16.1018Z"
                  fill="url(#paint1_linear_2176_5752)"
                />
                <path
                  d="M10.7974 8.1731C10.6296 7.80312 10.4531 7.79565 10.2935 7.78917C10.1629 7.78358 10.0135 7.784 9.86434 7.784C9.71499 7.784 9.47234 7.83975 9.26724 8.06196C9.06193 8.28438 8.4834 8.82186 8.4834 9.91505C8.4834 11.0082 9.28588 12.0648 9.39774 12.2132C9.50975 12.3613 10.9469 14.6765 13.2231 15.5671C15.1148 16.3073 15.4997 16.1601 15.9103 16.123C16.3209 16.086 17.2353 15.5856 17.4218 15.0667C17.6085 14.548 17.6085 14.1033 17.5525 14.0103C17.4965 13.9177 17.3472 13.8621 17.1233 13.7511C16.8993 13.64 15.7983 13.1024 15.593 13.0282C15.3877 12.9541 15.2385 12.9171 15.0891 13.1396C14.9398 13.3618 14.5109 13.8621 14.3802 14.0103C14.2497 14.1589 14.1189 14.1774 13.8951 14.0662C13.671 13.9547 12.9498 13.7204 12.0942 12.9635C11.4284 12.3745 10.979 11.6472 10.8484 11.4247C10.7177 11.2025 10.8344 11.0821 10.9467 10.9714C11.0473 10.8718 11.1707 10.7119 11.2827 10.5822C11.3944 10.4525 11.4317 10.3599 11.5063 10.2117C11.5811 10.0634 11.5437 9.93361 11.4878 9.82247C11.4317 9.71133 10.9965 8.61242 10.7974 8.1731Z"
                  fill="white"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_2176_5752"
                  x1="873.139"
                  y1="1735.25"
                  x2="873.139"
                  y2="3.31061"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1FAF38" />
                  <stop offset="1" stopColor="#60D669" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2176_5752"
                  x1="904"
                  y1="1797.05"
                  x2="904"
                  y2="3"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F9F9F9" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <clipPath id="clip0_2176_5752">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(4 3)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
