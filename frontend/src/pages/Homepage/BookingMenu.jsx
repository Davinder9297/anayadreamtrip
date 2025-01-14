import React, { useState } from "react";
import PlaceDropdown from "../BookingMenuComponents/PlaceDropdown";
import RoomsAndGuestsDropdown from "../BookingMenuComponents/RoomsGuests";
import CheckOutPicker from "../BookingMenuComponents/CheckoutPicker";
import CheckInPicker from "../BookingMenuComponents/CheckinPicker";

const BookingMenu = () => {
  const [place, setPlace] = useState("Goa");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomsAndGuests, setRoomsAndGuests] = useState({
    rooms: 1,
    adults: 1,
    children: 0,
  });

  const handleCheckInChange = (newCheckInDate) => {
    setCheckInDate(newCheckInDate);
    setCheckOutDate(null); // Clear check-out date whenever check-in date changes
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg mx-auto -mt-20 z-[99] shadow-gray-700 shadow-lg">
      {/* Place Dropdown */}
      <div className="w-[30%]">
        <PlaceDropdown place={place} setPlace={setPlace} />
      </div>

      {/* Check-In Date Picker */}
      <div className="w-[20%]">
        <CheckInPicker
          label="Check-in Date"
          checkInDate={checkInDate}
          setCheckInDate={handleCheckInChange}
        />
      </div>

      {/* Check-Out Date Picker */}
      <div className="w-[20%]">
        <CheckOutPicker
          label="Check-out Date"
          checkInDate={checkInDate} // Pass check-in date to restrict check-out
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
        />
      </div>

      {/* Rooms & Guests */}
      <div className="w-[30%]">
        <RoomsAndGuestsDropdown
          data={roomsAndGuests}
          setData={setRoomsAndGuests}
        />
      </div>

      {/* Price Range Dropdown */}
      {/* <div className="w-[15%]"><PriceRangeDropdown priceRange={priceRange} setPriceRange={setPriceRange} /></div> */}
    </div>
  );
};

export default BookingMenu;
