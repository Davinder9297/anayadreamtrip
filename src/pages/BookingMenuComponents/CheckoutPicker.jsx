import React, { useState, useEffect, useRef } from "react";
import { addDays, format } from "date-fns";
import { IoIosArrowDown } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles

const CheckOutPicker = ({
  label,
  checkInDate,
  checkOutDate,
  setCheckOutDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    checkOutDate || addDays(new Date(), 1)
  );
  const calendarRef = useRef(null);

  // Clear selected date when checkInDate changes
  useEffect(() => {
    if (checkInDate) {
      setSelectedDate(null); // Clear local state
      setCheckOutDate(null); // Clear parent state
    }
  }, [checkInDate, setCheckOutDate]);

  const handleDateChange = (date) => {
    const formattedDate = format(new Date(date), "dd MMM yy");
    setCheckOutDate(formattedDate); // Pass formatted date to parent
    setSelectedDate(date); // Update local state
    setIsOpen(false); // Close the calendar
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative border-r-2 py-6 pl-6"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="cursor-pointer text-lg">
        <label className="text-lg text-gray-700 -mt-4 font-[500] font-jost flex gap-2 justify-center">
          {label}
          <IoIosArrowDown className="my-auto" />
        </label>
        <div className="mt-2 text-2xl text-center">
          {selectedDate ? (
            format(new Date(selectedDate), "MMM dd,  yyyy")
          ) : (
            <div className="text-white">.</div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute mt-2 w-96 p-4 rounded-lg bg-opacity-95 shadow-xl z-10"
        >
          <Calendar
            onChange={handleDateChange}
            value={selectedDate || null}
            className="rounded-lg custom-calendar"
            tileDisabled={
              ({ date }) => !checkInDate || date < new Date(checkInDate) // Disable dates before check-in date
            }
            tileClassName={({ date, view }) => {
              if (
                selectedDate &&
                date.toDateString() === new Date(selectedDate).toDateString()
              ) {
                return "bg-primary text-white rounded-lg"; // Selected date styling
              }
              return !checkInDate || date < new Date(checkInDate)
                ? "text-gray-400 cursor-not-allowed" // Lighter text for disabled dates
                : "";
            }}
            minDate={checkInDate ? new Date(checkInDate) : new Date()} // Start from check-in date
          />
        </div>
      )}
    </div>
  );
};

export default CheckOutPicker;
