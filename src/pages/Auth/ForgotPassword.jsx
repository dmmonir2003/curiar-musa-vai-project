/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Auth from "../../Layouts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import { FORGOT_PASSWORD } from "../../constants";
import toast from "react-hot-toast";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const {submitData} = useCreateOrEdit()


  const submitEmail = async(e) => {

    e.preventDefault();
    setLoading(true)
    try{
      const response =  await submitData(FORGOT_PASSWORD, {email: email}, "POST")
      localStorage.setItem("forgotPasswordEmail", email)
      toast.success(response?.data?.message)
      navigate("/otp");

    }catch(error){
      console.log(error)
      toast.error(error?.response?.data?.message)

    }finally{
      setLoading(false)
    }

  };
  return (
    <Auth heading={"Forget Password"}>
        <p className="light-color-text text-center text-[12px] mb-5 font-medium">Enter your email address below and we'll send you a <br /> OTP Code to reset your password.</p>
      <form method="post" onSubmit={submitEmail}>
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

        <div>
          <button disabled={loading} className="auth_button mt-3 mb-3">
            <span>{loading ? 'Sending Otp' : 'Send OTP Code'}</span>
          </button>

          <p className="text-center flex items-center gap-2 justify-center mb-0">
            <span>Don’t have an account?</span>
            <Link to="/signup">
              <span className="font-bold">Sign Up</span>
            </Link>
          </p>
        </div>
      </form>
    </Auth>
  );
};

export default ForgotPassword;
