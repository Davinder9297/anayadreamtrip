import React, { useState, useEffect, useRef } from "react";

const PlaceDropdown = ({ place, setPlace }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container
  const cities = ["Goa", "Delhi", "Mumbai", "Bangalore", "Chennai"];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="relative border-r-2 py-6 pl-6"
      ref={dropdownRef} // Attach ref to the dropdown container
    >
      <div className="text-lg font-jost text-gray-700">
        City, Property name or Location
      </div>
      <div
        className="cursor-pointer text-4xl font-bold mt-3"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown
      >
        {place}
      </div>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-[90%] shadow-xl z-10 transition-transform transform scale-100 opacity-100 hover:opacity-90">
          {cities.map((city) => (
            <li
              key={city}
              className="p-3 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 ease-in-out rounded-md"
              onClick={() => {
                setPlace(city); // Set selected place
                setIsOpen(false); // Close dropdown
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceDropdown;
