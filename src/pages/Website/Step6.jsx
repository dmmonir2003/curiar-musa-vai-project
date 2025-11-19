/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import JobAddLayout from "../../Layouts/JobAddLayout";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";

import belga from "./../../assets/belga.jpg";
import onlineveiling from "./../../assets/onlineveiling.webp";
import troostwijk from "./../../assets/troostwijk-logo.svg";
import vavato from "./../../assets/vavato.webp";
import ModalPopup from "../../Components/Modal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import {
  CREATE_PAYMENT,
  MAPS_API_KEY,
  NEW_COURIER_REQUEST,
  UPDATE_COURIER_REQUEST,
} from "../../constants";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../../store/userSlice";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const Step5 = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const openModal = () => setModalOpen(true);
  const [tab, setTab] = useState(1);
  const closeModal = () => setModalOpen(false);
  const [pickuphelp, setPickuphelp] = useState(false);
  const [deliveryhelp, setDeliveryhelp] = useState(false);
  const { submitData } = useCreateOrEdit();
  const user = useSelector(selectUser);
  // console.log(user, "USER DATA");
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const formValues = JSON.parse(localStorage.getItem("formValues")) || {};
  console.log("formValues:", formValues); // Log all form values

  // Form validation schema
  const validationSchema = Yup.object().shape({
    // firstName: Yup.string().required("First name is required"),
    firstName: Yup.string().required(
      tab === 1 ? "First Name is required" : "This field is required"
    ),
    // lastName: Yup.string().required({tab==1 ? "VIN Number is required" : ""}),
    lastName: Yup.string().required(
      tab === 1 ? "Last Name is required" : "This field is required"
    ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Phone number too short")
      .max(12, "Phone number too long")
      .required("Phone number is required"),
    pickupStreet: Yup.string().required("Pickup street is required"),
    pickupZipCode: Yup.string().required("Pickup zip code is required"),
    pickupCity: Yup.string().required("Pickup city is required"),
    deliveryStreet: Yup.string().required("Delivery street is required"),
    deliveryZipCode: Yup.string().required("Delivery zip code is required"),
    deliveryCity: Yup.string().required("Delivery city is required"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
    acceptPrivacy: Yup.boolean().oneOf(
      [true],
      "You must accept the privacy policy"
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: formValues.firstName || user?.firstName,
      lastName: formValues.lastName || user?.lastName,
      email: formValues.email || user?.email,
      phoneNumber: formValues.phoneNumber || user?.phoneNumber,
      pickupStreet: formValues.pickupStreet || "",
      pickupZipCode: formValues.pickupZipCode || "",
      pickupCity: formValues.pickupCity || "",
      pickupState: formValues.pickupState || "",
      pickupCountry: formValues.pickupCountry || "",
      pickupAdditionalInfo: formValues.pickupAdditionalInfo || "",
      deliveryStreet: formValues.deliveryStreet || "",
      deliveryState: formValues.deliveryState || "",
      deliveryCountry: formValues.deliveryCountry || "",
      deliveryZipCode: formValues.deliveryZipCode || "",
      deliveryCity: formValues.deliveryCity || "",
      deliveryAdditionalInfo: formValues.deliveryAdditionalInfo || "",
      newsletter: formValues.newsletter || false,
      acceptTerms: formValues.acceptTerms || false,
      acceptPrivacy: formValues.acceptPrivacy || false,
      userType: tab || 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      PayNowProcess(values);
    },
  });

  useEffect(() => {
    console.log("Formik values changed:", formik.values);
  }, [formik.values]);

  const UpdateHelp = (val) => {
    if (!pickuphelp) {
      localStorage.setItem("helppickup", val);
      setPickuphelp(true);
    } else {
      localStorage.setItem("helpdelivery", val);
      navigate("/request/form/step/6");
    }
  };

  const isEditing = localStorage.getItem("isEditing");

  const PayNowProcess = async (values) => {
    if (!isAuthenticated) {
      localStorage.setItem("formValues", JSON.stringify(values));
      localStorage.setItem("redirect", JSON.stringify("/request/form/step/6"));
      toast.error("Please login to continue");
      navigate("/login/user");
      return;
    }
    console.log("Form values:", values); // Log all form values
    localStorage.setItem("payment", "true");
    //step 1
    // Step 1: Retrieve location data from localStorage
    const location = JSON.parse(localStorage.getItem("location"));

    const fromAddress = {
      address: localStorage.getItem("fromAddress"),
      country: localStorage.getItem("fromCountry"),
      region: localStorage.getItem("fromRegion"),
      city: localStorage.getItem("fromCity") || "", // Optional
      postalCode: localStorage.getItem("fromPostalCode") || "", // Optional
      lat: parseFloat(localStorage.getItem("fromlat")),
      lng: parseFloat(localStorage.getItem("fromlng")),
    };

    const toAddress = {
      address: localStorage.getItem("toAddress"),
      country: localStorage.getItem("toCountry"),
      region: localStorage.getItem("toRegion"),
      city: localStorage.getItem("toCity") || "", // Optional
      postalCode: localStorage.getItem("toPostalCode") || "", // Optional
      lat: parseFloat(localStorage.getItem("tolat")),
      lng: parseFloat(localStorage.getItem("tolng")),
    };

    //step 2
    const pickupType = localStorage.getItem("type_transport");
    const itemSource = localStorage.getItem("transportoption");
    // step 3
    const items = JSON.parse(localStorage.getItem("itemslist"));
    //step 4

    const pickupDate = localStorage.getItem("pickup");
    const pickupTime = localStorage.getItem("pickuptimename");
    const delieveryTime = localStorage.getItem("deliverytimename");
    // const [start, end] = pickupTime.split(" - ");
    const cost = Number(localStorage.getItem("pickuptimeprice"));

    const timeSlot = {
      start: pickupTime,
      end: delieveryTime,
      cost,
    };

    //step 5
    const floor = localStorage.getItem("helpdelivery");
    const helpers = localStorage.getItem("help") === "No Help" ? 1 : 2;
    const help = localStorage.getItem("help");

    const extraServices = {
      floor,
      helpers,
      help,
    };

    // step 6
    const contactDetails = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    const pickupContact = {
      smartHomeAddress: values.pickupStreet,
      city: values.pickupCity,
      region: values.pickupState,  
      country: values.pickupCountry,
      zipCode: values.pickupZipCode,
      additionalInfo: values.pickupAdditionalInfo,
    };

    const deliveryContact = {
      smartHomeAddress: values.deliveryStreet,
      region: values.deliveryState,
      country: values.deliveryCountry,
      city: values.deliveryCity,
      zipCode: values.deliveryZipCode,
      additionalInfo: values.deliveryAdditionalInfo,
    };

    const subscribeToNewsletter = values.newsletter;
    const agreedToTerms = values.acceptTerms;
    const agreedTopPrivacy = values.acceptPrivacy;
    const totalPrice = localStorage.getItem("totalprice");

    try {
      const payload = {
        userId: user?._id,
        fromAddress,
        toAddress,
        pickupType,
        itemSource,
        items,
        pickupDate,
        timeSlot,
        extraServices,
        contactDetails,
        pickupContact,
        deliveryContact,
        subscribeToNewsletter,
        agreedToTerms,
        agreedTopPrivacy,
        totalPrice,
        userType: tab === 1 ? "Individual" : "Business",
        companyName: tab === 2 ? values.firstName : "",
        vinNumber: tab === 2 ? values.lastName : "",
      };
      // console.log("final courier payload", payload); // Log all form values

      const _id = localStorage.getItem("_id");
      setLoading(true);

      if (isEditing && _id) {
        const response = await submitData(
          `${UPDATE_COURIER_REQUEST}/${_id}`,
          payload,
          "PUT"
        );
        toast.success(response.data.message);
        Object.keys(localStorage).forEach((key) => {
          if (key !== "type" && key !== "persist:root" && key !== "messages") {
            localStorage.removeItem(key);
          }
        });
        navigate("/dashboard");
      } else {
        const response = await submitData(CREATE_PAYMENT, payload, "POST");

        // Clear localStorage (as you already do)
        Object.keys(localStorage).forEach((key) => {
          if (key !== "type" && key !== "persist:root" && key !== "messages") {
            localStorage.removeItem(key);
          }
        });

        // toast.success(response.data.message);

        // ✅ Redirect to Mollie payment page
        if (response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl; // redirect to Mollie payment page
          localStorage.setItem("paymentId", response.data.paymentId);
        } else {
          toast.error("Payment URL not found.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
    // toast.success("Your payment has been made successfully");
    // navigate("/");
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const pickupLocationRef = useRef(null);

  const handlePickupLocationChanged = () => {
  const [place] = pickupLocationRef.current.getPlaces();
  if (!place) return;

  const components = place.address_components || [];

  // Helper function to extract address parts
  const extractComponent = (components, types) => {
    const component = components.find(c => types.every(t => c.types.includes(t)));
    return component ? component.long_name : '';
  };

  const formattedAddress = place.formatted_address || '';
  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();
  const country = extractComponent(components, ['country']);
  const region = extractComponent(components, ['administrative_area_level_1']); // state
  const city =
    extractComponent(components, ['locality']) ||
    extractComponent(components, ['administrative_area_level_2']);
  const postalCode = extractComponent(components, ['postal_code']);

  // Set values in Formik
  formik.setFieldValue("pickupStreet", formattedAddress);
  formik.setFieldValue("pickupCity", city);
  formik.setFieldValue("pickupState", region);
  formik.setFieldValue("pickupCountry", country);
  // formik.setFieldValue("pickupZipCode", postalCode);
  // formik.setFieldValue("pickupLat", lat);
  // formik.setFieldValue("pickupLng", lng);

  console.log("Pickup Location:", { formattedAddress, city, region, country, postalCode, lat, lng });
};


  const deliveryLocationRef = useRef(null);

 const handleDeliveryLocationChanged = () => {
  const [place] = deliveryLocationRef.current.getPlaces();
  if (!place) return;

  const components = place.address_components || [];

  // Helper function to extract specific components
  const extractComponent = (components, types) => {
    const component = components.find(c => types.every(t => c.types.includes(t)));
    return component ? component.long_name : '';
  };

  const formattedAddress = place.formatted_address || '';
  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();
  const country = extractComponent(components, ['country']);
  const region = extractComponent(components, ['administrative_area_level_1']); // state/province
  const city =
    extractComponent(components, ['locality']) ||
    extractComponent(components, ['administrative_area_level_2']);
  const postalCode = extractComponent(components, ['postal_code']);

  // Set values in Formik
  formik.setFieldValue("deliveryStreet", formattedAddress);
  formik.setFieldValue("deliveryCity", city);
  formik.setFieldValue("deliveryState", region);
  formik.setFieldValue("deliveryCountry", country);
  // formik.setFieldValue("deliveryPostalCode", postalCode);
  // formik.setFieldValue("deliveryLat", lat);
  // formik.setFieldValue("deliveryLng", lng);

  console.log("Delivery Location:", { formattedAddress, city, region, country, postalCode, lat, lng });
};


  const autocompleteOptions = {
    componentRestrictions: { country: "nl" }, // Restrict to Netherlands
    types: ["address"], // Only allow address (no cities, regions)
  };

  return (
    <JobAddLayout>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <h2 className="font-bold text-[18px] text-[var(--primary-color)] uppercase">
            Contact
          </h2>
          <p className="mt-2">Fill in your contact details</p>
          <p>
            How can we contact you? With these contact details we will keep you
            up to date on your transport.
          </p>

          <div className="flex justify-start items-center gap-3 mb-4 mt-4">
            <button
              type="button"
              onClick={() => {
                setTab(1);
                // formik.values.userType = 1;
                formik.setFieldValue("userType", 1);
              }}
              className={`auth_button !w-[110px] !h-[40px] !font-normal !text-[12px] !shadow-lg ${
                tab === 2 ? "!bg-white !text-black" : ""
              }`}
            >
              Individueel
            </button>
            <button
              type="button"
              onClick={() => {
                setTab(2);
                // formik.setFieldValue("role", "Business");
                // formik.values.userType = 2;
                formik.setFieldValue("userType", 2);
              }}
              className={`auth_button !w-[110px] !h-[40px] ${
                tab === 1 ? "!bg-white !text-black" : ""
              } !font-normal !text-[12px] !shadow-lg`}
            >
              Business
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 mt-10 gap-5">
            <div className="form-group mt-1">
              <label>
                {tab === 1 ? "First Name" : "Company Name"}{" "}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control !pl-4"
                placeholder={tab === 1 ? "First Name" : "Company Name"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="form-group mt-1">
              <label>
                {tab === 1 ? "Last Name" : "VIN Number"}{" "}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control !pl-4"
                placeholder={tab === 1 ? "Last Name" : "VIN Number"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label>
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control !pl-4"
                placeholder="Email Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label>
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                placeholder="Phone Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              <div className="icon_input !top-[37px] font-bold text-[#777777]">
                +31
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-[18px] mt-3 text-[var(--primary-color)] uppercase">
              Pickup address contact details
            </h2>
            <div className="form-group mt-4 w-full">
              <label>
                Street Name/Address <span className="required">*</span>
              </label>
              {isLoaded && (
                <div className="w-full">
                  <StandaloneSearchBox
                    onLoad={(ref) => (pickupLocationRef.current = ref)}
                    onPlacesChanged={handlePickupLocationChanged}
                  >
                    <input
                      type="text"
                      name="pickupStreet"
                      className={`form-control !pl-4 w-full ${
                        formik.touched.pickupStreet &&
                        formik.errors.pickupStreet
                          ? "error"
                          : ""
                      }`}
                      placeholder="Street Name/Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pickupStreet}
                      required
                    />
                  </StandaloneSearchBox>
                </div>
              )}
              {formik.touched.pickupStreet && formik.errors.pickupStreet ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.pickupStreet}
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 mt-1 gap-5">
              <div className="form-group mt-1">
                <label>
                  Zip Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="pickupZipCode"
                  className="form-control !pl-4"
                  placeholder="Zip Code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pickupZipCode}
                />
                {formik.touched.pickupZipCode && formik.errors.pickupZipCode ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.pickupZipCode}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label>
                  City/State <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="pickupCity"
                  className="form-control !pl-4"
                  placeholder="City/State"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pickupCity}
                />
                {formik.touched.pickupCity && formik.errors.pickupCity ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.pickupCity}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label>Additional Information</label>
              <textarea
                type="text"
                name="pickupAdditionalInfo"
                className="form-control !pl-4 h-[100px]"
                placeholder="Additional info for the courier at this address (optional)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pickupAdditionalInfo}
              ></textarea>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-[18px] mt-3 text-[var(--primary-color)] uppercase">
              Delivery address contact details
            </h2>
            <div className="form-group mt-4 w-full">
              <label>
                Street Name/Address <span className="required">*</span>
              </label>
              {isLoaded && (
                <div className="w-full">
                  <StandaloneSearchBox
                    onLoad={(ref) => (deliveryLocationRef.current = ref)}
                    onPlacesChanged={handleDeliveryLocationChanged}
                  >
                    <input
                      name="deliveryStreet"
                      className={`form-control !pl-4 w-full ${
                        formik.touched.deliveryStreet &&
                        formik.errors.deliveryStreet
                          ? "error"
                          : ""
                      }`}
                      placeholder="Street Name/Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.deliveryStreet}
                      required
                    />
                  </StandaloneSearchBox>
                </div>
              )}
              {formik.touched.deliveryStreet && formik.errors.deliveryStreet ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.deliveryStreet}
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 mt-1 gap-5">
              <div className="form-group mt-1">
                <label>
                  Zip Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="deliveryZipCode"
                  className="form-control !pl-4"
                  placeholder="Zip Code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deliveryZipCode}
                />
                {formik.touched.deliveryZipCode &&
                formik.errors.deliveryZipCode ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.deliveryZipCode}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label>
                  City/State <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="deliveryCity"
                  className="form-control !pl-4"
                  placeholder="City/State"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deliveryCity}
                />
                {formik.touched.deliveryCity && formik.errors.deliveryCity ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.deliveryCity}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label>Additional Information</label>
              <textarea
                type="text"
                name="deliveryAdditionalInfo"
                className="form-control !pl-4 h-[100px]"
                placeholder="Additional info for the courier at this address (optional)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deliveryAdditionalInfo}
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-5 text-[14px] text-[#92939E]">
            {/* <label className="cursor-pointer">
              <input 
                type="checkbox" 
                className="mr-2" 
                name="newsletter"
                onChange={formik.handleChange}
                checked={formik.values.newsletter}
              /> 
              <span>Yes, I would like to subscribe to Koerier Platform's newsletter</span>
            </label> */}
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                name="acceptTerms"
                onChange={formik.handleChange}
                checked={formik.values.acceptTerms}
              />
              <span>
                By making use of Koerier's Platform, you have to agree with
                our's{" "}
                <a
                  href="/general-terms"
                  className="text-[blue] underline"
                  target="_blank"
                >
                  general terms
                </a>
                .
              </span>
              {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.acceptTerms}
                </div>
              ) : null}
            </label>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                name="acceptPrivacy"
                onChange={formik.handleChange}
                checked={formik.values.acceptPrivacy}
              />
              <span>
                I agree with our's{" "}
                <a
                  href="/privacy-policy"
                  className="text-[blue] underline"
                  target="_blank"
                >
                  privacy statement
                </a>
                .
              </span>
              {formik.touched.acceptPrivacy && formik.errors.acceptPrivacy ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.acceptPrivacy}
                </div>
              ) : null}
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="website_button !px-12 !h-[60px] hover:bg-[#202020] bg-[var(--primary-color)] uppercase flex items-center gap-1 mt-10"
            disabled={loading}
          >
            <MdOutlineAttachMoney size={24} />
            <span>
              {loading ? "Submitting" : isEditing ? "Update" : "PAY NOW"}
            </span>
          </button>
        </div>
      </form>

      {/* MODAL POPUP */}
      <ModalPopup
        open={modalOpen}
        close={closeModal}
        heading="Add your item(s)"
        content="additems"
        show_buttons={false}
        show_buttons_not={false}
      />
    </JobAddLayout>
  );
};

export default Step5;
