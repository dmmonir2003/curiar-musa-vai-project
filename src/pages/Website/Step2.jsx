/* eslint-disable no-empty */
import React, { useEffect, useState } from "react";
import JobAddLayout from "../../Layouts/JobAddLayout";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

import belga from "./../../assets/belga.jpg";
import onlineveiling from "./../../assets/onlineveiling.webp";
import troostwijk from "./../../assets/troostwijk-logo.svg";
import vavato from "./../../assets/vavato.webp";
import ModalPopup from "../../Components/Modal";
import { RiDeleteBin5Line } from "react-icons/ri";


const Step1 = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [show, setShow] = useState("");
  const [qty, setQty] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [itemsdata, setItemData] = useState([]);
  const transportOption = () => {
    if(itemsdata.length == 0){
      toast.error("Please add items first");
      return;
    }
    navigate("/request/form/step/3");
  };

  useEffect(() => {
    if (type === "private home" || type === "auction") {
    } else {
      setShow("");
      localStorage.removeItem("show_transport");
    }
  }, [type]);

  useEffect(() => {
    const itemslist =
      JSON.parse(localStorage.getItem("itemslist")) ||
      localStorage.getItem("itemslist");
    console.log(itemslist, "itemslist")
    if(itemslist != null){
      setItemData(itemslist);
    }
    
  }, [modalOpen]);

  const addQuantity = (index) => {
    const updatedItemsList = [...itemsdata];
    console.log("updatedItemsList", updatedItemsList);
    updatedItemsList[index].qty += 1; // Increase the quantity by 1
    setItemData(updatedItemsList);
    localStorage.setItem("itemslist", JSON.stringify(updatedItemsList)); // Save to localStorage
  };

  const subQuantity = (index) => {
    // if (qty <= 1) return;
    const updatedItemsList = [...itemsdata];
    if (updatedItemsList[index].qty > 1) {
      updatedItemsList[index].qty -= 1; // Decrease the quantity by 1
    } else {
      updatedItemsList.splice(index, 1); // Remove the item
    }
    setItemData(updatedItemsList);
    localStorage.setItem("itemslist", JSON.stringify(updatedItemsList)); // Save to localStorage
  };

  return (
    <JobAddLayout>
      <div>
        <h2 className="font-bold text-[18px] text-[var(--primary-color)] uppercase">
          Items
        </h2>
        <p className="mt-2">Add your item(s)</p>

        <div
          className="border border-[#f0f0f0] rounded-xl p-4 flex items-center gap-3 mt-10 cursor-pointer"
          onClick={() => openModal()}
        >
          <span>
            <IoSearch size={20} />
          </span>
          <p>Search Items</p>
        </div>
        <div className="mt-6">
          <h1 className="font-bold uppercase text-[var(--primary-color)] text-lg">
            MY ITEMS
          </h1>
          {itemsdata.length > 0 && (
            <>
              {itemsdata?.map((item, index) => (
                <>
                  <div className="flex flex-row p-3 border items-center justify-between hover:border-[var(--primary-color)] cursor-pointer border-[#f0f0f0] rounded-lg gap-5 mt-3">
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
                          {item.name}
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
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between gap-4 p-2 px-2 border items-center  border-[#f0f0f0] rounded-lg">
                        {item.qty == 1 ? (
                          <>
                          <div
                            className="cursor-pointer"
                            onClick={() => subQuantity(index)}
                          >
                           <RiDeleteBin5Line color="red" size={20} />
                          </div></>
                        ) : (
                          <div
                            className="cursor-pointer"
                            onClick={() => subQuantity(index)}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="5"
                                fill="#85E211"
                              />
                              <path
                                d="M3.75 9H14.25"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}

                        <div className="font-bold text-md text-[#4f4f4f]">
                          {item.qty}
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => addQuantity(index)}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="18"
                              height="18"
                              rx="5"
                              fill="#85E211"
                            />
                            <path
                              d="M3.75 9H14.25M9 3.75V14.25"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
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

export default Step1;
