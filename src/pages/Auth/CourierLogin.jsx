// import React, { useState } from "react";
// import Auth from "../../Layouts/Auth";
// import { Link, useNavigate } from "react-router-dom";
// import { PiEye, PiEyeSlash } from "react-icons/pi";
// import useCreateOrEdit from "../../hooks/useCreateOrEdit";
// import toast from "react-hot-toast";
// import { GET_ME, LOGIN_COURIER, LOGIN_USER } from "../../constants";
// import { useDispatch } from "react-redux";
// import { clearUser, setUser } from "../../store/userSlice";
// import useFetch from "../../hooks/useFetch";

// const CourierLogin = () => {
//   const navigate = useNavigate();
//   const [showpassword, setShowPassword] = useState(false);
//   const { submitData } = useCreateOrEdit();
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const fetchData = useFetch();
//   const dispatch = useDispatch();
//   // const urlPath = window.location.pathname;
//   const lastSegment = window.location.pathname.split("/").filter(Boolean).pop();

//   const doLogin = async (e) => {
//     dispatch(clearUser());

//     e.preventDefault();

//     setLoading(true);
//     try {
//       const response = await submitData(
//         LOGIN_COURIER,
//         { email, password },
//         "POST"
//       );
//       console.log(response.data.data);
//       toast.success(response?.data?.message);

//       localStorage.setItem("type", lastSegment);

//       const meResponse = await fetchData(GET_ME, {
//         method: "GET",
//         headers: {
//           Authorization: ` ${response.data.data.accessToken}`,
//         },
//       });

//       console.log("User Data fetched:", meResponse.data);

//       // --- Step 3: Save the FETCHED user data to Redux ---
//       dispatch(
//         setUser({
//           // Use the data from meResponse, not loginResponse
//           user: meResponse.data.data || meResponse.data, // Check your API structure (usually .data or .data.data)
//           userType: "courier",
//           accessToken: response.data.data.accessToken,
//         })
//       );

//       // dispatch(
//       //   setUser({
//       //     user: response.data.courier,
//       //     userType: "courier",
//       //     accessToken: response.data.data.accessToken,
//       //   })
//       // );
//       const redirect = JSON.parse(localStorage.getItem("redirect")) || "/jobs";
//       navigate(redirect);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Auth heading={"Log In"}>
//       <form method="post" onSubmit={doLogin}>
//         <div className="form-group mt-4">
//           <label>
//             Email address <span className="required">*</span>
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter your email address"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <div className="icon_input">
//             <svg
//               width="18"
//               height="15"
//               viewBox="0 0 18 15"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M16.5 3.75L9.7725 8.025C9.54095 8.17007 9.27324 8.24701 9 8.24701C8.72676 8.24701 8.45905 8.17007 8.2275 8.025L1.5 3.75M3 1.5H15C15.8284 1.5 16.5 2.17157 16.5 3V12C16.5 12.8284 15.8284 13.5 15 13.5H3C2.17157 13.5 1.5 12.8284 1.5 12V3C1.5 2.17157 2.17157 1.5 3 1.5Z"
//                 stroke="#92939E"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>
//         <div className="form-group">
//           <label>
//             Password <span className="required">*</span>
//           </label>
//           <input
//             type={`${showpassword ? "text" : "password"}`}
//             className="form-control"
//             placeholder="Enter your password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="icon_input">
//             <svg
//               width="16"
//               height="17"
//               viewBox="0 0 16 17"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M4.25 7.75V4.75C4.25 3.75544 4.64509 2.80161 5.34835 2.09835C6.05161 1.39509 7.00544 1 8 1C8.99456 1 9.94839 1.39509 10.6517 2.09835C11.3549 2.80161 11.75 3.75544 11.75 4.75V7.75M2.75 7.75H13.25C14.0784 7.75 14.75 8.42157 14.75 9.25V14.5C14.75 15.3284 14.0784 16 13.25 16H2.75C1.92157 16 1.25 15.3284 1.25 14.5V9.25C1.25 8.42157 1.92157 7.75 2.75 7.75Z"
//                 stroke="#92939E"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <div
//             className="icon_password"
//             onClick={() => setShowPassword(!showpassword)}
//           >
//             {showpassword ? (
//               <PiEyeSlash size={18} color="#92939E" />
//             ) : (
//               <PiEye size={18} color="#92939E" />
//             )}
//           </div>
//         </div>
//         <Link
//           to="/forgot-password"
//           className="text-[#1D1D20] font-medium my-1 hover:underline"
//         >
//           Forgot Password?
//         </Link>

