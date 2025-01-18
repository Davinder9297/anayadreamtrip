"use client";
import React, { useState } from "react";

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([2000, 50000]);
  const [collections, setCollections] = useState([]);
  const [accommodation, setAccommodation] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [checkinFeatures, setCheckinFeatures] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(2000); // Initial value

  const handlePriceChange = (e) => {
    setSelectedPrice(Number(e.target.value));
  };

  const handleCheckboxChange = (stateSetter, value) => {
    stateSetter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="px-6 bg-white shadow-md w-72 h-full border-r pl-6 font-jost">
      <h2 className="text-xl font-[700] mb-4">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-[700] text-lg text-gray-800">Price Range</h3>
        <div className="flex items-center justify-between mt-4">
          <input
            type="number"
            value={selectedPrice}
            min="2000"
            max="50000"
            onChange={(e) => handlePriceChange(e)}
            className="w-20 border rounded p-1 text-sm no-spin"
          />
        </div>
        <div className="relative mt-4">
          <input
            type="range"
            min="2000"
            max="50000"
            step="100"
            value={selectedPrice}
            onChange={handlePriceChange}
            className="w-full bg-gray-300 h-1 appearance-none slider-thumb"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹2000</span>
          <span>₹50000</span>
        </div>
      </div>

      {/* Collections */}
      <div className="mb-6">
        <h3 className="font-[700] text-lg text-gray-800">Collections</h3>
        {["Luxury", "Budget", "Couples", "Family"].map((item) => (
          <label key={item} className="block text-sm text-gray-600 mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={collections.includes(item)}
              onChange={() => handleCheckboxChange(setCollections, item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Accommodation */}
      <div className="mb-6">
        <h3 className="font-[700] text-lg text-gray-800">Accommodation</h3>
        {["Hotel", "Resort", "Villa", "Apartment"].map((item) => (
          <label key={item} className="block text-sm text-gray-600 mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={accommodation.includes(item)}
              onChange={() => handleCheckboxChange(setAccommodation, item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Hotel Facilities */}
      <div className="mb-6">
        <h3 className="font-[700] text-lg text-gray-800">Hotel Facilities</h3>
        {["TV", "AC", "Sitting Area", "King Bed Size", "Queen Sized Bed"].map(
          (item) => (
            <label key={item} className="block text-sm text-gray-600 mt-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={facilities.includes(item)}
                onChange={() => handleCheckboxChange(setFacilities, item)}
              />
              {item}
            </label>
          )
        )}
      </div>

      {/* Check-in Features */}
      <div>
        <h3 className="font-[700] text-lg text-gray-800">Check-in Features</h3>
        {["Pay at Hotel", "Free Cancellation", "Early Check-in"].map((item) => (
          <label key={item} className="block text-sm text-gray-600 mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkinFeatures.includes(item)}
              onChange={() => handleCheckboxChange(setCheckinFeatures, item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
