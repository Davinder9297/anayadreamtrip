import React, { useState } from "react";
import "../../css/HotelInfoCard.css";

const HotelInfoCard = () => {
  const images = [
    "image1.jpg", // Replace with actual image paths
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="card">
      <div className="image-section">
        <button className="nav-button" onClick={handlePreviousImage}>
          {"<"}
        </button>
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
          className="main-image"
        />
        <button className="nav-button" onClick={handleNextImage}>
          {">"}
        </button>
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${
                index === currentImageIndex ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="details-section">
        <h3>Super Townhouse Collectorate Circle</h3>
        <p>Near Municipal Corporation, Jaipur</p>
        <p>
          <span className="rating">4.2</span> (303 Ratings) - Very Good
        </p>
        <div className="features">
          <span>🚪 Elevator</span>
          <span>💁 Reception</span>
          <span>📶 Free Wifi</span>
          <span>+ 3 more</span>
        </div>
        <p className="price">
          ₹835 <span className="original-price">₹4584</span>{" "}
          <span>77% off</span>
        </p>
        <p className="tax-info">+ ₹190 taxes & fees · per room per night</p>
        <div className="buttons">
          <button className="view-details">View Details</button>
          <button className="book-now">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default HotelInfoCard;