//         <div>
//           <button disabled={loading} className="auth_button mt-3 mb-3">
//             <span>{loading ? "Processing..." : "Log In"}</span>
//           </button>

//           <p className="text-center flex items-center gap-2 justify-center mb-0">
//             <span>Don’t have an account?</span>
//             <Link to="/courier-signup">
//               <span className="font-bold">Sign Up</span>
//             </Link>
//           </p>
//         </div>
//       </form>
//     </Auth>
//   );
// };

// export default CourierLogin;

import React, { useState } from "react";
import Auth from "../../Layouts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import toast from "react-hot-toast";
// 1. Import axios and API_BASE_URL
import axios from "axios";
import { GET_ME, LOGIN_COURIER, API_BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../store/userSlice";

const CourierLogin = () => {
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const { submitData } = useCreateOrEdit();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const fetchData = useFetch(); // Remove this, cannot use hook inside function
  const dispatch = useDispatch();
  const lastSegment = window.location.pathname.split("/").filter(Boolean).pop();

  const doLogin = async (e) => {
    dispatch(clearUser());
    e.preventDefault();
    setLoading(true);

    try {
      // --- Step 1: Login ---
      const response = await submitData(
        LOGIN_COURIER,
        { email, password },
        "POST"
      );

      console.log("Login Response:", response.data.data);
      toast.success(response?.data?.message);

      localStorage.setItem("type", lastSegment);

      const token = response.data.data.accessToken;

      // --- Step 2: Fetch User Data (Using Axios directly) ---
      // We construct the full URL: API_BASE_URL + GET_ME
      const meResponse = await axios.get(`${API_BASE_URL}${GET_ME}`, {
        headers: {
          // FIX: Added 'Bearer ' before the token
          Authorization: `${token}`,
        },
      });

      console.log("User Data fetched:", meResponse.data);

      // --- Step 3: Save the FETCHED user data to Redux ---
      dispatch(
        setUser({
          // Use data from the 'meResponse', but keep the token from 'response'
          user: meResponse.data.data || meResponse.data,
          userType: "courier",
          accessToken: token,
        })
      );

      const redirect = JSON.parse(localStorage.getItem("redirect")) || "/jobs";
      navigate(redirect);
    } catch (error) {
      console.log(error);
      // Handle specific error messages
      const msg =
        error?.response?.data?.message || "Login or Data Fetch Failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth heading={"Log In"}>
      <form method="post" onSubmit={doLogin}>
        <div className="form-group mt-4">
          <label>
            Email address <span className="required">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Password <span className="required">*</span>
          </label>
          <input
            type={`${showpassword ? "text" : "password"}`}
            className="form-control"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="icon_input">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.25 7.75V4.75C4.25 3.75544 4.64509 2.80161 5.34835 2.09835C6.05161 1.39509 7.00544 1 8 1C8.99456 1 9.94839 1.39509 10.6517 2.09835C11.3549 2.80161 11.75 3.75544 11.75 4.75V7.75M2.75 7.75H13.25C14.0784 7.75 14.75 8.42157 14.75 9.25V14.5C14.75 15.3284 14.0784 16 13.25 16H2.75C1.92157 16 1.25 15.3284 1.25 14.5V9.25C1.25 8.42157 1.92157 7.75 2.75 7.75Z"
                stroke="#92939E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="icon_password"
            onClick={() => setShowPassword(!showpassword)}
          >
            {showpassword ? (
              <PiEyeSlash size={18} color="#92939E" />
            ) : (
              <PiEye size={18} color="#92939E" />
            )}
          </div>
        </div>
        <Link
          to="/forgot-password"
          className="text-[#1D1D20] font-medium my-1 hover:underline"
        >
          Forgot Password?
        </Link>

        <div>
          <button disabled={loading} className="auth_button mt-3 mb-3">
            <span>{loading ? "Processing..." : "Log In"}</span>
          </button>

          <p className="text-center flex items-center gap-2 justify-center mb-0">
            <span>Don’t have an account?</span>
            <Link to="/courier-signup">
              <span className="font-bold">Sign Up</span>
            </Link>
          </p>
        </div>
      </form>
    </Auth>
  );
};

export default CourierLogin;
