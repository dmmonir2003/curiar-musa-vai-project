/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Grid, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { GiRoundStar } from "react-icons/gi";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import { TESTIMONIALS } from "../../constants";

export default function Slider() {
  const swiperRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const { submitData } = useCreateOrEdit();

  const getTestimonials = async () => {
    try {
      const response = await submitData(TESTIMONIALS, {}, "POST");
      setReviews(response?.data?.data?.users);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <>
      <div className="relative">
        <Swiper
          ref={swiperRef}
          slidesPerView={4}
          grid={{
            rows: 2,
            fill: "row",
          }}
          spaceBetween={15}
          autoplay
          modules={[Grid, Pagination]}
          className="mySwiper-custom"
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
        >
          {reviews?.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div className="border border-[#EBEBEB] px-5 py-7 rounded-md">
                <p className="text-sm text-[#2A3342] mb-5">{item.name}</p>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item?.rating || 0)].map((_, index) => (
                    <GiRoundStar key={index} color="#84DD14" size={14} />
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-[#333F51] inline-block">
                    {item.subTitle}
                  </div>
                  <span className="font-light text-[#8896AB] inline-block">
                    {item.description}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute md:top-1/2 mt-4 md:mt-0 left-0 transform md:-translate-y-1/2 flex justify-between w-full z-[9999999]">
          <div
            className="swiper-button-prev w-10 h-10 flex items-center justify-center md:-ml-[50px] cursor-pointer"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.4 8.06667V18.0667H13.0667V26.1333L0 13.0667L13.0667 0V8.06667H26.4Z"
                fill="#84DD14"
              />
            </svg>
          </div>
          <div
            className="swiper-button-next w-10 h-10 flex items-center justify-center md:-mr-[50px] cursor-pointer"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <svg
              width="27"
              height="31"
              viewBox="0 0 27 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 20.8393V9.30461H13.3333V0L26.4 15.0719L13.3333 30.1439V20.8393H0Z"
                fill="#84DD14"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
