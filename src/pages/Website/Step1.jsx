/* eslint-disable no-empty */
import React, { useEffect, useRef, useState } from "react";
import JobAddLayout from "../../Layouts/JobAddLayout";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";

import belga from "./../../assets/belga.jpg";
import onlineveiling from "./../../assets/onlineveiling.webp";
import troostwijk from "./../../assets/troostwijk-logo.svg";
import vavato from "./../../assets/vavato.webp";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { MAPS_API_KEY } from "../../constants";

const Step1 = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [show, setShow] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  // Load saved values from localStorage when component mounts
  useEffect(() => {
    const savedType = localStorage.getItem("type_transport");
    const savedShow = localStorage.getItem("transportoption");
    const location = JSON.parse(localStorage.getItem("location"));
    if (location != null) {
      setFrom(location.from);
      setTo(location.to);
    }

    if (savedType) {
      setType(savedType);
      // If we have a saved show value, set it immediately
      if (savedShow) {
        setShow(savedShow);
      }
    }
  }, []);

  const transportOption = () => {
    localStorage.setItem("type_transport", type);
    if (show == "" && (type === "private home" || type === "auction")) {
      toast.error("Please select all options");
      return;
    }
    localStorage.setItem("transportoption", show);
    localStorage.setItem("location", JSON.stringify({ from, to }));
    // if(show != "" && (type === "private home" || type === "auction")){
    // } else {
    //     setShow("");
    //     localStorage.removeItem("show_transport");
    // }
    navigate("/request/form/step/2");
  };

  // This effect now only clears the show value if type changes to something that doesn't need it
  // useEffect(() => {
  //   if (!(type === "private home" || type === "auction")) {
  //       setShow("");
  //       localStorage.removeItem("show_transport");
  //   }
  // }, [type]);

  const handlePlaceChanged = (adress) => {
  const extractComponent = (components, types) => {
    const component = components.find(c => types.every(t => c.types.includes(t)));
    return component ? component.long_name : '';
  };

  if (adress === "from") {
    const [place] = inputRef.current.getPlaces();
    if (!place) return;

    const components = place.address_components || [];

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const country = extractComponent(components, ['country']);
    const region = extractComponent(components, ['administrative_area_level_1']);
    const city =
      extractComponent(components, ['locality']) ||
      extractComponent(components, ['administrative_area_level_2']);
    const postalCode = extractComponent(components, ['postal_code']);

    setFrom(place.formatted_address);
    localStorage.setItem("fromlat", lat);
    localStorage.setItem("fromlng", lng);
    localStorage.setItem("fromAddress", place.formatted_address);
    localStorage.setItem("fromCountry", country);
    localStorage.setItem("fromRegion", region);
    localStorage.setItem("fromCity", city);
    localStorage.setItem("fromPostalCode", postalCode);

    console.log("FROM:", { lat, lng, country, region, city, postalCode });
  }

  if (adress === "to") {
    const [place] = inputRef2.current.getPlaces();
    if (!place) return;

    const components = place.address_components || [];

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const country = extractComponent(components, ['country']);
    const region = extractComponent(components, ['administrative_area_level_1']);
    const city =
      extractComponent(components, ['locality']) ||
      extractComponent(components, ['administrative_area_level_2']);
    const postalCode = extractComponent(components, ['postal_code']);

    setTo(place.formatted_address);
    localStorage.setItem("tolat", lat);
    localStorage.setItem("tolng", lng);
    localStorage.setItem("toAddress", place.formatted_address);
    localStorage.setItem("toCountry", country);
    localStorage.setItem("toRegion", region);
    localStorage.setItem("toCity", city);
    localStorage.setItem("toPostalCode", postalCode);

    console.log("TO:", { lat, lng, country, region, city, postalCode });
  }
};


  return (
    <JobAddLayout>
      <div>
        {/* From & To inputs */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--primary-color)]">From</label>
            {isLoaded && (
              <StandaloneSearchBox
                // eslint-disable-next-line no-return-assign
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={()=>handlePlaceChanged('from')}
              > <input
              type="text"
              placeholder="Enter pickup location"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 border-2 border-[var(--primary-color)] rounded-xl focus:outline-none"
            /></StandaloneSearchBox>)
            }
           
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--primary-color)]">To</label>
            {isLoaded && (
          <StandaloneSearchBox
            // eslint-disable-next-line no-return-assign
            onLoad={(ref) => (inputRef2.current = ref)}
            onPlacesChanged={()=>handlePlaceChanged('to')}
          > <input
          type="text"
          placeholder="Enter delivery location"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-3 border-2 border-[var(--primary-color)] rounded-xl focus:outline-none"
        /></StandaloneSearchBox>)}
           
          </div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--primary-color)]">
              From
            </label>
            {isLoaded && (
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={() => handlePlaceChanged("from")}
              >
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full p-3 border-2 border-[var(--primary-color)] rounded-xl focus:outline-none"
                />
              </StandaloneSearchBox>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--primary-color)]">
              To
            </label>
            {isLoaded && (
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef2.current = ref)}
                onPlacesChanged={() => handlePlaceChanged("to")}
              >
                <input
                  type="text"
                  placeholder="Enter delivery location"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full p-3 border-2 border-[var(--primary-color)] rounded-xl focus:outline-none"
                />
              </StandaloneSearchBox>
            )}
          </div>
        </div>
        <h2 className="font-bold text-[18px] text-[var(--primary-color)] uppercase">
          Type of transport
        </h2>
        <p className="mt-2">Where do we pick it up?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-5">
          <div
            className={`rounded-xl ${
              type === "private home"
                ? "bg-[var(--primary-color)]"
                : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => setType("private home")}
          >
            <svg
              width="50"
              height="53"
              viewBox="0 0 70 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M45.75 70.25V41.5833C45.75 40.633 45.3725 39.7215 44.7005 39.0495C44.0285 38.3775 43.117 38 42.1667 38H27.8333C26.883 38 25.9715 38.3775 25.2995 39.0495C24.6275 39.7215 24.25 40.633 24.25 41.5833V70.25"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.75 30.8333C2.74975 29.7908 2.97695 28.7607 3.41574 27.8151C3.85453 26.8694 4.49436 26.0309 5.29058 25.3579L30.3739 3.86151C31.6674 2.76827 33.3064 2.16846 35 2.16846C36.6936 2.16846 38.3326 2.76827 39.6261 3.86151L64.7094 25.3579C65.5056 26.0309 66.1455 26.8694 66.5843 27.8151C67.0231 28.7607 67.2502 29.7908 67.25 30.8333V63.0833C67.25 64.984 66.4949 66.8068 65.1509 68.1509C63.8069 69.4949 61.9841 70.2499 60.0833 70.2499H9.91667C8.01595 70.2499 6.19308 69.4949 4.84907 68.1509C3.50506 66.8068 2.75 64.984 2.75 63.0833V30.8333Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>From a private home</span>
          </div>
          <div
            className={`rounded-xl ${
              type === "store" ? "bg-[var(--primary-color)]" : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => setType("store")}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M63.6525 30.0586V60.0833C63.6525 61.9841 62.8975 63.8069 61.5535 65.1509C60.2095 66.4949 58.3866 67.25 56.4859 67.25H13.5145C11.6144 67.249 9.7925 66.4936 8.44926 65.1497C7.10603 63.8058 6.35146 61.9834 6.35146 60.0833V30.0586M18.8824 23.3542L20.674 2.75M18.8824 23.3542C18.8824 33.753 35.0002 33.753 35.0002 23.3542M18.8824 23.3542C18.8824 34.7348 0.410295 32.3842 2.99746 22.4655L6.74205 8.10708C7.14224 6.57352 8.0395 5.21588 9.29345 4.24656C10.5474 3.27725 12.0873 2.75095 13.6722 2.75H56.3282C57.9131 2.75095 59.453 3.27725 60.707 4.24656C61.9609 5.21588 62.8582 6.57352 63.2584 8.10708L67.003 22.4655C69.5901 32.3877 51.118 34.7348 51.118 23.3542M35.0002 23.3542V2.75M35.0002 23.3542C35.0002 33.753 51.118 33.753 51.118 23.3542M51.118 23.3542L49.3264 2.75"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>From a store</span>
          </div>
          <div
            className={`rounded-xl ${
              type === "auction" ? "bg-[var(--primary-color)]" : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => setType("auction")}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 76 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.9998 45.188L15.9408 71.0848C15.2392 71.9013 14.3766 72.5642 13.4069 73.0319C12.4373 73.4995 11.3815 73.7619 10.3057 73.8026C9.22995 73.8433 8.15736 73.6614 7.15515 73.2683C6.15295 72.8752 5.24272 72.2794 4.48149 71.5181C3.72026 70.7569 3.12443 69.8467 2.73132 68.8445C2.33822 67.8423 2.15631 66.7697 2.19699 65.6939C2.23768 64.6181 2.50007 63.5623 2.96775 62.5927C3.43543 61.623 4.0983 60.7604 4.91486 60.0588L30.8116 37.9998M73.8331 37.6594L51.9927 59.4998M38.3402 2.1665L16.4998 24.0069M35.6097 4.897L19.2303 21.2764C19.2303 21.2764 27.4218 32.1984 35.6097 40.3899C43.8012 48.5778 54.7232 56.7693 54.7232 56.7693L71.1026 40.3899C71.1026 40.3899 62.9111 29.4679 54.7232 21.2764C46.5317 13.0885 35.6097 4.897 35.6097 4.897Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>From an auction</span>
          </div>
          <div
            className={`rounded-xl ${
              type === "small move"
                ? "bg-[var(--primary-color)]"
                : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => setType("small move")}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 76 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M45.167 52.5002V9.50016C45.167 7.59944 44.4119 5.77657 43.0679 4.43256C41.7239 3.08855 39.901 2.3335 38.0003 2.3335H9.33366C7.43294 2.3335 5.61007 3.08855 4.26606 4.43256C2.92205 5.77657 2.16699 7.59944 2.16699 9.50016V48.9168C2.16699 49.8672 2.54452 50.7786 3.21653 51.4506C3.88853 52.1226 4.79997 52.5002 5.75033 52.5002H12.917M48.7503 52.5002H27.2503M63.0837 52.5002H70.2503C71.2007 52.5002 72.1121 52.1226 72.7841 51.4506C73.4561 50.7786 73.8337 49.8672 73.8337 48.9168V35.8377C73.8322 35.0245 73.5542 34.236 73.0453 33.6017L60.5753 18.0142C60.2402 17.5945 59.815 17.2555 59.3312 17.0223C58.8474 16.7891 58.3174 16.6676 57.7803 16.6668H45.167"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M55.9167 59.6668C59.8747 59.6668 63.0833 56.4582 63.0833 52.5002C63.0833 48.5421 59.8747 45.3335 55.9167 45.3335C51.9586 45.3335 48.75 48.5421 48.75 52.5002C48.75 56.4582 51.9586 59.6668 55.9167 59.6668Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.0837 59.6668C24.0417 59.6668 27.2503 56.4582 27.2503 52.5002C27.2503 48.5421 24.0417 45.3335 20.0837 45.3335C16.1256 45.3335 12.917 48.5421 12.917 52.5002C12.917 56.4582 16.1256 59.6668 20.0837 59.6668Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Small move</span>
          </div>
        </div>
        {type === "private home" && (
          <>
            <p className="mt-8 uppercase font-bold">
              Where does the object come from?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-2 mt-10 gap-5">
              <div
                className={`rounded-xl ${
                  show === "family"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("family")}
              >
                <p className="font-bold">Someone you know</p>
                <span>Family, friends or acquaintances</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "Marktplaats"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("Marktplaats")}
              >
                <p className="font-bold">Marktplaats</p>
                <span>You bought or sold something</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "facebook"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("facebook")}
              >
                <p className="font-bold">Facebook Marketplace</p>
                <span>You bought or sold something</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "2dehands"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("2dehands")}
              >
                <p className="font-bold">2dehands</p>
                <span>You bought or sold something</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "others"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("others")}
              >
                <p className="font-bold">Others</p>
                <span>You bought it elsewhere</span>
              </div>
            </div>
          </>
        )}
        {/* IF AUCTION */}
        {type === "auction" && (
          <>
            <p className="mt-8 uppercase font-bold">Select your auction</p>
            <div className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-5">
              <div
                className={`rounded-xl ${
                  show === "Troostwijk"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("Troostwijk")}
              >
                <img src={troostwijk} className="w-[80px]" />
                <span>Troostwijk</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "Veilingmeester"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("Veilingmeester")}
              >
                <img src={onlineveiling} className="h-10" />
                <span>Online Veilingmeester</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "Vavato"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("Vavato")}
              >
                <img src={vavato} className="h-12" />
                <span>Vavato</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "Belga"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("Belga")}
              >
                <img src={belga} className="w-[80px]" />
                <span>Belga</span>
              </div>
              <div
                className={`rounded-xl ${
                  show === "Other"
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#F7F7F8]"
                } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
                onClick={() => setShow("Other")}
              >
                <svg
                  className="IconAuction"
                  style={{ width: "40px" }}
                  x="0px"
                  y="0px"
                  viewBox="0 0 115.2 84"
                >
                  <path
                    className="cls-1"
                    d="M108,53.3c-1.3-2-3.7-3.1-6-2.9L77,9.5c1.3-2,1.5-4.6,0.2-6.7c0,0,0-0.1-0.1-0.1c-1.9-2.9-5.8-3.8-8.7-2L42.4,16.5 c-2.9,1.9-3.8,5.8-2,8.8c1.2,1.9,3.3,2.9,5.4,2.9c0.2,0,0.4,0,0.6,0l9.2,15.1L7.4,72.7C7,73,6.6,73.4,6.5,73.9 c-0.1,0.5,0,1.1,0.2,1.5l4.5,7.4c0.4,0.6,1,1,1.7,1c0.4,0,0.7-0.1,1-0.3l48.2-29.5l9.2,15c-1.3,2-1.4,4.7-0.1,6.8 c1.2,1.9,3.3,2.9,5.4,2.9c1.1,0,2.3-0.3,3.3-0.9L105.9,62C108.9,60.2,109.8,56.4,108,53.3z M13.6,79.1l-2.5-4l46.5-28.4l2.5,4 L13.6,79.1z M43.8,23.2c-0.7-1.1-0.3-2.6,0.7-3.3l26-15.8c0.4-0.2,0.8-0.3,1.2-0.3c0.8,0,1.6,0.4,2.1,1.1C74.4,6,74,7.3,73,8.1 l-7.4,4.5L47.1,23.9C46,24.5,44.5,24.2,43.8,23.2z M67.3,16.2l6.6-4.1l24.3,39.7L74.5,66.4L50.2,26.7L67.3,16.2z M103.9,58.6 C103.9,58.6,103.9,58.6,103.9,58.6L78,74.5c-1.1,0.7-2.6,0.3-3.3-0.7c-0.6-1-0.3-2.4,0.5-3.1l26.2-16c0.3-0.2,0.7-0.3,1.1-0.3 c0.8,0,1.6,0.4,2,1C105.2,56.5,104.9,58,103.9,58.6z"
                  ></path>
                </svg>
                <span>Other</span>
              </div>
            </div>
          </>
        )}
        <div>
          <button
            className="website_button !px-8 hover:bg-[#202020] bg-[var(--primary-color)] uppercase flex items-center gap-3 mt-10"
            onClick={() => transportOption()}
          >
            <span>Next Step</span>
            <BsArrowRight />
          </button>
        </div>
      </div>
    </JobAddLayout>
  );
};

export default Step1;
