// import React, { useState } from "react";
// import WebsiteLayout from "../../Layouts/Website";
// import { SlLocationPin } from "react-icons/sl";
// import COURIER from "./../../assets/courier.jpg";
// import BOTTOM from "./../../assets/bottom.png";
// import BUSS from "./../../assets/buss.png";
// import Img1 from "./../../assets/1.png";
// import Img2 from "./../../assets/2.png";
// import Img3 from "./../../assets/3.png";
// import Img4 from "./../../assets/4.png";
// import OP1 from "./../../assets/op1.svg";
// import OP2 from "./../../assets/op2.svg";
// import OP3 from "./../../assets/op3.svg";
// import Delivery from "./../../assets/delivery.svg";
// import ANIMATION from "./../../assets/animation.gif";
// import { LuCircleArrowDown, LuCircleArrowUp } from "react-icons/lu";
// import AosWrapper from "../../Layouts/AOS";
// import Slider from "./Slider";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useCreateOrEdit from "../../hooks/useCreateOrEdit";
// import { MAPS_API_KEY, REGISTER_COURIER } from "../../constants";
// import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
// import { useRef } from "react";

// const CourierSignup = () => {
//   const navigate = useNavigate();
//   const [active, setActive] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewImages, setPreviewImages] = useState([]);
//   const { submitData } = useCreateOrEdit();
//   const companyLocationRef = useRef(null);
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   const handleCompanyLocationChanged = () => {
//     if (companyLocationRef.current) {
//       const places = companyLocationRef.current.getPlaces();
//       if (places && places.length > 0) {
//         const place = places[0];
//         formik.setFieldValue("companyLocation", place.formatted_address);
//         formik.setFieldValue("lat", place.geometry.location.lat());
//         formik.setFieldValue("lng", place.geometry.location.lng());

//         // If you need additional location data (lat/lng):
//         // formik.setFieldValue('companyLat', place.geometry.location.lat());
//         // formik.setFieldValue('companyLng', place.geometry.location.lng());
//       }
//     }
//   };

//   // Form validation schema
//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     phoneNumber: Yup.string()
//       .matches(/^[0-9]+$/, "Must be only digits")
//       .min(9, "Must be at least 9 digits")
//       .required("Phone Number is required"),
//     companyName: Yup.string().required("Company Name is required"),
//     communicationMode: Yup.string().required("Communication Mode is required"),
//     companyLocation: Yup.string().required("Company Location is required"),
//     howYouKnow: Yup.string().required("This field is required"),
//     experienceWithCourier: Yup.string().required(
//       "Experience With Courier is required"
//     ),
//     lat: Yup.number().required("Latitude is required"),
//     lng: Yup.number().required("Longitude is required"),
//     companyLegalForm: Yup.string().required("Legal Form is required"),
//     document: Yup.array()
//       .min(1, "At least one document is required")
//       .required("Document are required"),
//   });

//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);

//     if (files.length === 0) return;

//     const newPreviewImages = [];
//     const newDocuments = [];

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         newPreviewImages.push(reader.result);
//         newDocuments.push({
//           name: file.name,
//           type: file.type,
//           size: file.size,
//           base64: reader.result.split(",")[1], // Extract base64 part
//         });

//         // Update state when all files are processed
//         if (newPreviewImages.length === files.length) {
//           setPreviewImages([...previewImages, ...newPreviewImages]);
//           formik.setFieldValue("document", [
//             ...(formik.values.documents || []),
//             ...newDocuments,
//           ]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index) => {
//     const newPreviewImages = [...previewImages];
//     const newDocuments = [...formik.values.documents];

//     newPreviewImages.splice(index, 1);
//     newDocuments.splice(index, 1);

//     setPreviewImages(newPreviewImages);
//     formik.setFieldValue("documents", newDocuments);
//   };

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phoneNumber: "",
//       companyName: "",
//       communicationMode: "",
//       companyLocation: "",
//       howYouKnow: "",
//       experienceWithCourier: "",
//       companyLegalForm: "",
//       document: [],
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       console.log("Form submitted with values:", values);
//       const payload = {
//         ...values,
//         companyLocation: {
//           address: values.companyLocation,
//           lat: values.lat,
//           lng: values.lng,
//         },
//       };
//       try {
//         setLoading(true);
//         console.log(payload);
//         const response = await submitData(REGISTER_COURIER, payload, "POST");
//         toast.success(
//           "Your account has been created successfully and activated successfully! Our team will also verify your account and you will be notified."
//         );
//         navigate("/login/courier");
//       } catch (error) {
//         setLoading(false);
//         console.log(error);
//         toast.error(error?.response?.data?.msg);
//       }
//     },
//   });

//   return (
//     <WebsiteLayout>
//       <AosWrapper>
//         <div className="container_custom terms_data !mb-[100px] !mt-[80px]">
//           <div className="mb-10">
//             <h2 className="font-bold text-4xl mb-2">
//               Freelance courier? Find extra driver jobs
//             </h2>
//             <p>
//               Our representative will connect with you and you will get an email
//               when you account is approved.
//             </p>
//           </div>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="flex justify-between items-stretch gap-16 md:flex-row flex-col">
//               <div className="w-full md:w-2/3">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* First Name */}
//                   <div className="form-group mt-1">
//                     <label>
//                       First Name <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       className={`form-control !pl-4 ${
//                         formik.touched.firstName && formik.errors.firstName
//                           ? "error"
//                           : ""
//                       }`}
//                       placeholder="First Name"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.firstName}
//                     />
//                     {formik.touched.firstName && formik.errors.firstName && (
//                       <div className="text-red-500 text-sm">
//                         {formik.errors.firstName}
//                       </div>
//                     )}
//                   </div>

//                   {/* Last Name */}
//                   <div className="form-group mt-1">
//                     <label>
//                       Last Name <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       className={`form-control !pl-4 ${
//                         formik.touched.lastName && formik.errors.lastName
//                           ? "error"
//                           : ""
//                       }`}
//                       placeholder="Last Name"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.lastName}
//                     />
//                     {formik.touched.lastName && formik.errors.lastName && (
//                       <div className="text-red-500 text-sm">
//                         {formik.errors.lastName}
//                       </div>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="form-group">
//                     <label>
//                       Email Address <span className="required">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       className={`form-control !pl-4 ${
//                         formik.touched.email && formik.errors.email
//                           ? "error"
//                           : ""
//                       }`}
//                       placeholder="Email Address"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.email}
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                       <div className="text-red-500 text-sm">
//                         {formik.errors.email}
//                       </div>
//                     )}
//                   </div>

//                   {/* Phone Number */}
//                   <div className="form-group">
//                     <label>
//                       Phone Number <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="phoneNumber"
//                       className={`form-control ${
//                         formik.touched.phoneNumber && formik.errors.phoneNumber
//                           ? "error"
//                           : ""
//                       }`}
//                       placeholder="Phone Number"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.phoneNumber}
//                     />
//                     <div className="icon_input !top-[37px] font-bold text-[#777777]">
//                       +31
//                     </div>
//                     {formik.touched.phoneNumber &&
//                       formik.errors.phoneNumber && (
//                         <div className="text-red-500 text-sm">
//                           {formik.errors.phoneNumber}
//                         </div>
//                       )}
//                   </div>

//                   {/* Company Name */}
//                   <div className="form-group mt-1">
//                     <label>
//                       Company Name <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="companyName"
//                       className={`form-control !pl-4 ${
//                         formik.touched.companyName && formik.errors.companyName
//                           ? "error"
//                           : ""
//                       }`}
//                       placeholder="Company Name"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.companyName}
//                     />
//                     {formik.touched.companyName &&
//                       formik.errors.companyName && (
//                         <div className="text-red-500 text-sm">
//                           {formik.errors.companyName}
//                         </div>
//                       )}
//                   </div>

//                   {/* Communication Mode */}
//                   <div className="form-group mt-1">
//                     <label>
//                       Mode of Communication <span className="required">*</span>
//                     </label>
//                     <select
//                       name="communicationMode"
//                       className={`form-control !pl-4 ${
//                         formik.touched.communicationMode &&
//                         formik.errors.communicationMode
//                           ? "error"
//                           : ""
//                       }`}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.communicationMode}
//                     >
//                       <option value="">Mode of Communication</option>
//                       <option value="WhatsApp">WhatsApp</option>
//                       <option value="Text message">Text message</option>
//                     </select>
//                     {formik.touched.communicationMode &&
//                       formik.errors.communicationMode && (
//                         <div className="text-red-500 text-sm">
//                           {formik.errors.communicationMode}
//                         </div>
//                       )}
//                   </div>
//                 </div>

//                 {/* Company Location */}
//                 <div className="form-group mt-1">
//                   <label>
//                     Company Location <span className="required">*</span>
//                   </label>
//                   {isLoaded && (
//                     <div className="w-full">
//                       {" "}
//                       {/* Add this wrapper div */}
//                       <StandaloneSearchBox
//                         onLoad={(ref) => (companyLocationRef.current = ref)}
//                         onPlacesChanged={handleCompanyLocationChanged}
//                       >
//                         <input
//                           name="companyLocation"
//                           className={`form-control !pl-4 w-full ${
//                             formik.touched.companyLocation &&
//                             formik.errors.companyLocation
//                               ? "error"
//                               : ""
//                           }`}
//                           placeholder="Company Location"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.companyLocation}
//                           required
//                         />
//                       </StandaloneSearchBox>
//                     </div>
//                   )}
//                   {formik.touched.companyLocation &&
//                     formik.errors.companyLocation && (
//                       <div className="text-red-500 text-sm">
//                         {formik.errors.companyLocation}
//                       </div>
//                     )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* How you know about us */}
//                   <div className="form-group mt-1">
//                     <label>
//                       How you know about us? <span className="required">*</span>
//                     </label>
//                     <select
//                       name="howYouKnow"
//                       className={`form-control !pl-4 ${
//                         formik.touched.howYouKnow && formik.errors.howYouKnow
//                           ? "error"
//                           : ""
//                       }`}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.howYouKnow}
//                     >
//                       <option value="">How you know</option>
//                       <option value="Social Media">Social Media</option>
//                       <option value="Website">Website</option>
//                       <option value="Google">Google</option>
//                     </select>
//                     {formik.touched.howYouKnow && formik.errors.howYouKnow && (
//                       <div className="text-red-500 text-sm">
//                         {formik.errors.howYouKnow}
//                       </div>
//                     )}
//                   </div>

//                   {/* Experience */}
//                   <div className="form-group mt-1">
//                     <label>
//                       What is your experience with courier work{" "}
//                       <span className="required">*</span>
//                     </label>
//                     <select
//                       name="experienceWithCourier"
//                       className={`form-control !pl-4 ${
//                         formik.touched.experienceWithCourier &&
//                         formik.errors.experienceWithCourier
//                           ? "error"
//                           : ""
//                       }`}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.experienceWithCourier}
//                     >
//                       <option value="">Experience with Courier Work</option>
//                       <option value="Parcel delivery DHL/PostNL">
//                         Parcel delivery DHL/PostNL
//                       </option>
//                       <option value="Mover">Mover</option>
//                       <option value="Furniture transporter">
//                         Furniture transporter
//                       </option>
//                       <option value="Others">
//                         Other: laminate layer, pallet transporter, etc.
//                       </option>
//                     </select>
//                     {formik.touched.experienceWithCourier &&
//                       formik.errors.experienceWithCourier && (
//                         <div className="text-red-500 text-sm">
//                           {formik.errors.experienceWithCourier}
//                         </div>
//                       )}
//                   </div>

//                   {/* Legal Form */}
//                   <div className="form-group mt-1">
//                     <label>
//                       What is the legal form of your company?{" "}
//                       <span className="required">*</span>
//                     </label>
//                     <select
//                       name="companyLegalForm"
//                       className={`form-control !pl-4 ${
//                         formik.touched.companyLegalForm &&
//                         formik.errors.companyLegalForm
//                           ? "error"
//                           : ""
//                       }`}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.companyLegalForm}
//                     >
//                       <option value="">Company Legal form</option>
//                       <option value="Sole proprietorship/self-employed">
//                         Sole proprietorship/self-employed
//                       </option>
//                       <option value="BV">BV</option>
//                       <option value="VOF">VOF</option>
//                       <option value="Zzp">Zzp</option>
//                       <option value="Eenmanszaak">Eenmanszaak</option>
//                     </select>
//                     {formik.touched.companyLegalForm &&
//                       formik.errors.companyLegalForm && (
//                         <div className="text-red-500 text-sm">
//                           {formik.errors.companyLegalForm}
//                         </div>
//                       )}
//                   </div>
//                 </div>

//                 {/* Document Upload Section */}
//                 <div className="form-group mt-4">
//                   <label>
//                     Upload Documents (ID, License, etc.){" "}
//                     <span className="required">*</span>
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
//                     <input
//                       type="file"
//                       id="document-upload"
//                       className="hidden"
//                       onChange={handleFileUpload}
//                       multiple
//                       accept="image/*,.pdf,.doc,.docx"
//                     />
//                     <label
//                       htmlFor="document-upload"
//                       className="cursor-pointer block"
//                     >
//                       <div className="flex flex-col items-center justify-center py-4">
//                         <svg
//                           className="w-12 h-12 text-gray-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                           ></path>
//                         </svg>
//                         <p className="mt-2 text-sm text-gray-600">
//                           Click to upload or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           PNG, JPG, PDF, DOC up to 10MB
//                         </p>
//                       </div>
//                     </label>
//                   </div>
//                   {formik.touched.documents && formik.errors.documents && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {formik.errors.documents}
//                     </div>
//                   )}
//                 </div>

//                 {/* Preview Uploaded Images */}
//                 {previewImages.length > 0 && (
//                   <div className="mt-4">
//                     <h4 className="text-sm font-medium mb-2">
//                       Uploaded Documents:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {previewImages.map((image, index) => (
//                         <div key={index} className="relative">
//                           {image.startsWith("data:image") ? (
//                             <img
//                               src={image}
//                               alt={`Preview ${index}`}
//                               className="h-24 w-24 object-cover rounded border"
//                             />
//                           ) : (
//                             <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded border">
//                               <span className="text-xs text-gray-500">
//                                 {formik.values.documents[index]?.name ||
//                                   "Document"}
//                               </span>
//                             </div>
//                           )}
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="w-full md:w-[40%]">
//                 <img src={COURIER} alt="Courier" />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="website_button !px-12 !h-[60px] hover:bg-[#202020] bg-[var(--primary-color)] uppercase flex items-center gap-1 mt-10"
//               >
//                 <span>{loading ? "Processing..." : "Register Now"}</span>
//               </button>
//             </div>
//           </form>
//         </div>
//       </AosWrapper>
//     </WebsiteLayout>
//   );
// };

// export default CourierSignup;

import React, { useState } from "react";
import WebsiteLayout from "../../Layouts/Website";
import COURIER from "./../../assets/courier.jpg";
// ... (other image imports)
import { LuCircleArrowDown, LuCircleArrowUp } from "react-icons/lu";
import AosWrapper from "../../Layouts/AOS";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import { MAPS_API_KEY, REGISTER_COURIER } from "../../constants";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useRef } from "react";

