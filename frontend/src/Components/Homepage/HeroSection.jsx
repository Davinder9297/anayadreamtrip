import React from "react";
import BookingMenu from "./BookingMenu";
import CountElement from "./CountElement";
import TestimonialSlider from "./Testinomials";
import Speciality from "./Speciality";
import Footer from "../Footer/Footer";
import Header from "../Navbar/Header";
import AccommodationList from "./Accomodation";

const SnowflakeAnimation = React.lazy(() =>
  import("../Homepage/SnowFlakeAnimation")
);

export default function HeroSection() {
  return (
    <div className="">
      <div className="relative"><Header/></div>
      <div className="relative"><SnowflakeAnimation /></div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2  w-[75%]"><BookingMenu/></div>
      <div><CountElement/></div>
      <div><Speciality/></div>
      <div><AccommodationList/></div>
      <div><TestimonialSlider/></div>
      <div><Footer/></div>
      
    </div>
  );
}
