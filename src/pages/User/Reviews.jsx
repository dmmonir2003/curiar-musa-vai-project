/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import UserImage from "./../../assets/user_image.jpg";
import On from "./../../assets/on.svg";
import Off from "./../../assets/off.svg";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeadphonesAlt } from "react-icons/fa";
import ProfileGreen from "../../Components/ProfileGreen";
import { GiRoundStar } from "react-icons/gi";
import useFetch from "../../hooks/useFetch";
import { RATINGS, REVIEWS } from "../../constants";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import toast from "react-hot-toast";

const Reviews = () => {
  const [emailnotif, setEmailNotif] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliverynotif, setDeliveryNotif] = useState(true);
  const [averageReviewsInfo, setAverageReviewsInfo] = useState({});
  const [reviews, setReviews] = useState([]);
  const urlPath = window.location.pathname;
  const lastSegment = urlPath.split("/").filter(Boolean).pop();
  const user = useSelector(selectUser);
  const { fetchData } = useFetch();

  const fetchRatingData = async () => {
    try {
      setLoading(true);
      const response = await fetchData(`${RATINGS}`);
      // console.log(response?.data?.data?.data, "dfdsffff");
      setAverageReviewsInfo(response?.data?.data?.data);
      setReviews(response?.data?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // toast.error(error)
      console.error("Error fetching reviews:", error);
    }
  };
  const fetchReviewData = async () => {
    try {
      setLoading(true);
      const response = await fetchData(`${REVIEWS}`);
      console.log(response?.data?.data?.data, "all reviews");
      // setAverageReviewsInfo(response?.data?.data?.data);
      setReviews(response?.data?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // toast.error(error)
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchRatingData();
    fetchReviewData();
  }, []);

  return (
    <DashboardLayout>
      <div className="mt-8">
        <ProfileGreen
          lastSegment={lastSegment}
          user={user}
          // rating={averageReviewsInfo?.total}
        />

        <h1 className="font-bold text-[17px] w-full flex items-end gap-2">
          <span>Average Rating (Total)</span>
          <span className="text-4xl font-bold text-[var(--primary-color)]">
            {user?.averageRatings}/5
          </span>
        </h1>
        <p className="!text-[13px] text-[#242325] mt-1">
          Your Rating is a combination of following three dimensions
        </p>

        <div className="professional_boxes mt-8">
          <div className="flex items-center justify-between w-full md:w-[40%] border-b border-b-[#979797] pb-4">
            <span className="text-[#242325] text-[14px]">Professionalism</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-[1.4px]">
                {Array.from(
                  { length: Number(averageReviewsInfo?.professionalism) },

                  (_, index) => (
                    <GiRoundStar key={index} color="#FFB129" size={14} />
                  )
                )}
              </div>
              <span>{averageReviewsInfo?.professionalism}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-[40%] border-b border-b-[#979797] pb-4 pt-4">
            <span className="text-[#242325] text-[14px]">Communication</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-[1.4px]">
                {Array.from(
                  { length: Number(averageReviewsInfo?.communication) },
                  (_, index) => (
                    <GiRoundStar key={index} color="#FFB129" size={14} />
                  )
                )}
              </div>
              <span>{averageReviewsInfo?.communication}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-[40%] pb-4 pt-4">
            <span className="text-[#242325] text-[14px]">Friendliness</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-[1.4px]">
                {Array.from(
                  { length: Number(averageReviewsInfo?.friendliness) },
                  (_, index) => (
                    <GiRoundStar key={index} color="#FFB129" size={14} />
                  )
                )}
              </div>
              <span>{averageReviewsInfo?.friendliness}</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div>
            <h1 className="font-bold text-[15px] w-full">Past Reviews</h1>
          </div>
          {reviews?.length == 0 && (
            <h1 className="font-normal text-[13px] text-red-500 mt-10 w-full p-5 bg-white rounded-xl text-center">
              {loading ? "Loading..." : "No Reviews Found"}
            </h1>
          )}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {reviews?.map((item, index) => (
              <>
                <div className="white_box p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item?.user?.profileImage || UserImage}
                      alt=""
                      className="h-9 w-9 rounded-full"
                    />
                    <div>
                      <p className="text-[12px] text-light leading-3">
                        {item?.user?.firstName} {item?.user?.lastName}
                      </p>
                      <span className="text-[10px] text-[#24232560] ">
                        {new Date(item?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#242325] mt-4">
                    {item?.comment}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between border-b border-b-[#c9c9c9] pb-2 mb-2 w-full">
                      <span className="text-[#242325] text-[12px]">
                        Friendliness
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-[1.4px]">
                          {Array.from(
                            { length: Number(item?.friendliness) },
                            (_, index) => (
                              <GiRoundStar
                                key={index}
                                color="#FFB129"
                                size={11}
                              />
                            )
                          )}
                        </div>
                        <span className="text-[11px] text-[#878787]">
                          {item?.friendliness}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-b-[#c9c9c9] pb-2 mb-2 w-full">
                      <span className="text-[#242325] text-[12px]">
                        Communication
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-[1.4px]">
                          {Array.from(
                            { length: Number(item?.communication) },
                            (_, index) => (
                              <GiRoundStar
                                key={index}
                                color="#FFB129"
                                size={11}
                              />
                            )
                          )}
                        </div>
                        <span className="text-[11px] text-[#878787]">
                          {item?.communication}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[#242325] text-[12px]">
                        Professionalism
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-[1.4px]">
                          {Array.from(
                            { length: Number(item?.professionalism) },
                            (_, index) => (
                              <GiRoundStar
                                key={index}
                                color="#FFB129"
                                size={11}
                              />
                            )
                          )}
                        </div>
                        <span className="text-[11px] text-[#878787]">
                          {item?.professionalism}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
