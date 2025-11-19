/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect } from "react";
import WebsiteLayout from "../../Layouts/Website";
import { SlLocationPin } from "react-icons/sl";
import TOPBAR from "./../../assets/bar_right.png";
import BOTTOM from "./../../assets/bottom.png";
import BUSS from "./../../assets/buss.png";

import Img1 from "./../../assets/1.png";
import Img2 from "./../../assets/2.png";
import Img3 from "./../../assets/3.png";
import Img4 from "./../../assets/4.png";

import OP1 from "./../../assets/op1.svg";
import OP2 from "./../../assets/op2.svg";
import OP3 from "./../../assets/op3.svg";
import Delivery from "./../../assets/delivery.svg";
import ANIMATION from "./../../assets/animation.gif";
import { LuCircleArrowDown, LuCircleArrowUp } from "react-icons/lu";
import AosWrapper from "../../Layouts/AOS";
import {
  useJsApiLoader,
  StandaloneSearchBox,
  Autocomplete,
} from "@react-google-maps/api";

import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import { MAPS_API_KEY } from "../../constants";
import toast from "react-hot-toast";
import Faqs from "../../Components/Faqs";



const LandingPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [from, setFrom] = useState("");
  const [fromclicked, setFromClicked] = useState(false);
  const [toclicked, setToClicked] = useState(false);
  const [to, setTo] = useState("");
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  // const [faqdata, setFaqData] = useState(faqs);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const onsubmit = (e) => {
    e.preventDefault();
    if (!fromclicked) {
      toast.error("Please select FROM address from Google Location!");
      return;
    }
    if (!toclicked) {
      toast.error("Please select TO address from Google Location!");
      return;
    }
    const value = {
      from,
      to,
    };
    localStorage.setItem("location", JSON.stringify(value));
    setFromClicked(false);
    setToClicked(false);
    navigate("/request/form/step/1");
  };

  const handlePlaceChangedOLD = (adress) => {
    if (adress === "from") {
      // const [place] = inputRef.current.getPlaces();
      const [place] = inputRef.current.getPlace();
      console.log(place, "FROM ADDRESS");
      setFromClicked(true);
      setFrom(place.formatted_address);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      localStorage.setItem("fromlat", lat);
      localStorage.setItem("fromlng", lng);
      // console.log(lat, lng);
    }
    if (adress === "to") {
      const [place] = inputRef2.current.getPlace();
      console.log(place, "TO ADDRESS");
      setToClicked(true);
      setTo(place.formatted_address);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      localStorage.setItem("tolat", lat);
      localStorage.setItem("tolng", lng);
      // console.log(lat, lng);
    }
  };

