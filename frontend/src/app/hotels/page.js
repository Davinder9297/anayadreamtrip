"use client"
import FilterSidebar from "@/Components/HotelFilter/HotelFilter";
import React from "react";
import HotelList from "@/pages/Hotel/HotelsList";
const Page = () => {
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
    return (
        <>
            <div className="flex"><FilterSidebar /><HotelList items={items} name={'Hotel'} setval={false}/></div>
            {/* </Router> */}
        </>
    );
};
export default Page;
