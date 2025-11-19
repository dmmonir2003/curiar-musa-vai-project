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

const floorsArray = [
  {
    id: 1,
    name: "Ground floor",
    desc: "Have the items ready for pickup",
    price: 0,
    image: '<svg class="IconDoor" version="1.1" x="0px" y="0px" viewBox="0 0 115.2 84"><g><path d="M31.4,39.7c1.1,0,2-0.9,2-2V4h48.2v33.7c0,1.1,0.9,2,2,2s2-0.9,2-2V2c0-1.1-0.9-2-2-2H31.4c-1.1,0-2,0.9-2,2v35.7 C29.4,38.8,30.3,39.7,31.4,39.7z"></path><path d="M102,80H85.7V47.7c0-1.1-0.9-2-2-2s-2,0.9-2,2V80H33.4V47.7c0-1.1-0.9-2-2-2s-2,0.9-2,2V80H13.2c-1.1,0-2,0.9-2,2 s0.9,2,2,2H102c1.1,0,2-0.9,2-2S103.1,80,102,80z"></path><path d="M68.3,39.8c-1.1,0-2,0.9-2,2s0.9,2,2,2h7.5c1.1,0,2-0.9,2-2s-0.9-2-2-2H68.3z"></path></g></svg>'
  },
  {
    id: 2,
    name: "Elevator available",
    desc: "Regardless which floor",
    price: 10,
    image: '<svg class="IconElevator" version="1.1" viewBox="0 0 31 31"><g><path d="M6.58 24.76c.355 0 .646-.289.646-.642V13.286h15.548v10.832a.646.646 0 0 0 1.29 0V12.643A.646.646 0 0 0 23.42 12H6.581a.646.646 0 0 0-.646.643v11.475c0 .353.29.643.646.643zM14.536 5.296a.508.508 0 0 0-.734 0l-2.769 2.858V.536a.528.528 0 0 0-.52-.536c-.286 0-.518.24-.518.536v7.632L7.225 5.31a.519.519 0 0 0-.749-.013.56.56 0 0 0-.012.773l3.659 3.761h.02c.042.04.09.073.142.097h.028a.499.499 0 0 0 .173.035.499.499 0 0 0 .173-.035h.028a.515.515 0 0 0 .16-.072h.02l3.67-3.786a.544.544 0 0 0 0-.775zM23.722 4.668a.508.508 0 0 1-.734 0l-2.77-2.857v7.618a.528.528 0 0 1-.519.535.528.528 0 0 1-.519-.535V1.796l-2.77 2.858a.519.519 0 0 1-.749.012.56.56 0 0 1-.012-.773l3.66-3.76h.02a.518.518 0 0 1 .142-.097h.027A.499.499 0 0 1 19.672 0c.059.001.117.014.173.036h.027c.057.014.11.038.16.071h.02l3.67 3.786a.544.544 0 0 1 0 .775z"></path><path d="M29.355 29.714h-5.258V19.332a.646.646 0 0 0-1.29 0v10.382H7.225V19.332a.646.646 0 0 0-1.29 0v10.382H.71a.646.646 0 0 0-.645.643c0 .354.29.643.645.643h28.645c.355 0 .645-.29.645-.643a.646.646 0 0 0-.645-.643z"></path></g></svg>'
  },
  {
    id: 3,
    name: "Basement",
    desc: "Without elevator",
    price: 10,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">-1</span></div>'
  },
  {
    id: 4,
    name: "1st floor",
    desc: "Without elevator",
    price: 10,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">1</span></div>'
  },
  {
    id: 5,
    name: "2nd Floor",
    desc: "Without elevator",
    price: 20,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">2</span></div>'
  },
  {
    id: 6,
    name: "3rd Floor",
    desc: "Without elevator",
    price: 30,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">3</span></div>'
  },
  {
    id: 7,
    name: "4th Floor",
    desc: "Without elevator",
    price: 40,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">4</span></div>'
  },
  {
    id: 8,
    name: "5th Floor",
    desc: "Without elevator",
    price: 50,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">5</span></div>'
  },
  {
    id: 9,
    name: "6th Floor",
    desc: "Without elevator",
    price: 60,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">6</span></div>'
  },
  {
    id: 10,
    name: "7th Floor",
    desc: "Without elevator",
    price: 70,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">7</span></div>'
  },
  {
    id: 11,
    name: "8th Floor",
    desc: "Without elevator",
    price: 80,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">8</span></div>'
  },
  {
    id: 12,
    name: "9th Floor",
    desc: "Without elevator",
    price: 90,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">9</span></div>'
  },
  {
    id: 13,
    name: "10th Floor",
    desc: "Without elevator",
    price: 100,
    image: '<div class="input-el--tile--prefix"><span class="floor-indication custom">10</span></div>'
  },
];

const Step5 = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [floors] = useState(floorsArray);
  const [pickuphelp, setPickuphelp] = useState(false);
  const [deliveryhelp, setDeliveryhelp] = useState(false);
  
  // State for selected pickup and delivery floors
  const [selectedPickup, setSelectedPickup] = useState(() => {
    return localStorage.getItem("helpdelivery");
  });
  
  const [selectedDelivery, setSelectedDelivery] = useState(() => {
    return localStorage.getItem("helpdelivery");
  });
  
console.log('selectedPickup', selectedPickup , 'selectedDelivery', selectedDelivery)
  // Load saved values when component mounts
  useEffect(() => {
    // No need to setSelectedPickup/Delivery here anymore
    if (selectedPickup) {
      setPickuphelp(true);
    }
    if (selectedDelivery) {
      setDeliveryhelp(true);
    }
  }, []);
  

  const UpdateHelp = (val, price) => {
    if (!pickuphelp) {
      localStorage.setItem("helppickup", val);
      localStorage.setItem("helppickupprice", price);
      setSelectedPickup(val);
      setPickuphelp(true);
    } else {
      localStorage.setItem("helpdelivery", val);
      localStorage.setItem("helpdeliveryprice", price);
      setSelectedDelivery(val);
      navigate("/request/form/step/6");
    }
  };

  // Determine which selection is currently active
  const getActiveSelection = () => {
    return pickuphelp ? selectedDelivery : selectedPickup;
  };

  return (
    <JobAddLayout>
      <div>
        <h2 className="font-bold text-[18px] text-[var(--primary-color)] uppercase">
          Extra services - <span className="text-black">{!pickuphelp ? "Pickup" : "Delivery"}</span>
        </h2>
        <p className="mt-2">{!pickuphelp ? "Pickup: where are the items?" : "Delivery: where does everything go?"}</p>
        <p>The damage insurance applies from door to door and not indoors.</p>

        <div className="grid grid-cols-2 md:grid-cols-2 mt-10 gap-5">
          {floors.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl actual_boxxxx ${
                getActiveSelection() === item.name
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-[#F7F7F8]"
              } p-5 flex justify-center items-center gap-1 flex-col hover:bg-[var(--primary-color)] hover:text-white cursor-pointer`}
              onClick={() => UpdateHelp(item.name, item.price)}
            >
              {item.image && (
                <div
                  className="w-10"
                  dangerouslySetInnerHTML={{ __html: item.image }}
                />
              )}
              <span className="font-semibold mt-3">{item.name}</span>
              <p>{item.desc}</p>
            </div>
          ))}
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

export default Step5;