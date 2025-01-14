"use client";
import FilterSidebar from "@/Components/HotelFilter/HotelFilter";
import React from "react";
import Header from "@/Components/Navbar/Header";
import ClientWrapper from "../ClientWrapper";
const Page = () => {
    return (
        <>
            <ClientWrapper>
                <div className="relative"><Header /></div>
                <div className="mt-0"><FilterSidebar /></div>
            </ClientWrapper>
        </>
    );
};
export default Page;
