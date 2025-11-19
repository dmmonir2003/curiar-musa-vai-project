/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import LOGO from "../assets/logo.svg";
import LOGOBG from "../assets/logo_bg.svg";
import TOPBAR from "../assets/bar_top.png";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";

const JobAddLayout = ({ children }) => {
  const navigate = useNavigate();
  const urlPath = window.location.pathname;
  const lastSegment = urlPath.split("/").filter(Boolean).pop();

  const [locationjson, setLocationJson] = useState(null);
  const [transport, setTransport] = useState("");
  const [itemsdata, setItemsData] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);

  const [pickupdate, setPickupDate] = useState("");
  const [pickupdateprice, setPickupDatePrice] = useState(0);

  const [pickupdatetime, setPickupDateTime] = useState("");
  const [picktimeprice, setPickupTimePrice] = useState(0);

  const [deliverytime, setDeliveryime] = useState("");
  const [deliverytimeprice, setDeliveryTimePrice] = useState(0);

  const [helppickup, setHelpPickup] = useState("");
  const [helppickupprice, setHelpPickupPrice] = useState(0);

  const [helpdelivery, setHelpDelivery] = useState("");
  const [helpdeliveryprice, setHelpDeliveryPrice] = useState(0);

  useEffect(() => {
    let totalPrice = 0; // Initialize the total price variable
    itemsdata?.forEach((item) => {
        const itemPrice = (item.price || 69) * item.qty;
        totalPrice += itemPrice;
      });
      totalPrice += parseFloat(pickupdateprice);
      totalPrice += parseFloat(picktimeprice);
      totalPrice += parseFloat(deliverytimeprice);
      totalPrice += parseFloat(helppickupprice);
      totalPrice += parseFloat(helpdeliveryprice);
      console.log(totalPrice, "totalPrice");
      setTotalPrice(totalPrice);
      localStorage.setItem("totalprice", totalPrice);
  },[itemsdata, pickupdateprice, picktimeprice, deliverytimeprice, helppickupprice, helpdeliveryprice])

  useEffect(() => {
    
    const location = localStorage.getItem("location");
    if (location) {
      setLocationJson(JSON.parse(location));
    }

    // if(location == null){
    //   toast.error("Please select location first");
    //   navigate("/")
    // }
    //STEP 1
    const step1 = localStorage.getItem("type_transport");
    if (step1) {
      setTransport(step1);
    }
    //STEP 2
    const step2 = JSON.parse(localStorage.getItem("itemslist"));
    if (step2) {
      setItemsData(step2);
    }

    //STEP 3
    const step3pickup = localStorage.getItem("pickup");
    if (step3pickup) {
      setPickupDate(step3pickup);
    }
    const step3pickupprice = localStorage.getItem("pickupprice");
    if (step3pickupprice) {
      setPickupDatePrice(step3pickupprice);
    }

    const step3pickuptime = localStorage.getItem("pickuptimename");
    if (step3pickuptime) {
      setPickupDateTime(step3pickuptime);
    }
    const pickuptimeprice = localStorage.getItem("pickuptimeprice");
    if (pickuptimeprice) {
      setPickupTimePrice(pickuptimeprice);
    }

    const deliverytime = localStorage.getItem("deliverytimename");
    if (deliverytime) {
      setDeliveryime(deliverytime);
    }
    const deliveryprice = localStorage.getItem("deliverytimeprice");
    if (deliveryprice) {
      setDeliveryTimePrice(deliveryprice);
    }

    const helppickup = localStorage.getItem("helppickup");
    if (helppickup) {
      setHelpPickup(helppickup);
    }
    const helppickuppricecon = localStorage.getItem("helppickupprice");
    if (helppickuppricecon) {
      setHelpPickupPrice(helppickuppricecon);
    }
    const heldeliveryconst = localStorage.getItem("helpdelivery");
    if (heldeliveryconst) {
      setHelpDelivery(heldeliveryconst);
    }
    const helpdeliveryconst = localStorage.getItem("helpdeliveryprice");
    if (helpdeliveryconst) {
      setHelpDeliveryPrice(helpdeliveryconst);
    }
  }, [children]);

  return (
    <div>
      <style>
        {`
            body {
                background-color: #ffffff;
            }
            `}
      </style>
      <header className="h-[58px] w-full px-6 flex items-center justify-between">
        <div className="logo">
          <Link
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <IoMdArrowRoundBack size={26} />
            <span>Previous</span>
          </Link>
          <img src={LOGOBG} className="logo_bg -z-10" />
        </div>
        <Link to="/">
          <img src={LOGO} className="h-12 cursor-pointer z-1" />
        </Link>
        <div></div>
      </header>
      <div className="w-[90%] md:w-[80%] mx-auto mt-10 pb-[100px]">
        <div className="flex items-center justify-center gap-[35px] md:gap-[120px]">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              className={`${
                lastSegment >= index + 1 ? "circle_green" : "circle_white"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between items-stretch mt-10 md:flex-row flex-col ">
          <div className="w-full md:w-[70%]">{children}</div>
          <div className="w-full md:w-[25%] px-4 py-4 bg-[#F7F7F8] rounded-xl mt-6 md:mt-2">
            <h1 className="uppercase text-[var(--primary-color)] font-semibold mb-3">
              Your Delivery
            </h1>
            {locationjson && (
              <>
                <div className="flex items-center gap-2">
                  <div>
                    <svg
                      width="16"
                      height="65"
                      viewBox="0 0 16 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.29289 41.7071C7.68342 42.0976 8.31658 42.0976 8.70711 41.7071L15.0711 35.3431C15.4616 34.9526 15.4616 34.3195 15.0711 33.9289C14.6805 33.5384 14.0474 33.5384 13.6569 33.9289L8 39.5858L2.34315 33.9289C1.95262 33.5384 1.31946 33.5384 0.928933 33.9289C0.538408 34.3195 0.538408 34.9526 0.928933 35.3431L7.29289 41.7071ZM9 41L9 2L7 2L7 41L9 41Z"
                        fill="#84DD14"
                      />
                      <rect
                        width="2"
                        height="10"
                        transform="translate(7 41)"
                        fill="black"
                      />
                      <circle
                        cx="8"
                        cy="7"
                        r="6.5"
                        fill="#84DD14"
                        stroke="#84DD14"
                      />
                      <circle
                        cx="8"
                        cy="58"
                        r="6.5"
                        fill="white"
                        stroke="black"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-7 font-semibold text-[14px] ml-3 w-full">
                    <div className="relative flex flex-col gap-1">
                      <span>{locationjson.from}</span>
                      {transport != "" && (
                        <>
                          <span className="!font-normal text-[11px]">
                            ({transport})
                          </span>
                        </>
                      )}

                      {helppickup != "" && (
                        <>
                          <span className="!font-normal text-[11px] flex justify-between items-center capitalize">
                            <span>{helppickup}</span>
                            <span className="font-bold text-[13px]">
                              ${helppickupprice}
                            </span>
                          </span>
                        </>
                      )}
                      {pickupdate != "" && (
                        <>
                          <span className="!font-normal text-[11px] flex justify-between items-center capitalize">
                            <span>{pickupdate}</span>
                            <span className="font-bold text-[13px]">
                              ${pickupdateprice}
                            </span>
                          </span>
                        </>
                      )}

                      {pickupdatetime != "" && (
                        <>
                          <span className="!font-normal text-[11px] flex justify-between items-center capitalize">
                            <span>{pickupdatetime}</span>
                            <span className="font-bold text-[13px]">
                              ${picktimeprice}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                    {/* TO LOCATION DATA */}
                    <div>
                      <span>{locationjson.to}</span>
                      {deliverytime != "" && (
                        <>
                          <span className="!font-normal text-[11px] flex justify-between items-center capitalize">
                            <span>
                              {pickupdate} - {deliverytime}
                            </span>
                            <span className="font-bold text-[13px]">
                              ${deliverytimeprice}
                            </span>
                          </span>
                        </>
                      )}
                      {helpdelivery != "" && (
                        <>
                          <span className="!font-normal text-[11px] flex justify-between items-center capitalize">
                            <span>
                              {helpdelivery}
                            </span>
                            <span className="font-bold text-[13px]">
                              ${helpdeliveryprice}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {itemsdata?.length > 0 && (
              <>
                <div className="mt-3">
                  {itemsdata?.map((item, index) => (
                    <div className="flex flex-row p-2 bg-white border items-center justify-between hover:border-[var(--primary-color)] cursor-pointer border-[#f0f0f0] rounded-lg gap-5 mt-1">
                      <div className="flex items-center gap-3">
                        <div>
                          {!item.image ? (
                            <>
                              <svg
                                width="31"
                                height="31"
                                viewBox="0 0 31 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30.125 20.3749L25.1102 15.3602C24.5008 14.7509 23.6743 14.4086 22.8125 14.4086C21.9507 14.4086 21.1242 14.7509 20.5148 15.3602L5.75 30.1249M4.125 0.875H26.875C28.6699 0.875 30.125 2.33007 30.125 4.125V26.875C30.125 28.6699 28.6699 30.125 26.875 30.125H4.125C2.33007 30.125 0.875 28.6699 0.875 26.875V4.125C0.875 2.33007 2.33007 0.875 4.125 0.875ZM13.875 10.625C13.875 12.4199 12.4199 13.875 10.625 13.875C8.83007 13.875 7.375 12.4199 7.375 10.625C7.375 8.83007 8.83007 7.375 10.625 7.375C12.4199 7.375 13.875 8.83007 13.875 10.625Z"
                                  stroke="#92939E"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              <img
                                src={item?.image}
                                alt="Selected"
                                className="h-[44px] w-[44px] object-fit-cover rounded-xl"
                              />
                            </>
                          )}
                        </div>
                        <div>
                          <p className="uppercase text-[14px] text-[var(--primary-color)] font-semibold">
                            {item.name}{" "}
                            <span className="!text-normal text-[#202020] text-[11px]">
                              (x{item.qty})
                            </span>
                          </p>
                          <span className="text-[#616164] text-[12px]">
                            {item.length} x {item.width} x {item.height} cm
                          </span>
                          {item.material && (
                            <span className="text-[#616164] text-[12px] w-full inline-block">
                              <b>Material:</b> {item.material}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="font-bold text-[var(--primary-color)]">
                        $
                        {((item.price ? item.price : 69) * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-[#ccc] pt-4 flex justify-between items-center">
                  <span className="uppercase font-semibold text-[var(--primary-color)]">
                    Total Price:
                  </span>
                  <span className="font-bold text-xl">
                    ${totalprice.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAddLayout;
