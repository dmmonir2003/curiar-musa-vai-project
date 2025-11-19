import React, { useState } from "react";
import Auth from "../../Layouts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import { REGISTER_USER } from "../../constants";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  VinNumber: Yup.number().when("role", (role, schema) => {
    return role === "businessUser"
      ? schema.required("VIN Number is required")
      : schema;
  }),
  role: Yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const {submitData} = useCreateOrEdit()

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      VinNumber: "",
      role: "user",
      userType: 0
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const payload = {
          ...values,
          // Add these required fields from your user model
          // address: "placeholder", // You need to add these fields to your form
          // phoneNumber: 0,        // You need to add these fields to your form
        };
        console.log("Form Values:", payload);

        const response = await submitData(REGISTER_USER, payload , "POST");
        // console.log("Response:", response.data);
        toast.success(response.data.message || "Registration successful!");
        // console.log("Registration Successful:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Registration failed!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Auth heading={"Create Account"}>
      <div className="flex justify-center items-center gap-3 mb-4 mt-4">
        <button
          type="button"
          onClick={() => {
            setTab(1);
            formik.setFieldValue("userType", 1);
          }}
          className={`auth_button !w-[110px] !h-[40px] !font-normal !text-[12px] !shadow-lg ${
            tab === 2 ? "!bg-white !text-black" : ""
          }`}
        >
          Normal User
        </button>
        <button
          type="button"
          onClick={() => {
            setTab(2);
            formik.setFieldValue("userType", 2);
          }}
          className={`auth_button !w-[110px] !h-[40px] ${
            tab === 1 ? "!bg-white !text-black" : ""
          } !font-normal !text-[12px] !shadow-lg`}
        >
          Business User
        </button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <div className="form-group">
            <label>
              First name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              className={`form-control w-full ${
                formik.touched.firstName && formik.errors.firstName
                  ? "error"
                  : ""
              }`}
              placeholder="Enter first name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
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
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.firstName}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              Last name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              className={`form-control w-full ${
                formik.touched.lastName && formik.errors.lastName ? "error" : ""
              }`}
              placeholder="Enter last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
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
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.lastName}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            Email address <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "error" : ""
            }`}
            placeholder="Enter your email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
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
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        {formik.values.userType === 2 && (
          <div className="form-group">
            <label>
              VIN Number <span className="required">*</span>
            </label>
            <input
              type="number"
              name="VinNumber"
              className={`form-control ${
                formik.touched.VinNumber && formik.errors.VinNumber
                  ? "error"
                  : ""
              }`}
              placeholder="Enter your VIN number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.VinNumber}
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
            {formik.touched.VinNumber && formik.errors.VinNumber && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.VinNumber}
              </div>
            )}
          </div>
        )}

        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password ? "error" : ""
            }`}
            placeholder="Create a strong password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
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
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <PiEyeSlash size={18} color="#92939E" />
            ) : (
              <PiEye size={18} color="#92939E" />
            )}
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            Confirm Password <span className="required">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            className={`form-control ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "error"
                : ""
            }`}
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
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
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <PiEyeSlash size={18} color="#92939E" />
            ) : (
              <PiEye size={18} color="#92939E" />
            )}
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="auth_button mt-3 mb-3"
            disabled={formik.isSubmitting}
          >
            <span>
              {formik.isSubmitting ? "Processing..." : "Create Account"}
            </span>
          </button>

          <p className="text-[#92939E] text-[11px] mb-6 text-center mt-2">
            By signing up, you agree to our{" "}
            <Link className="underline font-medium text-[#202020] hover:no-underline">
              Terms of Services
            </Link>{" "}
            and{" "}
            <Link className="underline font-medium text-[#202020] hover:no-underline">
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-center flex items-center gap-2 justify-center mb-0">
            <span>Already have an account?</span>
            <Link to="/login/user">
              <span className="font-bold">Log In</span>
            </Link>
          </p>
        </div>
      </form>
    </Auth>
  );
};

export default Login;
