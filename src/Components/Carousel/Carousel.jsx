import React, { useState, useEffect } from "react";

const images = [
  "/images/herosection/hero3.webp",
  "/images/herosection/hero1.webp",
  "/images/herosection/hero2.webp",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Images */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-transform duration-1000 ${
            index === currentIndex ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            transform:
              index === currentIndex
                ? "translateX(0)"
                : index < currentIndex
                ? "translateX(-100%)"
                : "translateX(100%)",
          }}
        />
      ))}
    </div>
  );
};

export default Carousel;
