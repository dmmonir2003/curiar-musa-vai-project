import React, { useEffect, useState } from "react";
import JobAddLayout from "../../Layouts/JobAddLayout";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

import belga from "./../../assets/belga.jpg";
import onlineveiling from "./../../assets/onlineveiling.webp";
import CARLIFT from "./../../assets/car_lift.png";
import vavato from "./../../assets/vavato.webp";
import ModalPopup from "../../Components/Modal";
import { RiDeleteBin5Line } from "react-icons/ri";

const Step4 = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  const UpdateHelp = (val) => {
    localStorage.setItem("help", val);
    navigate("/request/form/step/5");
  }

  useEffect(() => {
    const savedHelp = localStorage.getItem("help");
    if (savedHelp) {
      setType(savedHelp);
    }
  }, []);

  return (
    <JobAddLayout>
      <div>
        <h2 className="font-bold text-[18px] text-[var(--primary-color)] uppercase">
          Extra services
        </h2>
        <p className="mt-2">Need extra help at pickup or delivery?</p>

        <div className="grid grid-cols-2 md:grid-cols-2 mt-10 gap-5">
          <div
            className={`rounded-xl ${
              type === "No Help"
                ? "bg-[var(--primary-color)]"
                : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => UpdateHelp("No Help")}
          >
            <svg
              className="IconPersonOne"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <g fill="#0073FA" fillRule="evenodd">
                <path d="M1.105 34.078h16.592v-2.97c0-3.794-3.004-6.881-6.695-6.881H7.8c-3.692 0-6.695 3.087-6.695 6.881v2.97zm17.144 1.136H.553A.56.56 0 0 1 0 34.646v-3.538c0-4.42 3.5-8.017 7.8-8.017h3.202c4.3 0 7.8 3.597 7.8 8.017v3.538a.56.56 0 0 1-.553.568z"></path>
                <path d="M4.685 35.214a.56.56 0 0 1-.553-.568v-5.493a.56.56 0 0 1 .553-.568.56.56 0 0 1 .552.568v5.493a.56.56 0 0 1-.552.568M14.7 35.214a.56.56 0 0 1-.552-.568v-5.493a.56.56 0 0 1 .553-.568.56.56 0 0 1 .552.568v5.493a.56.56 0 0 1-.552.568M11.493 23.778L10.31 26.21a.663.663 0 0 1-1.199 0l-1.183-2.432h3.565zM16.208 16.035a.556.556 0 0 1-.542-.465c-.54-3.014-3.1-5.202-6.085-5.202-2.986 0-5.545 2.188-6.085 5.202a.555.555 0 0 1-.643.456.567.567 0 0 1-.444-.661c.637-3.553 3.653-6.133 7.172-6.133 3.519 0 6.535 2.58 7.171 6.133a.567.567 0 0 1-.544.67"></path>
                <path d="M9.58 24.227c-3.518 0-6.534-2.58-7.17-6.132a.567.567 0 0 1 .443-.662.554.554 0 0 1 .643.456c.54 3.014 3.099 5.202 6.085 5.202 2.986 0 5.545-2.188 6.085-5.202a.554.554 0 0 1 .643-.456c.3.057.499.353.443.662-.636 3.553-3.652 6.132-7.171 6.132"></path>
              </g>
            </svg>
            <span className="font-semibold">No, not necessary</span>
            <p>One courier who helps you carry at the pickup location</p>
          </div>

          <div
            className={`rounded-xl ${
              type === "Extra Help"
                ? "bg-[var(--primary-color)]"
                : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => UpdateHelp("Extra Help")}
          >
            <svg
              className="IconPersonTwo"
              width="37"
              height="40"
              viewBox="0 0 37 40"
            >
              <g fill="#0073FA" fillRule="evenodd">
                <path d="M19.105 38.078h16.592v-2.97c0-3.794-3.004-6.881-6.695-6.881H25.8c-3.692 0-6.695 3.087-6.695 6.881v2.97zm17.144 1.136H18.553a.56.56 0 0 1-.553-.568v-3.538c0-4.42 3.5-8.017 7.8-8.017h3.202c4.3 0 7.8 3.597 7.8 8.017v3.538a.56.56 0 0 1-.553.568z"></path>
                <path d="M22.685 39.214a.56.56 0 0 1-.553-.568v-5.493a.56.56 0 0 1 .553-.568.56.56 0 0 1 .552.568v5.493a.56.56 0 0 1-.552.568M32.7 39.214a.56.56 0 0 1-.552-.568v-5.493a.56.56 0 0 1 .553-.568.56.56 0 0 1 .552.568v5.493a.56.56 0 0 1-.552.568M29.493 27.778L28.31 30.21a.663.663 0 0 1-1.199 0l-1.183-2.432h3.565zM34.208 20.035a.556.556 0 0 1-.542-.465c-.54-3.014-3.1-5.202-6.085-5.202-2.986 0-5.545 2.188-6.085 5.202a.555.555 0 0 1-.643.456.567.567 0 0 1-.444-.661c.637-3.553 3.653-6.133 7.172-6.133 3.519 0 6.535 2.58 7.171 6.133a.567.567 0 0 1-.544.67"></path>
                <path d="M27.58 28.227c-3.518 0-6.534-2.58-7.17-6.132a.567.567 0 0 1 .443-.662.554.554 0 0 1 .643.456c.54 3.014 3.099 5.202 6.085 5.202 2.986 0 5.545-2.188 6.085-5.202a.554.554 0 0 1 .643-.456c.3.057.499.353.443.662-.636 3.553-3.652 6.132-7.171 6.132"></path>
                <g>
                  <path d="M1.105 38.078h16.592v-2.97c0-3.794-3.004-6.881-6.695-6.881H7.8c-3.692 0-6.695 3.087-6.695 6.881v2.97zm17.144 1.136H.553A.56.56 0 0 1 0 38.646v-3.538c0-4.42 3.5-8.017 7.8-8.017h3.202c4.3 0 7.8 3.597 7.8 8.017v3.538a.56.56 0 0 1-.553.568z"></path>
                  <path d="M4.685 39.214a.56.56 0 0 1-.553-.568v-5.493a.56.56 0 0 1 .553-.568.56.56 0 0 1 .552.568v5.493a.56.56 0 0 1-.552.568M14.7 39.214a.56.56 0 0 1-.552-.568v-5.493a.56.56 0 0 1 .553-.568.56.56 0 0 1 .552.568v5.493a.56.56 0 0 1-.552.568M11.493 27.778L10.31 30.21a.663.663 0 0 1-1.199 0l-1.183-2.432h3.565zM16.208 20.035a.556.556 0 0 1-.542-.465c-.54-3.014-3.1-5.202-6.085-5.202-2.986 0-5.545 2.188-6.085 5.202a.555.555 0 0 1-.643.456.567.567 0 0 1-.444-.661c.637-3.553 3.653-6.133 7.172-6.133 3.519 0 6.535 2.58 7.171 6.133a.567.567 0 0 1-.544.67"></path>
                  <path d="M9.58 28.227c-3.518 0-6.534-2.58-7.17-6.132a.567.567 0 0 1 .443-.662.554.554 0 0 1 .643.456c.54 3.014 3.099 5.202 6.085 5.202 2.986 0 5.545-2.188 6.085-5.202a.554.554 0 0 1 .643-.456c.3.057.499.353.443.662-.636 3.553-3.652 6.132-7.171 6.132"></path>
                </g>
              </g>
            </svg>
            <span className="font-semibold">Extra help</span>
            <p>A second courier to help with carrying</p>
          </div>

          <div
            className={`rounded-xl ${
              type === "Car with lift (1 Person)"
                ? "bg-[var(--primary-color)]"
                : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => UpdateHelp("Car with lift (1 Person)")}
          >
            <img src={CARLIFT} className="h-10" />
            <span className="font-semibold">Car with lift</span>
            <p>Car with a lift - 1 Person</p>
          </div>

          <div
            className={`rounded-xl ${
              type === "Car with lift (2 Person)"
                ? "bg-[var(--primary-color)]"
                : "bg-[#F7F7F8]"
            } p-5 flex justify-center items-center gap-4 flex-col hover:bg-[var(--primary-color)] cursor-pointer`}
            onClick={() => UpdateHelp("Car with lift (2 Person)")}
          >
            <img src={CARLIFT} className="h-10" />
            <span className="font-semibold">Car with lift</span>
            <p>Car with a lift - 2 Person</p>
          </div>

        </div>
      </div>

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

export default Step4;
