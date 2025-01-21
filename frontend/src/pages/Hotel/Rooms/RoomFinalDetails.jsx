import React, { useState, useEffect } from "react";

const RoomFinalDetails = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [extraBed, setExtraBed] = useState(0);
  const [extraServices, setExtraServices] = useState({
    petFriendly: false,
    spa: false,
    sauna: false,
  });
  const [message, setMessage] = useState("Select check-in date"); // Instructional message
  const [currentDate, setCurrentDate] = useState(new Date());

  const baseRate = 499;
  const extraCosts = {
    petFriendly: 10,
    spa: 20,
    sauna: 25,
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const calculateTotalCost = () => {
    let total = baseRate * rooms;

    if (extraServices.petFriendly) total += extraCosts.petFriendly * rooms;
    if (extraServices.spa) total += extraCosts.spa * rooms;
    if (extraServices.sauna) total += extraCosts.sauna * rooms;

    return total;
  };

  const handleCheckInChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate >= new Date(currentDate.setHours(0, 0, 0, 0))) {
      setCheckIn(e.target.value);
      setMessage("Select check-out date");
      if (checkOut && new Date(checkOut) <= selectedDate) {
        setCheckOut("");
        setMessage("Check-out date must be after check-in date");
      }
    } else {
      setMessage("Check-in date cannot be in the past");
    }
  };

  const handleCheckOutChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (checkIn && selectedDate > new Date(checkIn)) {
      setCheckOut(e.target.value);
      setMessage("");
    } else {
      setMessage("Check-out date must be after check-in date");
    }
  };

  const handleExtraServiceChange = (service) => {
    setExtraServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  return (
    <div className="bg-secondary text-white p-6 rounded-lg max-w-md mx-auto">
      <div className="text-[40px] font-marcellus font-semibold mb-2">Reserve</div>
      <p className="text-sm text-gray-300 mb-6">
        From <span className="text-lg font-bold">Rs. {baseRate}</span> night
      </p>

      {/* Instructional Message */}
      {message && <div className="mb-4 text-sm font-semibold text-yellow-500">{message}</div>}

      {/* Date Selection */}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Check In</label>
          <input
            type="date"
            value={checkIn}
            onChange={handleCheckInChange}
            className="mt-2 p-2 rounded bg-gray-800 text-white"
            min={new Date().toISOString().split("T")[0]} // Disable past dates
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Check Out</label>
          <input
            type="date"
            value={checkOut}
            onChange={handleCheckOutChange}
            className="mt-2 p-2 rounded bg-gray-800 text-white"
            min={checkIn || new Date().toISOString().split("T")[0]} // Disable dates before check-in
          />
        </div>
      </div>

      {/* Guest and Room Count */}
      {["Adult", "Children", "Rooms", "Extra Bed"].map((label) => (
        <div className="flex justify-between items-center mb-4" key={label}>
          <span className="text-sm">{label}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (label === "Adult" && adults > 1) setAdults(adults - 1);
                if (label === "Children" && children > 0) setChildren(children - 1);
                if (label === "Rooms" && rooms > 1) setRooms(rooms - 1);
                if (label === "Extra Bed" && extraBed > 0) setExtraBed(extraBed - 1);
              }}
              className="px-3 py-1 border border-gray-600 bg-primary text-white rounded-full"
            >
              -
            </button>
            <span className="text-sm font-semibold px-4">
              {label === "Adult" && adults}
              {label === "Children" && children}
              {label === "Rooms" && rooms}
              {label === "Extra Bed" && extraBed}
            </span>
            <button
              onClick={() => {
                if (label === "Adult") setAdults(adults + 1);
                if (label === "Children") setChildren(children + 1);
                if (label === "Rooms") setRooms(rooms + 1);
                if (label === "Extra Bed") setExtraBed(extraBed + 1);
              }}
              className="px-3 py-1 border border-gray-600 bg-primary text-white rounded-full"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Extra Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Extra Services</h3>
        {Object.keys(extraServices).map((serviceKey) => (
          <div className="flex justify-between items-center mb-2" key={serviceKey}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={extraServices[serviceKey]}
                onChange={() => handleExtraServiceChange(serviceKey)}
                className="w-4 h-4 text-gray-800"
              />
              <span className="text-sm">
                {serviceKey === "petFriendly" && "Pet-Friendly Amenities"}
                {serviceKey === "spa" && "Spa Services"}
                {serviceKey === "sauna" && "Sauna/Steam Room"}
              </span>
            </label>
            <span className="text-sm">Rs. {extraCosts[serviceKey]} / Room</span>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div className="text-lg font-bold mb-6">
        Total Cost: <span className="text-yellow-500">Rs. {calculateTotalCost()}</span>
      </div>

      {/* Book Button */}
      <button
        className="w-full py-2 bg-primary text-white font-bold rounded hover:bg-primary hover:bg-opacity-80"
        disabled={!checkIn || !checkOut} // Disable if dates are not selected
      >
        BOOK YOUR STAY
      </button>
    </div>
  );
};

export default RoomFinalDetails;
