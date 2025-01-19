"use client"
import FilterSidebar from "@/Components/HotelFilter/HotelFilter";
import React from "react";
import HotelList from "@/pages/Hotel/HotelsList";
const Page = () => {
    return (
        <>
            <div className="pt-28 flex"><FilterSidebar /><HotelList /></div>
            {/* </Router> */}
        </>
    );
};
export default Page;