const handlePlaceChanged = (addressType) => {
  let place = null;

  const extractComponent = (components, types) => {
    const component = components.find(c => types.every(t => c.types.includes(t)));
    return component ? component.long_name : '';
  };

  if (addressType === "from") {
    place = inputRef.current?.getPlace();
    if (!place) return;

    console.log(place, "FROM ADDRESS");
    setFromClicked(true);
    setFrom(place.formatted_address);

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const components = place.address_components || [];

    const country = extractComponent(components, ['country']);
    const region = extractComponent(components, ['administrative_area_level_1']);
    const city =
      extractComponent(components, ['locality']) ||
      extractComponent(components, ['administrative_area_level_2']);
    const postalCode = extractComponent(components, ['postal_code']);

    localStorage.setItem("fromlat", lat);
    localStorage.setItem("fromlng", lng);
    localStorage.setItem("fromAddress", place.formatted_address);
    localStorage.setItem("fromCountry", country);
    localStorage.setItem("fromRegion", region);
    localStorage.setItem("fromCity", city);
    localStorage.setItem("fromPostalCode", postalCode);
  }

  if (addressType === "to") {
    place = inputRef2.current?.getPlace();
    if (!place) return;

    console.log(place, "TO ADDRESS");
    setToClicked(true);
    setTo(place.formatted_address);

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const components = place.address_components || [];

    const country = extractComponent(components, ['country']);
    const region = extractComponent(components, ['administrative_area_level_1']);
    const city =
      extractComponent(components, ['locality']) ||
      extractComponent(components, ['administrative_area_level_2']);
    const postalCode = extractComponent(components, ['postal_code']);

    localStorage.setItem("tolat", lat);
    localStorage.setItem("tolng", lng);
    localStorage.setItem("toAddress", place.formatted_address);
    localStorage.setItem("toCountry", country);
    localStorage.setItem("toRegion", region);
    localStorage.setItem("toCity", city);
    localStorage.setItem("toPostalCode", postalCode);
  }
};


  const autocompleteOptions = {
    // componentRestrictions: { country: "nl" }, // Restrict to Netherlands
    types: ["address"], // Only allow address (no cities, regions)
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const target = document.getElementById("booking-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <WebsiteLayout>
      <AosWrapper>
        <div className="container_custom">
          <div className="grid grid-col-1 md:grid-cols-2 mt-[20px] mb-[20px] md:gap-10 items-center">
            <div
              className="uppercase"
              aosType="zoom-in"
              aosDuration="2000"
              aosDelay="500"
            >
              <h1
                className="text-[20px] md:text-left text-center md:text-[40px] font-bold"
                data-aos="fade-right"
              >
                jouw lading, <span className="text-[var(--primary-color)]">onze netwerk -</span>
              </h1>
              <div className="flex items-center md:justify-start justify-center gap-2 md:flex-row flex-col md:mt-0 mt-4">
                {/* <h2
                  className="md:text-[32px] text-[22px] font-bold"
                  data-aos="fade-right"
                >
                  to the{" "}
                </h2> */}
                <h1
                  className="md:text-[40px] text-[20px] text-center md:text-left font-bold text-[var(--primary-color)]"
                  data-aos="fade-left"
                >
                  <span className="text-black">samen naar de</span> juiste bestemming
                </h1>
              </div>
            </div>
            <div className="mb-6 flex justify-center" data-aos="fade-left">
              <img src={ANIMATION} className="md:h-auto h-[100px]" />
            </div>
          </div>
        </div>
        {/* FORM FILTER */}
        <div
          style={{ background: "rgba(133, 226, 17, 0.13)" }}
          className="md:p-6 p-3 text-center"
          id="booking-section"
        >
          <div className="container_custom mobile_screen_padding">
            <h2 className="font-bold uppercase text-lg" data-aos="zoom-in">
              Book your transport
            </h2>
            <form
              onSubmit={onsubmit}
              method="post"
              className="border border-[#D5D5D5] py-2 px-3  mb-2 bg-white rounded-xl mt-4 flex items-center justify-between md:flex-row flex-col gap-2 md:gap-0"
            >
              <div
                className="flex items-center gap-3 md:w-[40%] w-full"
                data-aos="fade-left"
              >
                <SlLocationPin color="#85E211" size={18} />
                <p className="font-semibold md:block hidden">FROM</p>
                {isLoaded && (
                  <div className="w-full">
                    {/* <StandaloneSearchBox
                      // eslint-disable-next-line no-return-assign
                      // onLoad={(ref) => (inputRef.current = ref)}
                      onLoad={(ref) => {
                        inputRef.current = ref;
                        if (ref?.instance) {
                          ref.instance.setOptions(searchBoxOptions);
                        }
                      }}
                      onPlacesChanged={() => handlePlaceChanged("from")}
                      style
                    >
                      <input
                        className="outline-none p-4 w-full"
                        placeholder="Enter Locality or address"
                        required
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </StandaloneSearchBox> */}

                    <Autocomplete
                      onLoad={(ref) => (inputRef.current = ref)}
                      onPlaceChanged={() => handlePlaceChanged("from")}
                      options={autocompleteOptions}
                    >
                      <input
                        className="outline-none p-4 w-full"
                        placeholder="Enter Locality or address (FROM)"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </Autocomplete>
                  </div>
                )}
              </div>
              <div
                className="flex items-center gap-3 md:w-[40%] w-full"
                data-aos="fade-left"
              >
                <SlLocationPin color="#85E211" size={18} />
                <p className="font-semibold md:block hidden">TO</p>
                {isLoaded && (
                  <div className="w-full">
                    {/* <StandaloneSearchBox
                      // eslint-disable-next-line no-return-assign
                      // onLoad={(ref) => (inputRef2.current = ref)}
                      onLoad={(ref) => {
                        inputRef2.current = ref;
                        if (ref?.instance) {
                          ref.instance.setOptions(searchBoxOptions);
                        }
                      }}
                      onPlacesChanged={() => handlePlaceChanged("to")}
                      style
                    >
                      <input
                        className="outline-none p-4 w-full"
                        placeholder="Enter Locality or address"
                        required
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </StandaloneSearchBox> */}

                    <Autocomplete
                      onLoad={(ref) => (inputRef2.current = ref)}
                      onPlaceChanged={() => handlePlaceChanged("to")}
                      options={autocompleteOptions}
                    >
                      <input
                        className="outline-none p-4 w-full"
                        placeholder="Enter Locality or address (TO)"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </Autocomplete>
                  </div>
                )}
              </div>
              <div className="md:w-[20%] w-full" data-aos="fade-right">
                <button className="p-4 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--text-color)] text-bold text-white w-full  flex items-center justify-between gap-3">
                  <span className="font-bold text-[15px]">Calculate Price</span>
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.208008 8.99992C0.208008 8.58552 0.372628 8.1881 0.665654 7.89507C0.958679 7.60204 1.35611 7.43742 1.77051 7.43742H14.1455L10.0413 3.33326C9.76534 3.03706 9.61509 2.6453 9.62223 2.2405C9.62937 1.83571 9.79335 1.44949 10.0796 1.16321C10.3659 0.876935 10.7521 0.712952 11.1569 0.70581C11.5617 0.698668 11.9535 0.848924 12.2497 1.12492L19.0205 7.89576C19.3131 8.18873 19.4775 8.58586 19.4775 8.99992C19.4775 9.41399 19.3131 9.81112 19.0205 10.1041L12.2497 16.8749C11.9535 17.1509 11.5617 17.3012 11.1569 17.294C10.7521 17.2869 10.3659 17.1229 10.0796 16.8366C9.79335 16.5504 9.62937 16.1641 9.62223 15.7593C9.61509 15.3546 9.76534 14.9628 10.0413 14.6666L14.1455 10.5624H1.77051C1.35611 10.5624 0.958679 10.3978 0.665654 10.1048C0.372628 9.81175 0.208008 9.41432 0.208008 8.99992Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* BOOK NOW */}
        <div className="text-center p-3 bg-[#D6FBBC]">
          <span data-aos="zoom-in">Book now and get 10% DISCOUNT!</span>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-10" id="how-it-works" data-aos="zoom-out">
          <div className="w-full">
            <img src={TOPBAR} />
            <div className="gradient_bg !bg-none">
              <div className="container_custom pt-[30px] pb-[40px]">
                <div className="bg-pills">HOW IT WORKS</div>
                <h2 className="uppercase text-[#2A3342] font-bold text-[26px] mt-3">
                  Laat je transport binnen enkele minuten regelen
                </h2>
                <p className="text-[#556987] mt-2">
                  Regelen Heb je een bank, fiets of kast die niet in je auto
                  past? Regel eenvoudig en snel het vervoer van grote spullen —
                  zonder gedoe.
                </p>

                <div className="grid grid-col-1 md:grid-cols-2  mt-[80px] ">
                  <div className="flex flex-col gap-6 w-full md:w-[80%] md:mb-0 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#84DD14] p-3 rounded-md flex justify-center items-center">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.375 15.7502H8.085C8.20016 15.7509 8.31431 15.7288 8.42092 15.6852C8.52753 15.6417 8.62449 15.5775 8.70625 15.4964L14.7613 9.43269L17.2462 7.00019C17.3283 6.91885 17.3934 6.82207 17.4378 6.71545C17.4822 6.60882 17.5051 6.49445 17.5051 6.37894C17.5051 6.26343 17.4822 6.14906 17.4378 6.04244C17.3934 5.93581 17.3283 5.83903 17.2462 5.75769L13.5363 2.00394C13.4549 1.92193 13.3581 1.85683 13.2515 1.81241C13.1449 1.76799 13.0305 1.74512 12.915 1.74512C12.7995 1.74512 12.6851 1.76799 12.5785 1.81241C12.4719 1.85683 12.3751 1.92193 12.2938 2.00394L9.82625 4.48019L3.75375 10.5439C3.67265 10.6257 3.60849 10.7227 3.56495 10.8293C3.52141 10.9359 3.49933 11.05 3.5 11.1652V14.8752C3.5 15.1073 3.59219 15.3298 3.75628 15.4939C3.92038 15.658 4.14294 15.7502 4.375 15.7502ZM12.915 3.85894L15.3913 6.33519L14.1488 7.57769L11.6725 5.10144L12.915 3.85894ZM5.25 11.5239L10.4388 6.33519L12.915 8.81144L7.72625 14.0002H5.25V11.5239ZM18.375 17.5002H2.625C2.39294 17.5002 2.17038 17.5924 2.00628 17.7565C1.84219 17.9206 1.75 18.1431 1.75 18.3752C1.75 18.6073 1.84219 18.8298 2.00628 18.9939C2.17038 19.158 2.39294 19.2502 2.625 19.2502H18.375C18.6071 19.2502 18.8296 19.158 18.9937 18.9939C19.1578 18.8298 19.25 18.6073 19.25 18.3752C19.25 18.1431 19.1578 17.9206 18.9937 17.7565C18.8296 17.5924 18.6071 17.5002 18.375 17.5002Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-[#2A3342] font-bold text-[20px] mt-1">
                          Snel inzicht in de prijs & direct boeken
                        </h2>
                        <p className="text-[#556987] mt-2">
                          Voer je ophaal- en afleveradres in, kies een moment
                          dat jou uitkomt, en zie meteen de prijs. Boek
                          eenvoudig in 2 minuten!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#84DD14] p-3 rounded-md flex justify-center items-center">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.875 18.9263H4.375C3.67881 18.9263 3.01113 18.6497 2.51884 18.1574C2.02656 17.6651 1.75 16.9975 1.75 16.3013V9.30127C1.75 9.06921 1.65781 8.84665 1.49372 8.68255C1.32962 8.51846 1.10706 8.42627 0.875 8.42627C0.642936 8.42627 0.420376 8.51846 0.256282 8.68255C0.0921873 8.84665 0 9.06921 0 9.30127L0 16.3013C0 17.4616 0.460936 18.5744 1.28141 19.3949C2.10188 20.2153 3.21468 20.6763 4.375 20.6763H14.875C15.1071 20.6763 15.3296 20.5841 15.4937 20.42C15.6578 20.2559 15.75 20.0333 15.75 19.8013C15.75 19.5692 15.6578 19.3466 15.4937 19.1826C15.3296 19.0185 15.1071 18.9263 14.875 18.9263ZM18.375 3.17627H6.125C5.42881 3.17627 4.76113 3.45283 4.26884 3.94511C3.77656 4.4374 3.5 5.10508 3.5 5.80127V14.5513C3.5 15.2475 3.77656 15.9151 4.26884 16.4074C4.76113 16.8997 5.42881 17.1763 6.125 17.1763H18.375C19.0712 17.1763 19.7389 16.8997 20.2312 16.4074C20.7234 15.9151 21 15.2475 21 14.5513V5.80127C21 5.10508 20.7234 4.4374 20.2312 3.94511C19.7389 3.45283 19.0712 3.17627 18.375 3.17627V3.17627ZM18.0163 4.92627L12.8713 10.0713C12.7899 10.1533 12.6931 10.2184 12.5865 10.2628C12.4799 10.3072 12.3655 10.3301 12.25 10.3301C12.1345 10.3301 12.0201 10.3072 11.9135 10.2628C11.8069 10.2184 11.7101 10.1533 11.6287 10.0713L6.48375 4.92627H18.0163ZM19.25 14.5513C19.25 14.7833 19.1578 15.0059 18.9937 15.17C18.8296 15.3341 18.6071 15.4263 18.375 15.4263H6.125C5.89294 15.4263 5.67038 15.3341 5.50628 15.17C5.34219 15.0059 5.25 14.7833 5.25 14.5513V6.12502L10.395 11.27C10.8872 11.7616 11.5544 12.0377 12.25 12.0377C12.9456 12.0377 13.6128 11.7616 14.105 11.27L19.25 6.12502V14.5513Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-[#2A3342] font-bold text-[20px] mt-1">
                          Altijd op de hoogte van je levering
                        </h2>
                        <p className="text-[#556987] mt-2">
                          We sturen je updates over je koerier: wie het is,
                          wanneer hij komt, en waar je zending is. Wel zo fijn.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#84DD14] p-3 rounded-md flex justify-center items-center">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.25 11.875H3.125C2.89294 11.875 2.67038 11.9672 2.50628 12.1313C2.34219 12.2954 2.25 12.5179 2.25 12.75V18.875C2.25 19.1071 2.34219 19.3296 2.50628 19.4937C2.67038 19.6578 2.89294 19.75 3.125 19.75H9.25C9.48206 19.75 9.70462 19.6578 9.86872 19.4937C10.0328 19.3296 10.125 19.1071 10.125 18.875V12.75C10.125 12.5179 10.0328 12.2954 9.86872 12.1313C9.70462 11.9672 9.48206 11.875 9.25 11.875ZM8.375 18H4V13.625H8.375V18ZM18.875 2.25H12.75C12.5179 2.25 12.2954 2.34219 12.1313 2.50628C11.9672 2.67038 11.875 2.89294 11.875 3.125V9.25C11.875 9.48206 11.9672 9.70462 12.1313 9.86872C12.2954 10.0328 12.5179 10.125 12.75 10.125H18.875C19.1071 10.125 19.3296 10.0328 19.4937 9.86872C19.6578 9.70462 19.75 9.48206 19.75 9.25V3.125C19.75 2.89294 19.6578 2.67038 19.4937 2.50628C19.3296 2.34219 19.1071 2.25 18.875 2.25ZM18 8.375H13.625V4H18V8.375ZM18.875 11.875H12.75C12.5179 11.875 12.2954 11.9672 12.1313 12.1313C11.9672 12.2954 11.875 12.5179 11.875 12.75V18.875C11.875 19.1071 11.9672 19.3296 12.1313 19.4937C12.2954 19.6578 12.5179 19.75 12.75 19.75H18.875C19.1071 19.75 19.3296 19.6578 19.4937 19.4937C19.6578 19.3296 19.75 19.1071 19.75 18.875V12.75C19.75 12.5179 19.6578 12.2954 19.4937 12.1313C19.3296 11.9672 19.1071 11.875 18.875 11.875ZM18 18H13.625V13.625H18V18ZM9.25 2.25H3.125C2.89294 2.25 2.67038 2.34219 2.50628 2.50628C2.34219 2.67038 2.25 2.89294 2.25 3.125V9.25C2.25 9.48206 2.34219 9.70462 2.50628 9.86872C2.67038 10.0328 2.89294 10.125 3.125 10.125H9.25C9.48206 10.125 9.70462 10.0328 9.86872 9.86872C10.0328 9.70462 10.125 9.48206 10.125 9.25V3.125C10.125 2.89294 10.0328 2.67038 9.86872 2.50628C9.70462 2.34219 9.48206 2.25 9.25 2.25ZM8.375 8.375H4V4H8.375V8.375Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-[#2A3342] font-bold text-[20px] mt-1">
                          Veilige en betrouwbare levering
                        </h2>
                        <p className="text-[#556987] mt-2">
                          Onze professionele koeriers zorgen voor een
                          zorgvuldige en stipte bezorging. Jij hoeft nergens aan
                          te denken — wij regelen het.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center -mr-[0px]">
                    <img src={BUSS} className="md:h-[300px] h-auto" />
                  </div>
                </div>
              </div>
            </div>
            <img src={BOTTOM} />
          </div>
        </div>

        {/* COMPANIES,, */}
        <div className="gradient_bg p-5 !bg-none mt-[40px] mb-[40px]">
          <div className="container_custom !pt-2 !pb-2">
            <div className="grid grid-cols-4" data-aos="fade-left">
              <img src={Img1} />
              <img src={Img2} />
              <img src={Img3} />
              <img src={Img4} />
            </div>
          </div>
        </div>

        {/* FAQS */}
        <div className="mt-10">
          <div className="w-full">
            <div className=" !bg-none">
              <div className="container_custom pt-[30px] pb-[40px]">
                <div className="flex justify-center items-center flex-col">
                  <div className="bg-pills">TESTIMONIALS</div>
                  <h2 className="uppercase text-[#2A3342] font-bold text-[26px] mt-3">
                    What People Said about us
                  </h2>
                </div>

                <div className="mt-10 w-full">
                  <Slider />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className=" mb-[40px]" id="why-us">
          <div className="gradient_bg p-5 !bg-none mt-[40px]">
            <div className="container_custom !pt-8">
              <h1
                className="text-center text-3xl font-bold mb-10 uppercase"
                data-aos="fade-left"
              >
                Waarom kiezen voor ons?
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
                <div className="white_box px-6 py-10" data-aos="flip-left">
                  <img src={OP1} className="h-10" />
                  <div className="mt-8 font-bold mb-3">
                    Gratis annuleren tot 72 uur van tevoren
                  </div>
                  <p>
                    Plannen veranderd? Geen probleem. Je kunt je boeking tot 72
                    uur van tevoren kosteloos wijzigen of annuleren. Volledig
                    zonder risico.
                  </p>
                </div>
                <div className="white_box px-6 py-10" data-aos="flip-left">
                  <img src={OP2} className="h-10" />
                  <div className="mt-8 font-bold mb-3">
                    Kies zelf wanneer we komen
                  </div>
                  <p>
                    Jij bepaalt wanneer we je spullen ophalen en bezorgen.
                    Overdag, ’s avonds of in het weekend — wij passen ons aan
                    jouw agenda aan.
                  </p>
                </div>
                <div className="white_box px-6 py-10" data-aos="flip-left">
                  <img src={OP3} className="h-10" />
                  <div className="mt-8 font-bold mb-3">
                    Altijd hulp en betrouwbare koeriers
                  </div>
                  <p>
                    Onze klantenservice staat voor je klaar en onze koeriers
                    zijn ervaren, zorgvuldig en professioneel. Zo ben jij altijd
                    verzekerd van een veilige levering.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img src={BOTTOM} />
        </div>

        {/* FAQS */}
        <Faqs />

        {/* HOW IT WORKS */}
        <div className="mt-6" id="how-it-works" data-aos="zoom-out">
          <div className="w-full">
            <div className="">
              <div className="container_custom pt-[30px] pb-[40px]">
                <div className="grid grid-cols-1 md:grid-cols-2  mt-[20px] ">
                  <div className="flex flex-col justify-center gap-4 w-full md:w-[80%]">
                    <div className="bg-pills w-[90px]">COURIERS</div>
                    <h2 className="uppercase text-[#2A3342] font-bold text-[26px] mt-1 text-center md:text-left">
                      Samen maken we impact
                    </h2>
                    <p className="text-[#556987]">
                      Bij ons kunnen alleen goedgekeurde, professionele koeriers
                      aan de slag die staan ingeschreven bij de Kamer van
                      Koophandel. Elke koerier wordt zorgvuldig gescreend via
                      een proces in vier eenvoudige stappen:
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <img src={Delivery} className="h-[240px]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-1 mt-1 md:mt-6">
                  <div
                    className="white_box px-6 md:py-10 py-1 !shadow-none"
                    data-aos="flip-left"
                  >
                    <div className="w-[34px] mb-2 h-[34px] text-white rounded-full flex items-center justify-center bg-[#22C55E] font-bold">
                      1
                    </div>
                    <h2 className=" text-[#2A3342] font-bold text-[16px]">
                      Registratie
                    </h2>
                    <div className="mt-2 text-[#556987]">
                      Je schrijft je in met je KvK-gegevens en een geldig
                      rijbewijs. Na het accepteren van onze voorwaarden, stellen
                      we een samenwerkingsovereenkomst op tussen jou en Koerier
                      Platform. Zodra deze ondertekend is, gaan we verder met de
                      verificatie.
                    </div>
                  </div>

                  <div
                    className="white_box px-6 md:py-10 py-1 !shadow-none"
                    data-aos="flip-left"
                  >
                    <div className="w-[34px] mb-2 h-[34px] text-white rounded-full flex items-center justify-center bg-[#22C55E] font-bold">
                      2
                    </div>
                    <h2 className=" text-[#2A3342] font-bold text-[16px]">
                      Verificatie
                    </h2>
                    <div className="mt-2 text-[#556987]">
                      We controleren je identiteit en bekijken of je voldoende
                      ervaring hebt als koerier. Ook checken we of je beschikt
                      over de juiste uitrusting, zoals een betrouwbare fiets of
                      scooter, beschermende kleding en een werkende smartphone.
                    </div>
                  </div>

                  <div
                    className="white_box px-6 md:py-10 py-1 !shadow-none"
                    data-aos="flip-left"
                  >
                    <div className="w-[34px] mb-2 h-[34px] text-white rounded-full flex items-center justify-center bg-[#22C55E] font-bold">
                      3
                    </div>
                    <h2 className=" text-[#2A3342] font-bold text-[16px]">
                      Accountactivatie
                    </h2>
                    <div className="mt-2 text-[#556987]">
                      Na goedkeuring wordt je account geactiveerd. Je kunt dan
                      direct aan de slag via ons platform en profiteren van alle
                      voordelen die we bieden.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AosWrapper>
      {showButton && (
        <div>
          <button
            onClick={handleClick}
            className="px-6 py-4 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--text-color)] font-bold text-black text-[16px]  flex items-center justify-between gap-3 fixed bottom-3 z-[9] left-1/2 -translate-x-1/2 hover:text-white"
          >
            Bekijk de prijs en boek transport
          </button>
        </div>
      )}
    </WebsiteLayout>
  );
};

export default LandingPage;
