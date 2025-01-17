import React, { useState } from "react";

const HotelList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const items = [
    {
      title: "Super Townhouse Collectorate Circle",
      location: "Near Municipal Corporation, Jaipur",
      rating: 4.2,
      reviews: 303,
      description: "Very Good",
      features: ["Elevator", "Reception", "Free Wifi", "AC"],
      price: 835,
      originalPrice: 4584,
      taxes: 190,
      images: [
        "/images/hotels/1.png",
        "/images/hotels/2.png",
        "/images/hotels/3.png",
        "/images/hotels/4.png",
        "/images/hotels/5.png",
        "/images/hotels/6.png",
      ],
    },
    {
      title: "Urban Stay Premium Plaza",
      location: "Near City Center, Jaipur",
      rating: 4.5,
      reviews: 500,
      description: "Excellent",
      features: ["Pool", "Gym", "Free Breakfast", "AC"],
      price: 1200,
      originalPrice: 5200,
      taxes: 250,
      images: [
        "/images/hotels/5.png",
        "/images/hotels/6.png",
        "/images/hotels/7.png",
      ],
    },
  ];

  // Initialize image index state for all hotels
  React.useEffect(() => {
    const initialIndexes = {};
    items.forEach((_, index) => {
      initialIndexes[index] = 0;
    });
    setCurrentImageIndex(initialIndexes);
  }, []);

  // Filtered items based on the search term
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]:
        prevState[index] === items[index].images.length - 1
          ? 0
          : prevState[index] + 1,
    }));
  };

  const handlePreviousImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]:
        prevState[index] === 0
          ? items[index].images.length - 1
          : prevState[index] - 1,
    }));
  };

  const handleThumbnailClick = (index, thumbnailIndex) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]: thumbnailIndex,
    }));
  };

  return (
    <div className="font-sans p-4 w-[75%] mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4">Hotel Listings</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search hotels by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="flex border border-gray-300 rounded-lg overflow-hidden w-full h-[280px] overflow-y-auto sidebar"
            >
              {/* Image Section */}
              <div className="flex">
                <div className="relative w-96 h-full">
                  <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer hover:bg-opacity-70"
                    onClick={() => handlePreviousImage(index)}
                  >
                    {"<"}
                  </button>
                  <img
                    src={item.images[currentImageIndex[index]]}
                    alt={`Slide ${currentImageIndex[index]}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer hover:bg-opacity-70"
                    onClick={() => handleNextImage(index)}
                  >
                    {">"}
                  </button>
                </div>
                <div className="flex flex-col gap-2 ml-2 h-full max-h-[280px] overflow-y-scroll sidebar">
                  {item.images.map((img, thumbnailIndex) => (
                    <img
                      key={thumbnailIndex}
                      src={img}
                      alt={`Thumbnail ${thumbnailIndex}`}
                      className={`w-16 h-16 object-cover cursor-pointer border-2 ${
                        thumbnailIndex === currentImageIndex[index]
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      onClick={() =>
                        handleThumbnailClick(index, thumbnailIndex)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.location}</p>
                <p className="mt-2">
                  <span className="bg-primary text-white px-2 py-1 rounded text-sm">
                    {item.rating}
                  </span>{" "}
                  ({item.reviews} Ratings) - {item.description}
                </p>
                <div className="flex gap-2 mt-2 text-gray-700">
                  {item.features.map((feature, featureIndex) => (
                    <span key={featureIndex}>{feature}</span>
                  ))}
                </div>
                <p className="text-red-600 text-lg mt-4">
                  ₹{item.price}{" "}
                  <span className="line-through text-gray-500 ml-2">
                    ₹{item.originalPrice}
                  </span>{" "}
                  <span className="text-sm">
                    {Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                        100
                    )}
                    % off
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  + ₹{item.taxes} taxes & fees · per room per night
                </p>
                <div className="flex justify-between mt-4">
                  <button className="bg-secondary text-white py-2 px-4 rounded hover:bg-secondary hover:bg-opacity-80">
                    View Details
                  </button>
                  <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary hover:bg-opacity-80">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
