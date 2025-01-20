"use client";
import Carousel from "@/components/Carousel/Carousel";
import { PiUsersThreeFill } from "react-icons/pi";
import React, { useState } from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaCheck, FaDoorOpen } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";
import {
  FaTv,
  FaShower,
  FaLock,
  FaWifi,
  FaLaptop,
  FaSnowflake,
  FaBath,
  FaBuilding,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import RoomFinalDetails from "./RoomFinalDetails";

const AvailabilityCalendar = dynamic(() => import("./AvailabilityCalendar"), { ssr: false });

const RoomDetails = () => {
  const images = [
    "/images/herosection/hero3.webp",
    "/images/herosection/hero1.webp",
    "/images/herosection/hero2.webp",
  ];

  const amenities = [
    { icon: <FaTv size={25} />, label: "Cable TV" },
    { icon: <FaShower size={25} />, label: "Shower" },
    { icon: <FaLock size={25} />, label: "Safebox" },
    { icon: <FaWifi size={25} />, label: "Free WiFi" },
    { icon: <FaLaptop size={25} />, label: "Work Desk" },
    { icon: <FaSnowflake size={25} />, label: "Refrigerator" },
    { icon: <FaBath size={25} />, label: "Bathub" },
    { icon: <FaBuilding size={25} />, label: "City View" },
  ];

  const roomFacilities = [
    { title: "Wi-Fi", description: "Complimentary High-Speed Wi-Fi" },
    {
      title: "Climate Control",
      description: "Individual Air Conditioning and Heating",
    },
    {
      title: "Entertainment",
      description: "50-inch Flat-Screen TV with Cable and Satellite",
    },
    { title: "Workspace", description: "Ergonomic Work Desk and Chair" },
    { title: "Safety", description: "In-Room Safe" },
    {
      title: "Communication",
      description: "Direct-Dial Telephone with Voicemail",
    },
    {
      title: "Convenience",
      description: "Alarm Clock, Iron, and Ironing Board",
    },
  ];

  const handleApply = ({ checkIn, checkOut }) => {
    console.log("Check-In Date:", checkIn);
    console.log("Check-Out Date:", checkOut);
  };

  return (
    <div>
      <div className="h-96 bg-black w-full mt-0">
        <Carousel images={images} />
      </div>
      <div className="w-[80%] mx-auto flex mt-8">
        <div className="w-[60%] pr-10">
          <div className="text-[48px] font-[500] font-marcellus text-[#181818]">
            Canyon Crest
          </div>
          <div className="flex gap-8 mt-2">
            <div className="flex text-primary ">
              <PiUsersThreeFill className="my-auto mr-2" size={25} />{" "}
              <div className="text-secondary font-[500]">2 Guests </div>
            </div>
            <div className="flex text-primary ">
              <FaExpandArrowsAlt className="my-auto mr-2" size={20} />{" "}
              <div className="text-secondary font-[500]">35 feets size </div>
            </div>
            <div className="flex text-primary ">
              <FaDoorOpen className="my-auto mr-2" size={25} />{" "}
              <div className="text-secondary font-[500]">Connecting Rooms </div>
            </div>
            <div className="flex text-primary ">
              <IoBedSharp className="my-auto mr-2" size={25} />{" "}
              <div className="text-secondary font-[500]">1 King Bed </div>
            </div>
          </div>
          <div className="font-jost text-base text-[#606060] text-justify mt-6">
            Ea sunt tempor dolor id do nisi est sint culpa in eiusmod sed aliqua
            elit nisi nulla mollit proident minim commodo aute elit ut mollit
            velit exercitation cillum quis sed dolore quis laboris nostrud
            exercitation magna anim aliquip exercitation est reprehenderit
            labore officia dolore eu non in do exercitation deserunt tempor
            aliqua enim esse ex deserunt magna in esse nostrud.
          </div>
          <div>
            <div className="text-secondary text-2xl font-marcellus my-4 mt-8">
              Room Amenities
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 xsm:grid-cols-3 gap-6">
              {amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-primary"
                >
                  {item.icon}
                  <span className="text-secondary font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-secondary text-2xl font-marcellus my-4 mt-10">
              Room Facilities
            </div>
            <div className="space-y-2">
              {roomFacilities.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <FaCheck className="text-primary mt-1" />
                  <div>
                    <span className="font-bold text-secondary">
                      {item.title}:{" "}
                    </span>
                    <span className="text-secondary">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pb-40"><AvailabilityCalendar onApply={handleApply}/></div>
        </div>
        <div className="w-[40%] bg-secondary rounded-md h-fit py-8 px-6"><RoomFinalDetails/></div>
      </div>
    </div>
  );
};

export default RoomDetails;
