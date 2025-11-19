import React, { useState } from "react";
import Auth from "../../Layouts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import toast from "react-hot-toast";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import { RESET_PASSWORD } from "../../constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showpassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  
  const {submitData} = useCreateOrEdit()


   const handleResetPassword = async(e) => {
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password do not match")
      return
    }
        e.preventDefault();
        const email = localStorage.getItem("forgotPasswordEmail")
        setLoading(true)
        try{
          const response =  await submitData(RESET_PASSWORD, {email, password,confirmPassword}, "POST")
          toast.success(response?.data?.message)
          navigate("/");
    
        }catch(error){
          console.log(error)
          toast.error(error?.response?.data?.message)
    
        }finally{
          setLoading(false)
        }
    
      };

  return (
    <Auth heading={"Forget Password"}>
      <p className="light-color-text text-center text-[12px] mb-5 font-medium">
        Enter Your new Password
      </p>
      <form method="post" onSubmit={handleResetPassword}>
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input
            type={`${showpassword ? "text" : "password"}`}
            className="form-control"
            placeholder="Create a strong password"
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
        <div className="form-group">
            <label>Confirm Password <span className="required">*</span></label>
          <input
            type={`${showpassword ? "text" : "password"}`}
            className="form-control"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="icon_password "
            onClick={() => setShowPassword(!showpassword)}
          >
            {showpassword ? (
              <PiEyeSlash size={18} color="#92939E" />
            ) : (
              <PiEye size={18} color="#92939E" />
            )}
          </div>
        </div>
        <div className="text-[#5E5E6B] my-1 text-[11px]">
          Password must be at least 6 characters long.
        </div>

        <div>
          <button disabled={loading} className="auth_button mt-3 mb-3">
            <span>{loading ? "Processing" : 'Reset Password'}</span>
          </button>

         
        </div>
      </form>
    </Auth>
  );
};

export default ResetPassword;
