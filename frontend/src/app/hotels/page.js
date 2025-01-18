"use client"
import FilterSidebar from "@/Components/HotelFilter/HotelFilter";
import React from "react";
import Header from "@/Components/Navbar/Header";
import HotelList from "@/pages/Hotel/HotelsList";
import { Router } from "react-router-dom";
const Page = () => {
    return (
        <>
            {/* <Router> */}
            <div className=""><Header/></div>
            <div className="pt-28 flex"><FilterSidebar /><HotelList /></div>
            {/* </Router> */}
        </>
    );
};
export default Page;
