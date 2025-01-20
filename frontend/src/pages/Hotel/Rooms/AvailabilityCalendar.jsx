import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AvailabilityCalendar = ({ onApply }) => {
  const [range, setRange] = useState([null, null]); // [checkIn, checkOut]
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [message, setMessage] = useState("Select check-in date"); // Instruction message

  useEffect(() => {
    // Ensure that currentDate is recalculated only after hydration
    setCurrentDate(new Date());
  }, []);

  const handleDateClick = (date) => {
    const [checkIn, checkOut] = range;
  
    if (!checkIn || (checkIn && checkOut)) {
      setRange([date, null]);
      setIsSelectingCheckOut(true);
      setMessage("Select check-out date");
    } else if (isSelectingCheckOut && date > checkIn) {
      setRange([checkIn, date]);
      setIsSelectingCheckOut(false);
      setMessage(""); // Clear the message after both dates are selected
    }
  };
  

  const handleApply = () => {
    if (onApply) {
      onApply({
        checkIn: range[0],
        checkOut: range[1],
      });
    }
  };

  const handleCancel = () => {
    setRange([null, null]);
    setIsSelectingCheckOut(false);
    setMessage("Select check-in date"); // Reset the message
  };

  const tileDisabled = ({ date }) => {
    // Disable dates earlier than the current date
    return date < currentDate.setHours(0, 0, 0, 0);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const [checkIn, checkOut] = range;

      if (checkIn && checkOut && date >= checkIn && date <= checkOut) {
        return "highlight-range";
      }
      if (checkIn && date.toDateString() === checkIn.toDateString()) {
        return "highlight-checkin";
      }
      if (checkOut && date.toDateString() === checkOut.toDateString()) {
        return "highlight-checkout";
      }
    }
    return null;
  };

  return (
    <div style={{ textAlign: "", maxWidth: "70%" }}>
      <div className="text-secondary text-2xl font-marcellus my-4 mt-8">Availability Calendar</div>
      <div style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold", color: "#555" }}>
        {message}
      </div>
      <Calendar
        onClickDay={handleDateClick}
        tileDisabled={tileDisabled} // Disable past dates
        tileClassName={tileClassName}
        value={range[0] ? [range[0], range[1]] : null}
        selectRange={false} // Custom logic handles range selection
        minDate={new Date()} // Prevent navigation to past months
      />
      <div style={{ marginTop: "10px" }}>
        <button
          style={{
            marginRight: "5px",
            padding: "5px 10px",
            background: "#d6d6d6",
            border: "1px solid #aaa",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          style={{
            padding: "5px 10px",
            background: "#916f4b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleApply}
          disabled={!range[0] || !range[1]} // Disable apply button if range is incomplete
        >
          Apply
        </button>
      </div>
      <style>
        {`
          .highlight-range {
            background: #c7a481 !important;
            color: white;
            border-radius: 0;
          }
          .highlight-checkin, .highlight-checkout {
            background: #916f4b !important;
            color: white;
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default AvailabilityCalendar;
