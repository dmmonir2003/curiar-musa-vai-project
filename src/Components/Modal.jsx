/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import FiltersJobs from "./FiltersJobs";
import { CgClose } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import AddItems from "./AddItems";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCreateOrEdit from "../hooks/useCreateOrEdit";
import { CHANGE_PASSWORD, REVIEWS } from "../constants";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";


const ModalPopup = ({
  open,
  close,
  heading,
  content,
  subcontent,
  onSubmit,
  show_buttons = true,
  show_buttons_not = true,
  setDate,
  date, job,
  filters,
  setFilters,
  getUserRequests
}) => {
  const [showmodal, setShowModal] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (open) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [open]);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(); // Call the onSubmit function passed from the parent
    }
    setShowModal(false); // Close modal after submit
    if (close) close();
  };

  const doSignup = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const DateField = () => {
    return (
      <div className="flex items-center gap-4">
        <input
          type="date"
          className="border border-[#ccc] py-2 px-4 w-full rounded-md"
          value={date || ""}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
    );
  };

 const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {submitData} = useCreateOrEdit()
  const [loading, setLoading] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async(values) => {
    // console.log(values);
    try{
      setLoading(true)
      const response = await submitData(CHANGE_PASSWORD,values,'POST')
      toast.success(response.data?.message || "Password updated successfully")
      // setShowModal(false)
        setShowModal(false);
        if (close) close();
    }catch(error){
      setLoading(false)
      console.log(error)
      toast.error(error.response?.data?.message || "Error updating password")

    }
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form method="post" className="w-full">
            {/* Old Password */}
            <div className="form-group">
              <label>
                Old Password <span className="required">*</span>
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                className="form-control"
                placeholder="Enter Old Password"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="text-red-500 text-sm"
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
            </div>

            {/* New Password */}
            <div className="form-group">
              <label>
                New Password <span className="required">*</span>
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                name="newPassword"
                className="form-control"
                placeholder="Create a strong password"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm"
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
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>
                Confirm Password <span className="required">*</span>
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
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
            </div>

            <div className="text-[#5E5E6B] my-1 text-[11px]">
              Password must be at least 6 characters long.
            </div>
             <div className="border-t border-[#f0f0f0] pt-3 p-3 px-0 flex justify-between items-center">
                  <button
                    className="bg-[#ff5f5f] text-white py-2 px-9 rounded-full"
                    onClick={() => {
                      setShowModal(false);
                      if (close) close();
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[var(--primary-color)] text-white py-2 px-8 rounded-full"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};


const [star1, setStar1] = useState(5);
const [star2, setStar2] = useState(5);
const [star3, setStar3] = useState(5);

const ratingChanged = (newRating) => {
  setStar1(newRating);
};
const ratingChanged2 = (newRating) => {
  setStar2(newRating);
};
const ratingChanged3 = (newRating) => {
  setStar3(newRating);
};


const ReviewPopup = () => {
  const {submitData} = useCreateOrEdit();
  const [localReview, setLocalReview] = useState(null);

  const [star1, setStar1] = useState(0);
  const [star2, setStar2] = useState(0);
  const [star3, setStar3] = useState(0);
const data = useMemo(() => job?.review || {}, [job?.review]);
  console.log('data', data , 'star1', star1, 'star2', star2, 'star3', star3);

  const hasExistingReview = useMemo(() => {
    return data && (data.comment || data.professionalism || data.communication || data.friendliness);
  }, [data]);

  useEffect(() => {
    if (data) {
      setStar1(data?.professionalism || 0);
      setStar2(data?.communication || 0);
      setStar3(data?.friendliness || 0);
    }
  }, [data]);

  const validationSchema = Yup.object().shape({
    comment: Yup.string().required('Review is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      professionalism: star1,
      communication: star2,
      friendliness: star3,
      courierRequest: job?._id,
    };

    console.log('values', payload);
    

    try {
      await submitData(`${REVIEWS}/${job?._id}`,payload,"POST");
      toast.success('Review submitted successfully');
      getUserRequests()
        // window.location.reload();

    } catch (error) {
      console.error('Failed to submit review', error);
    } finally {
      setSubmitting(false);
      setStar1(payload.star1)
      setStar2(payload.star2)
      setStar3(payload.star3)

      setShowModal(false);
        if (close) close();
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          comment: data.comment || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form method="post">
            <div>
              <div className="form-group">
                <label className="!text-normal">Enter Your Review</label>
                <Field
                  as="textarea"
                  name="comment"
                  // required
                  id="comment"
                  className="form-control !pl-4 resize-none"
                  rows="4"
                  disabled={hasExistingReview}

                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-between items-center mb-3">
                <span>Professionalism</span>
                <div>
                  <ReactStars
                    key={star1}
                    count={5}
                    onChange={(newRating) => setStar1(newRating)}
                    size={20}
                    value={star1}
                    activeColor="#ffd700"
                    edit={!hasExistingReview}

                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span>Communication</span>
                <div>
                  <ReactStars
                    key={star2}
                    count={5}
                    onChange={(newRating) => setStar2(newRating)}
                    size={20}
                    value={star2}
                    activeColor="#ffd700"
                    edit={!hasExistingReview}

                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-0">
                <span>Friendliness</span>
                <div>
                  <ReactStars
                    key={star3}
                    count={5}
                    onChange={(newRating) => setStar3(newRating)}
                    size={20}
                    value={star3}
                    activeColor="#ffd700"
                    edit={!hasExistingReview}

                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-red-400 px-6 py-2 text-white rounded-full"
                  onClick={() => {
                    setShowModal(false);
                    if (close) close();
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-lime-400 px-6 py-2 text-white rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};



  return (
    <>
      {showmodal && (
        <div className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50">
          <div className="flex justify-center items-center h-full w-full">
            <div className="bg-white rounded-md w-[90%] md:w-[40%]">
              <div className="font-semibold text-lg border-b border-[#f0f0f0] p-4 uppercase flex justify-between items-center">
                <span>{heading}</span>
                {
                  !show_buttons_not && (
                    <div>
                      <button
                        className="bg-[#ff5f5f] text-white py-2 px-2 rounded-full"
                        onClick={() => {
                          setShowModal(false);
                          if (close) close();
                        }}
                      >
                        <IoCloseCircleOutline />
                      </button>
                    </div>
                  )
                }
              </div>
              <div className="content_modal mt-0 px-6 py-4 font-normal mb-4">
                {show_buttons && (
                  <p className="text-[#101010] mb-4">{subcontent}</p>
                )}
                {content == "date_popup" ? (
                  <>
                    <DateField />
                  </>
                ) : (
                  <>
                    {content == "ChangePassword" && <ChangePassword />}
                    {content == "filterjobs" && <FiltersJobs filters={filters} setFilters={setFilters} />}
                    {content == "additems" && <AddItems close={close} />}

                    {content == "review_content" && <ReviewPopup />}

                    {content == "delete_popup" && 
                      <>
                        <div className="text-[#ff5454] text-center text-md">
                          Are you sure you want to delete this job #{job?.jobNumber}. <br />This action will be deleted permanently.
                        </div>
                      </>
                    }
                  </>
                  // <content />
                )}
              </div>
              {(show_buttons_not && content != 'ChangePassword' && content != "review_content") && (
                <div className="border-t border-[#f0f0f0] pt-3 p-3 px-5 flex justify-between items-center">
                  <button
                    className="bg-[#ff5f5f] text-white py-2 px-4 rounded-full"
                    onClick={() => {
                      setShowModal(false);
                      if (close) close();
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[var(--primary-color)] text-white py-2 px-8 rounded-full"
                    onClick={() => handleSubmit()}
                  >
                    {content == "delete_popup" ? "Delete" : "Submit" }
                  </button>
                </div>
               )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPopup;
