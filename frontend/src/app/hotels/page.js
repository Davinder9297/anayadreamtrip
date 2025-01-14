import FilterSidebar from "@/Components/HotelFilter/HotelFilter";
import React from "react";
import Header from "@/Components/Navbar/Header";
const Page = () => {
    return (
        <div>
                <div className="relative"><Header /></div>
                <div className="mt-0"><FilterSidebar /></div>
        </div>
    );
};
export default Page;
