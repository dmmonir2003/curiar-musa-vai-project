 
/* eslint-disable react/prop-types */
import React from "react";
import UserImage from "./../assets/user_image.jpg";
import { GiRoundStar } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";

const ProfileGreen = ({
  lastSegment,
  user,
  handleImageChange,
  fileInputRef,
  rating
}) => {
   

  const fullStars = rating && Math.floor(rating) || 0;
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const userdata = useSelector(selectUser);
  // console.log(userdata, "user")
  return (
    <div className="header_profile !h-auto w-full flex items-center relative mb-4 flex-col md:flex-row">
      <div className="flex items-center gap-6 md:flex-row flex-col">
        <div className="relative">
          <img
            src={user?.profileImage || UserImage}
            className="md:h-[148px] w-[96px] h-[96px] md:w-[148px] rounded-full object-cover cursor-pointer"
            // onClick={() => fileInputRef.current.click()}
            alt="Profile"
          />
          {lastSegment !== "reviews" && (
            <>
              <div className="absolute bottom-2 right-3 bg-white rounded-full p-1 cursor-pointer">
                <svg
                  onClick={() => fileInputRef.current.click()}
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14.0002H14.75M10.25 2.75018L12.5 5.00018M11.375 1.62517C11.6734 1.3268 12.078 1.15918 12.5 1.15918C12.7089 1.15918 12.9158 1.20033 13.1088 1.28029C13.3019 1.36024 13.4773 1.47743 13.625 1.62517C13.7727 1.77291 13.8899 1.9483 13.9699 2.14132C14.0498 2.33435 14.091 2.54124 14.091 2.75017C14.091 2.9591 14.0498 3.16599 13.9699 3.35902C13.8899 3.55204 13.7727 3.72743 13.625 3.87517L4.25 13.2502L1.25 14.0002L2 11.0002L11.375 1.62517Z"
                    stroke="#1D1D20"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </>
          )}
        </div>
        <div className="text-white flex flex-col gap-2">
          <h1 className="font-bold text-xl uppercase">
            {user?.firstName} {user?.lastName}
          </h1>
          {lastSegment === "reviews" ? (
            <>
              <p className="text-[15px]">{user?.email}</p>
              <p className="flex items-center gap-4">
                <div className="flex items-center gap-[2px]">
                   {Array(fullStars)?.fill()?.map((_, i) => (
        <GiRoundStar key={`full-${i}`} size={16} color="gold" />
      ))}
      {hasHalfStar && <FaStarHalfAlt size={16} color="gold" />}
      {Array(emptyStars).fill().map((_, i) => (
        <MdOutlineStar key={`empty-${i}`} size={16} color="gold" />
      ))}
                </div>
                <span>{rating} star Rating</span>
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="font-semibold w-16">Email:</span>
                <p>{user?.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold w-16">Phone:</span>
                <p>{user?.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold w-16">Location:</span>
                <p>{user?.address?.address}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileGreen;
