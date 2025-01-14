import React from "react";
import CardComponent from "./CardComponent";
import HotelInfoCard from "./HotelDetails";

const items = [
  {
    title: "Super Townhouse Collectorate Circle",
    location: "Near Municipal Corporation, Jaipur",
    rating: 4.2,
    reviews: 303,
    description: "Very Good",
    features: ["Elevator", "Reception", "Free Wifi", "+ 3 more"],
    price: 835,
    originalPrice: 4584,
    taxes: 190,
    images: [
      "image1.jpg", // Replace with actual image paths
      "image2.jpg",
      "image3.jpg",
      "image4.jpg",
    ],
  },
  {
    title: "Urban Stay Premium Plaza",
    location: "Near City Center, Jaipur",
    rating: 4.5,
    reviews: 500,
    description: "Excellent",
    features: ["Pool", "Gym", "Free Breakfast", "+ 2 more"],
    price: 1200,
    originalPrice: 5200,
    taxes: 250,
    images: [
      "image5.jpg", // Replace with actual image paths
      "image6.jpg",
      "image7.jpg",
    ],
  },
  // Add more items as needed
];

const HotelList = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {items.map((item, index) => (
        <HotelInfoCard key={index} {...item} />
      ))}
    </div>
  );
};

export default HotelList;
