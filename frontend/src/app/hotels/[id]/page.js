"use client";
import Carousel from "@/Components/Carousel/Carousel";
import FilterSidebar from "@/Components/HotelFilter/HotelFilter";
import CountElement from "@/pages/Homepage/CountElement";
import HotelList from "@/pages/Hotel/HotelsList";
import React, { useEffect, useRef } from "react";
import { FaCar } from "react-icons/fa6";
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
        // {
        //     title: "Penthouse Room",
        //     location: "Top Floor, Skyline Hotel, Goa",
        //     rating: 4.9,
        //     reviews: 120,
        //     description: "Exclusive and Private",
        //     features: ["Terrace", "Infinity Pool", "Private Bar", "AC"],
        //     price: 12000,
        //     originalPrice: 18000,
        //     taxes: 1500,
        //     images: [
        //         // "/images/hotels/1.png",
        //         "/images/hotels/2.png",
        //         "/images/hotels/3.png",
        //         "/images/hotels/4.png",
        //         "/images/hotels/5.png",
        //         "/images/hotels/6.png",
        //     ],
        // },
        // {
        //     title: "Luxury Villa",
        //     location: "Beachside, Sun Bay Resorts, Kerala",
        //     rating: 4.7,
        //     reviews: 60,
        //     description: "Tropical Paradise",
        //     features: ["Garden", "Private Beach", "Chef on Call", "AC"],
        //     price: 25000,
        //     originalPrice: 35000,
        //     taxes: 3500,
        //     images: [
        //         // "/images/hotels/1.png",
        //         // "/images/hotels/2.png",
        //         "/images/hotels/3.png",
        //         "/images/hotels/4.png",
        //         "/images/hotels/5.png",
        //         "/images/hotels/6.png",
        //     ],
        // },
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
            <div className="flex justify-between">
                <FilterSidebar/>
                <HotelList items={items} name={'Rooms'} setval={true}/>

            </div>
        </>
    );
};

export default Page;