const CourierSignup = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]); // Will store { url, type, name }
  const { submitData } = useCreateOrEdit();
  const companyLocationRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleCompanyLocationChanged = () => {
    if (companyLocationRef.current) {
      const places = companyLocationRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        formik.setFieldValue("companyLocation", place.formatted_address);
        // We don't need to set lat/lng in formik,
        // as the schema only accepts a string for companyLocation
      }
    }
  };

  // --- 1. VALIDATION SCHEMA (Corrected) ---
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string() // <-- RENAMED
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Must be at least 9 digits")
      .required("Phone Number is required"),
    password: Yup.string() // <-- ADDED
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string() // <-- ADDED
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    companyName: Yup.string().required("Company Name is required"),
    communicationMode: Yup.string().required("Communication Mode is required"),
    companyLocation: Yup.string().required("Company Location is required"),
    howKnow: Yup.string().required("This field is required"), // <-- RENAMED
    courierExperience: Yup.string().required(
      // <-- RENAMED
      "Experience With Courier is required"
    ),
    legalForm: Yup.string().required("Legal Form is required"), // <-- RENAMED
    document: Yup.array()
      .min(1, "At least one document is required")
      .required("Documents are required"),
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newPreviewObjects = [];
    const newFileObjects = [];

    files.forEach((file) => {
      newPreviewObjects.push({
        url: URL.createObjectURL(file),
        type: file.type,
        name: file.name,
      });
      newFileObjects.push(file);
    });

    setPreviewImages([...previewImages, ...newPreviewObjects]);
    formik.setFieldValue("document", [
      ...(formik.values.document || []),
      ...newFileObjects,
    ]);
  };

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    const newDocument = [...formik.values.document];

    URL.revokeObjectURL(newPreviewImages[index].url);

    newPreviewImages.splice(index, 1);
    newDocument.splice(index, 1);

    setPreviewImages(newPreviewImages);
    formik.setFieldValue("document", newDocument);
  };

  const formik = useFormik({
    // --- 2. INITIAL VALUES (Corrected) ---
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "", // <-- RENAMED
      password: "", // <-- ADDED
      confirmPassword: "", // <-- ADDED
      companyName: "",
      communicationMode: "",
      companyLocation: "",
      howKnow: "", // <-- RENAMED
      courierExperience: "", // <-- RENAMED
      legalForm: "", // <-- RENAMED
      document: [],
    },
    validationSchema,
    // --- 3. ON SUBMIT (Corrected) ---
    onSubmit: async (values) => {
      setLoading(true);

      // 1. Create the JSON payload that matches the Mongoose Schema
      const payload = {
        name: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: "courier", // <-- ADDED required role
        companyName: values.companyName,
        companyLocation: values.companyLocation, // <-- FIXED: Sending string, not object
        communicationMode: values.communicationMode, // <-- Value fixed in JSX
        howKnow: values.howKnow, // <-- Value fixed in JSX
        courierExperience: values.courierExperience,
        legalForm: values.legalForm,
      };

      // 2. Create FormData
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      // 3. Append files
      if (values.document && values.document.length > 0) {
        values.document.forEach((file) => {
          formData.append("document", file); // Backend expects 'document'
        });
      }

      // 4. Send the request
      try {
        const response = await submitData(REGISTER_COURIER, formData, "POST");
        toast.success(
          "Your account has been created successfully and activated successfully! Our team will also verify your account and you will be notified."
        );
        navigate("/login/courier");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(error?.response?.data?.msg);
      }
    },
  });

  return (
    <WebsiteLayout>
      <AosWrapper>
        <div className="container_custom terms_data !mb-[100px] !mt-[80px]">
          <div className="mb-10">
            <h2 className="font-bold text-4xl mb-2">
              Freelance courier? Find extra driver jobs
            </h2>
            <p>
              Our representative will connect with you and you will get an email
              when you account is approved.
            </p>
          </div>

          {/* --- 4. JSX (Corrected) --- */}
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-between items-stretch gap-16 md:flex-row flex-col">
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="form-group mt-1">
                    <label>
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control !pl-4 ${
                        formik.touched.firstName && formik.errors.firstName
                          ? "error"
                          : ""
                      }`}
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="form-group mt-1">
                    <label>
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control !pl-4 ${
                        formik.touched.lastName && formik.errors.lastName
                          ? "error"
                          : ""
                      }`}
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label>
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control !pl-4 ${
                        formik.touched.email && formik.errors.email
                          ? "error"
                          : ""
                      }`}
                      placeholder="Email Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Number (name="phone") */}
                  <div className="form-group">
                    <label>
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone" // <-- RENAMED
                      className={`form-control ${
                        formik.touched.phone && formik.errors.phone
                          ? "error"
                          : ""
                      }`}
                      placeholder="Phone Number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    <div className="icon_input !top-[37px] font-bold text-[#777777]">
                      +31
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Password (ADDED) */}
                  <div className="form-group">
                    <label>
                      Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control !pl-4 ${
                        formik.touched.password && formik.errors.password
                          ? "error"
                          : ""
                      }`}
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password (ADDED) */}
                  <div className="form-group">
                    <label>
                      Confirm Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control !pl-4 ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "error"
                          : ""
                      }`}
                      placeholder="Confirm Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>

                  {/* Company Name */}
                  <div className="form-group mt-1">
                    <label>
                      Company Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className={`form-control !pl-4 ${
                        formik.touched.companyName && formik.errors.companyName
                          ? "error"
                          : ""
                      }`}
                      placeholder="Company Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.companyName}
                    />
                    {formik.touched.companyName &&
                      formik.errors.companyName && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.companyName}
                        </div>
                      )}
                  </div>

                  {/* Communication Mode (values corrected) */}
                  <div className="form-group mt-1">
                    <label>
                      Mode of Communication <span className="required">*</span>
                    </label>
                    <select
                      name="communicationMode"
                      className={`form-control !pl-4 ${
                        formik.touched.communicationMode &&
                        formik.errors.communicationMode
                          ? "error"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.communicationMode}
                    >
                      <option value="">Mode of Communication</option>
                      <option value="whatsapp">WhatsApp</option>{" "}
                      {/* <-- FIXED VALUE */}
                      <option value="textMessage">Text message</option>{" "}
                      {/* <-- FIXED VALUE */}
                    </select>
                    {formik.touched.communicationMode &&
                      formik.errors.communicationMode && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.communicationMode}
                        </div>
                      )}
                  </div>
                </div>

                {/* Company Location */}
                <div className="form-group mt-1">
                  <label>
                    Company Location <span className="required">*</span>
                  </label>
                  {isLoaded && (
                    <div className="w-full">
                      <StandaloneSearchBox
                        onLoad={(ref) => (companyLocationRef.current = ref)}
                        onPlacesChanged={handleCompanyLocationChanged}
                      >
                        <input
                          name="companyLocation"
                          className={`form-control !pl-4 w-full ${
                            formik.touched.companyLocation &&
                            formik.errors.companyLocation
                              ? "error"
                              : ""
                          }`}
                          placeholder="Company Location"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.companyLocation}
                          required
                        />
                      </StandaloneSearchBox>
                    </div>
                  )}
                  {formik.touched.companyLocation &&
                    formik.errors.companyLocation && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.companyLocation}
                      </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* How you know (name="howKnow", values corrected) */}
                  <div className="form-group mt-1">
                    <label>
                      How you know about us? <span className="required">*</span>
                    </label>
                    <select
                      name="howKnow" // <-- RENAMED
                      className={`form-control !pl-4 ${
                        formik.touched.howKnow && formik.errors.howKnow
                          ? "error"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.howKnow}
                    >
                      <option value="">How you know</option>
                      <option value="socialMedia">Social Media</option>{" "}
                      {/* <-- FIXED VALUE */}
                      <option value="website">Website</option>{" "}
                      {/* <-- FIXED VALUE */}
                      <option value="google">Google</option>{" "}
                      {/* <-- FIXED VALUE */}
                    </select>
                    {formik.touched.howKnow && formik.errors.howKnow && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.howKnow}
                      </div>
                    )}
                  </div>

                  {/* Experience (name="courierExperience") */}
                  <div className="form-group mt-1">
                    <label>
                      What is your experience with courier work{" "}
                      <span className="required">*</span>
                    </label>
                    <select
                      name="courierExperience" // <-- RENAMED
                      className={`form-control !pl-4 ${
                        formik.touched.courierExperience &&
                        formik.errors.courierExperience
                          ? "error"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courierExperience}
                    >
                      <option value="">Experience with Courier Work</option>
                      <option value="Parcel delivery DHL/PostNL">
                        Parcel delivery DHL/PostNL
                      </option>
                      <option value="Mover">Mover</option>
                      <option value="Furniture transporter">
                        Furniture transporter
                      </option>
                      <option value="Others">
                        Other: laminate layer, pallet transporter, etc.
                      </option>
                    </select>
                    {formik.touched.courierExperience &&
                      formik.errors.courierExperience && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.courierExperience}
                        </div>
                      )}
                  </div>

                  {/* Legal Form (name="legalForm") */}
                  <div className="form-group mt-1">
                    <label>
                      What is the legal form of your company?{" "}
                      <span className="required">*</span>
                    </label>
                    <select
                      name="legalForm" // <-- RENAMED
                      className={`form-control !pl-4 ${
                        formik.touched.legalForm && formik.errors.legalForm
                          ? "error"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.legalForm}
                    >
                      <option value="">Company Legal form</option>
                      <option value="Sole proprietorship/self-employed">
                        Sole proprietorship/self-employed
                      </option>
                      <option value="BV">BV</option>
                      <option value="VOF">VOF</option>
                      <option value="Zzp">Zzp</option>
                      <option value="Eenmanszaak">Eenmanszaak</option>
                    </select>
                    {formik.touched.legalForm && formik.errors.legalForm && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.legalForm}
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="form-group mt-4">
                  <label>
                    Upload Document (ID, License, etc.){" "}
                    <span className="required">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="document-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="document-upload"
                      className="cursor-pointer block"
                    >
                      <div className="flex flex-col items-center justify-center py-4">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, PDF, DOC up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                  {formik.touched.document && formik.errors.document && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.document}
                    </div>
                  )}
                </div>

                {/* Preview Uploaded Images */}
                {previewImages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Uploaded Document:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {previewImages.map((item, index) => (
                        <div key={index} className="relative">
                          {item.type.startsWith("image") ? (
                            <img
                              src={item.url}
                              alt={`Preview ${index}`}
                              className="h-24 w-24 object-cover rounded border"
                            />
                          ) : (
                            <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded border p-2">
                              <span className="text-xs text-gray-500 text-center break-all">
                                {item.name}
                              </span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full md:w-[40%]">
                <img src={COURIER} alt="Courier" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="website_button !px-12 !h-[60px] hover:bg-[#202020] bg-[var(--primary-color)] uppercase flex items-center gap-1 mt-10"
              >
                <span>{loading ? "Processing..." : "Register Now"}</span>
              </button>
            </div>
          </form>
        </div>
      </AosWrapper>
    </WebsiteLayout>
  );
};

export default CourierSignup;
