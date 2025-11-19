/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LuCalendarSearch } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarHeader = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showmodal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log("selectedDate Mine", selectedDate);

  const goToPrevious = () => {
    setLoading(true)
    const newDate = selectedDate.subtract(1, "day");
    setSelectedDate(newDate);
    onDateChange(newDate);
    setLoading(false)
  };

  const goToNext = () => {
    setLoading(true)
    const newDate = selectedDate.add(1, "day");
    setSelectedDate(newDate);
    onDateChange(newDate);
    setLoading(false)
  };


  const isToday = dayjs(selectedDate).isSame(dayjs(), "day");

  useEffect(() => {
    onDateChange(isToday ? dayjs() : selectedDate);
  }, [isToday]);

  const show_calendar = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mt-4 mb-5 border-b pb-3 border-gray-200">
        <button
         disabled={loading}
          onClick={goToPrevious}
          className="small_button !bg-[#202020] !font-bold uppercase"
        >
          Prev
        </button>
        <div
          className="font-semibold text-lg flex items-center gap-3 cursor-pointer hover:text-[var(--primary-color)]"
          onClick={show_calendar}
        >
          {isToday ? "Today" : selectedDate.format("dddd, MMM D")}
          <span>
            <LuCalendarSearch />
          </span>
        </div>
        <button
        disabled={loading}
          onClick={goToNext}
          className="small_button !bg-[#202020] !font-bold uppercase"
        >
          Next
        </button>
      </div>

      {showmodal && (
        <div className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[999] bg-black bg-opacity-50">
          <div className="flex justify-center items-center h-full w-full">
            <div className="bg-white rounded-md w-[90%] md:w-[50%]">
              <div className="font-semibold text-lg border-b border-[#f0f0f0] p-4 uppercase flex justify-between items-center">
                <span>Select Date</span>
              </div>
              <div className="content_modal mt-0 px-6 py-4 font-normal mb-4">
                <div className="datepicker-wrapper">
                  <DatePicker
                    selected={selectedDate.toDate()} // ensure it's a JS Date object
                    onChange={(date) => {
                      const newDate = dayjs(date); // convert native Date to dayjs
                      setSelectedDate(newDate);
                      onDateChange(newDate);
                      setShowModal(false);
                    }}
                    inline
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarHeader;
