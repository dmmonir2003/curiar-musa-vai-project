import React, { useState } from "react";
import Auth from "../../Layouts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import toast from "react-hot-toast";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import { VERIFY_OTP } from "../../constants";


const OTPCode = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const {submitData} = useCreateOrEdit()
    const [loading, setLoading] = useState(false);
  


  const verifyOtp = async(e) => {
      e.preventDefault();
      const email = localStorage.getItem("forgotPasswordEmail")
      setLoading(true)
      try{
        const response =  await submitData(VERIFY_OTP, {otp,email}, "POST")
        toast.success(response?.data?.message)
        navigate("/reset-password");
  
      }catch(error){
        console.log(error)
        toast.error(error?.response?.data?.message)
  
      }finally{
        setLoading(false)
      }
  
    };

  return (
    <Auth heading={"OTP Code"}>
        <p className="light-color-text text-center text-[12px] mb-5 font-medium">Enter the OTP Code you received on your email.</p>
      <form method="post" onSubmit={verifyOtp}>
        <div className="form-group">
          <label>
            OTP Code <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your OTP code"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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
            <span>{loading ? "Verifying Otp ": 'Verify Otp'}</span>
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

export default OTPCode;
