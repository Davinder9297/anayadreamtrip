"use client";
import Carousel from "@/Components/Carousel/Carousel";
import FilterSidebar from "@/Components/HotelFilter/HotelFilter";
import CountElement from "@/pages/Homepage/CountElement";
import HotelList from "@/pages/Hotel/HotelsList";
import React, { useEffect, useRef, useState } from "react";
import { FaCar, FaStar } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Page = () => {
    const items = [
        {
            title: "Deluxe Room",
            location: "1st Floor, Block A, Hotel Grand, Mumbai",
            rating: 4.4,
            reviews: 250,
            description: "Spacious and Comfortable",
            features: ["King Bed", "Free Wifi", "Mini Bar", "AC"],
            price: 3200,
            originalPrice: 5800,
            taxes: 500,
            images: [
                "/images/hotels/1.png",
                "/images/hotels/2.png",
                "/images/hotels/3.png",
                // "/images/hotels/4.png",
                // "/images/hotels/5.png",
                // "/images/hotels/6.png",
            ],
        },
        {
            title: "Super Deluxe Room",
            location: "2nd Floor, Block B, Hotel Blue Moon, Delhi",
            rating: 4.6,
            reviews: 320,
            description: "Elegant and Stylish",
            features: ["Balcony", "Jacuzzi", "Free Breakfast", "AC"],
            price: 4500,
            originalPrice: 7200,
            taxes: 600,
            images: [
                // "/images/hotels/1.png",
                "/images/hotels/2.png",
                "/images/hotels/3.png",
                "/images/hotels/4.png",
                // "/images/hotels/5.png",
                // "/images/hotels/6.png",
            ],
        },
        // {
        //     title: "Executive Suite",
        //     location: "3rd Floor, Grand Tower, Bangalore",
        //     rating: 4.8,
        //     reviews: 150,
        //     description: "Luxurious and Spacious",
        //     features: ["Private Lounge", "Smart TV", "Butler Service", "AC"],
        //     price: 6800,
        //     originalPrice: 9800,
        //     taxes: 800,
        //     images: [
        //         // "/images/hotels/1.png",
        //         // "/images/hotels/2.png",
        //         "/images/hotels/3.png",
        //         "/images/hotels/4.png",
        //         "/images/hotels/5.png",
        //         // "/images/hotels/6.png",
        //     ],
        // },
        {
            title: "Presidential Suite",
            location: "Penthouse, The Royal Hotel, Chennai",
            rating: 5.0,
            reviews: 90,
            description: "Royalty Redefined",
            features: ["Private Pool", "Personal Chef", "Home Theatre", "AC"],
            price: 15000,
            originalPrice: 22000,
            taxes: 2000,
            images: [
                // "/images/hotels/1.png",
                // "/images/hotels/2.png",
                // "/images/hotels/3.png",
                "/images/hotels/4.png",
                "/images/hotels/5.png",
                "/images/hotels/6.png",
            ],
        },
        {
            title: "Standard Room",
            location: "Ground Floor, Budget Inn, Kolkata",
            rating: 4.0,
            reviews: 500,
            description: "Affordable Comfort",
            features: ["Twin Bed", "TV", "Free Wifi", "Fan"],
            price: 1800,
            originalPrice: 3500,
            taxes: 300,
            images: [
                // "/images/hotels/1.png",
                "/images/hotels/2.png",
                // "/images/hotels/3.png",
                "/images/hotels/4.png",
                // "/images/hotels/5.png",
                "/images/hotels/6.png",
            ],
        },
        {
            title: "Family Suite",
            location: "5th Floor, Cozy Stay, Hyderabad",
            rating: 4.3,
            reviews: 280,
            description: "Perfect for Families",
            features: ["2 Bedrooms", "Kitchenette", "Kids Play Area", "AC"],
            price: 5500,
            originalPrice: 7800,
            taxes: 700,
            images: [
                "/images/hotels/1.png",
                // "/images/hotels/2.png",
                "/images/hotels/3.png",
                "/images/hotels/4.png",
                // "/images/hotels/5.png",
                "/images/hotels/6.png",
            ],
        },
    ];

    const images = [
        "/images/hotels/1.png",
        "/images/hotels/2.png",
        "/images/hotels/3.png",
        "/images/hotels/4.png",
        "/images/hotels/5.png",
        "/images/hotels/6.png",
    ];

    const locationRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-slide-up");
                    } else {
                        entry.target.classList.remove("animate-fade-slide-up");
                    }
                });
            },
            { threshold: 0.3 } // Animation triggers when 30% of section is visible
        );

        if (locationRef.current) {
            observer.observe(locationRef.current);
        }

        return () => {
            if (locationRef.current) {
                observer.unobserve(locationRef.current);
            }
        };
    }, []);

    const ratingsData = {
        average: 3.8,
        totalRatings: 3313,
        totalReviews: 256,
        breakdown: [
            { star: 5, count: 1672 },
            { star: 4, count: 565 },
            { star: 3, count: 381 },
            { star: 2, count: 225 },
            { star: 1, count: 470 },
        ],
    };

    const RatingBar = ({ star, count, total }) => {
        const percentage = (count / total) * 100;
        const barColor =
            star === 5
                ? "bg-green-600"
                : star === 4
                    ? "bg-green-500"
                    : star === 3
                        ? "bg-green-400"
                        : star === 2
                            ? "bg-orange-400"
                            : "bg-red-500";

        return (
            <div className="flex items-center gap-2">
                <span className="w-6 text-sm font-medium">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`${barColor} h-2.5 rounded-full`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <span className="w-10 text-sm text-gray-600 text-right">{count}</span>
            </div>
        );
    };

    const [reviews, setReviews] = useState([
        {
          rating: 4,
          title: "Value-for-money",
          comment: "Product is good but delivery agent is very bad, not timely response and delivered product.",
          author: "Vijay kumar Bunkar",
          location: "Sikar District",
          date: "2 months ago",
          images: [],
          authorImage: "/images/familyIcon.png",
        },
        {
          rating: 5,
          title: "Brilliant",
          comment: "Best product quality and dumbbell and palte rod ae earthing is good",
          author: "Shubham Mahto",
          location: "Samastipur District",
          date: "3 months ago",
          images: [],
          authorImage: "/images/familyIcon.png",
        },
        {
          rating: 5,
          title: "Worth every penny",
          comment: "Best quality 2.5 kg 4 or 5 kg 6",
          author: "Flipkart Customer",
          location: "Ratlam",
          date: "3 months ago",
          images: [
            "/images/hotels/1.png",
        "/images/hotels/2.png",
        "/images/hotels/3.png",
        "/images/hotels/4.png",
        "/images/hotels/5.png",
        "/images/hotels/6.png",
          ],
          authorImage: "/images/familyIcon.png",
        },
      ]);

      const [formData, setFormData] = useState({
        author: "",
        location: "",
        rating: 0,
        title: "",
        comment: "",
        authorImage: "",
      });
    
      const [hoveredRating, setHoveredRating] = useState(0);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
      };

    return (
        <>
            <div className="h-[450px]">
                <Carousel images={images} />
            </div>

            <div className="max-w-7xl mx-auto p-6 bg-white">
                <h1 className="text-4xl font-bold text-gray-900">Ginger Mumbai Airport</h1>
                <p className="text-gray-700 mt-2">
                    Close to the airport, this boutique property offers tidy rooms, a lively sports bar, and a host of amenities.
                </p>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-900">Food and Dining</h2>
                    <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
                        <li>
                            Qmin, the property’s all-day dining restaurant serves a range of thoughtfully curated local and international delights.
                        </li>
                        <li>The property’s swanky sports bar offers premium drinks and mouth-watering savouries.</li>
                        <li>The availability of good breakfast at the property is liked by travellers.</li>
                    </ul>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-900">Location & Surroundings</h2>
                    <p className="text-gray-700 mt-2">
                        The property’s strategic location in Vile Parle East provides convenient access to the railway station, airport, shopping malls, and beaches. More than 75 travellers have appreciated the property’s location during their stay here.
                    </p>
                </div>
            </div>

            <div>
                <CountElement />
            </div>

            {/* Animated Location Section */}
            <div ref={locationRef} className="h-96 bg-secondary opacity-0 transition-all duration-1000 ease-in-out flex justify-between w-full">
                <div className="w-[45%] h-80 my-auto mx-auto flex justify-center">
                    <MapContainer
                        center={[19.076, 72.8777]} // Coordinates for Mumbai
                        zoom={13}
                        scrollWheelZoom={false}
                        className="w-full h-full rounded-lg"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[19.076, 72.8777]}>
                            <Popup>Ginger Brown Hotel, Mumbai</Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="w-[60%] px-6 py-4 flex flex-col items-center justify-center gap-6">
                    <div className="text-white text-4xl text-center font-jost font-[600]">Ginger Brown Hotel </div>
                    <div className="text-white text-lg w-[80%] text-center">Radisson Jass Shimla, nestled in the lap of the Himalayas, is conveniently located in the historic city centre and offers stunning views from the rooms and suites.The Gaiety Heritage Cultural Complex, Jakhu Temple and Christ Church are just a few minutes away from the hotel.More than 150 travellers have appreciated the property's location during their stay here.</div>
                    <ul className="text-left justify-start flex flex-col w-[80%] text-white text-lg font-marcellus"><div className="flex gap-4 my-auto"><ImLocation2 className="my-auto" size={20} />Near Church, Mall Road, Mumbai</div>
                        <div className="flex gap-4 my-auto mt-2"><FaCar className="my-auto" size={20} />Drive of just 5minutes from the longue</div></ul>

                </div>
            </div>

            {/* rooms details */}
            <div className="flex justify-between mt-12">
                <FilterSidebar />
                <HotelList items={items} name={'Rooms'} setval={true} />

            </div>

            {/* ratings */}
            {/* <div className="font-marcellus font-bold text-[48px] text-center py-12">Reviews and Ratings</div> */}
            <div className="flex justify-between">
            <div className=" mx-auto p-4 bg-white rounded-lg w-[30%] px-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold">{ratingsData.average}</span>
                    <span className="text-yellow-500">★</span>
                </div>
                <p className="text-sm text-gray-600">   
                    {ratingsData.totalRatings.toLocaleString()} Ratings & {" "}
                    {ratingsData.totalReviews.toLocaleString()} Reviews
                </p>

                <div className="mt-4 space-y-2">
                    {ratingsData.breakdown.map((rating) => (
                        <RatingBar
                            key={rating.star}
                            star={rating.star}
                            count={rating.count}
                            total={ratingsData.totalRatings}
                        />
                    ))}
                </div>
            </div>
            <div className="w-[70%] ml-4">
            {reviews.map((review, index) => (
          <div className="p-4 border-b flex gap-4 items-start w-[90%] mx-auto" key={index}>
          <img
            src={review.authorImage || "/images/familyIcon.png"}
            alt={review.author}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-sm">{review.author}</h4>
                <p className="text-xs text-gray-500">{review.location}</p>
              </div>
              <span className="text-xs text-gray-400">{review.date}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                {review.rating}★
              </span>
              <span className="font-semibold text-sm">{review.title}</span>
            </div>
            <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
            {review.images && (
              <div className="flex gap-2 mt-2">
                {review.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="review"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        ))}
            </div>
            </div>

            {/* Add review */}
            {/* <div className="font-marcellus font-bold text-[48px] text-center py-12">Add your reviews</div> */}
  
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-8 bg-secondary text-white p-8 rounded-lg shadow-md mt-8 h-screen">
      <div className="flex-1 items-center my-auto justify-center">
        <h2 className="mb-4 font-marcellus font-bold text-[48px] text-center px-12">We'd love to hear your thoughts</h2>
        <p className="text-xl px-20 font-marcellus text-center text-gray-400">
          Tell us about your experience or share your thoughts. We're here to listen and improve.
        </p>
        <div className="w-full flex justify-center items-center mt-8"><button
          type="submit"
          className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mx-auto"
        >
          Send
        </button></div>
        
      </div>

      {/* Form Fields */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col space-y-8 font-jost text-gray-900 px-[4%] my-auto"
      >
        <div>
          <label className="block text-sm font-medium text-white mb-1">Your Name</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border border-gray-700 bg-gray-800 text-white"
            placeholder="Enter your name"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-white mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border border-gray-700 bg-gray-800 text-white"
            placeholder="Enter your location"
          />
        </div> */}

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer ${
                  (hoveredRating || formData.rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-500"
                }`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border border-gray-700 bg-gray-800 text-white"
            placeholder="Enter a title for your review"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border border-gray-700 bg-gray-800 text-white"
            placeholder="Share your thoughts"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Author Image URL</label>
          <input
            type="text"
            name="authorImage"
            value={formData.authorImage}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border border-gray-700 bg-gray-800 text-white"
            placeholder="Enter a URL for your profile image"
          />
        </div>
      </form>
    </div>
        </>
    );
};

export default Page;
