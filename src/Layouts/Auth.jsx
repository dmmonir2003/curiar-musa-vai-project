import React from "react";
import LOGO from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Auth = ({ children, heading }) => {
  const lastSegment = window.location.pathname.split("/").pop();
  return (
    <>
      <div className="w-screen h-full flex justify-center items-center flex-col ">
        <div className="p-8 white_box w-[90%] md:w-[490px] md:max-w-[490px] mx-auto flex justify-center flex-col items-center">
          <div className="logo_main text-center mb-4">
            <Link to="/">
              <img src={LOGO} alt="Logo" className="h-12" />
            </Link>
          </div>
          <h2 className="font-bold text-[16px] mb-1 uppercase ">{heading}</h2>
          <div className="w-full">{children}</div>
        </div>
        {lastSegment == "user" && (
          <Link to="/login/courier" className="mt-4 uppercase">
            Courier Account?{" "}
            <span className="text-[#416dff] font-semibold uppercase">
              Login Here
            </span>
          </Link>
        )}
      </div>
    </>
  );
};

export default Auth;
