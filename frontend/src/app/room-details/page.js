"use client"
import React from "react";
import Header from "@/components/Navbar/Header";
import RoomDetails from "@/pages/Hotel/Rooms/RoomDetails";
const Page = () => {
    return (
        <>
            {/* <Router> */}
            <div className=""><Header/></div>
            <div className="pt-20 flex"><RoomDetails/></div>
            {/* </Router> */}
        </>
    );
};
export default Page;
