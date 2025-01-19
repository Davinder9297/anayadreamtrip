import React from "react";
import BookingMenu from "./BookingMenu";
import CountElement from "./CountElement";
import TestimonialSlider from "./Testinomials";
import Speciality from "./Speciality";
import AccommodationList from "./Accomodation";

const SnowflakeAnimation = React.lazy(() => import("./SnowFlakeAnimation"));

export default function HeroSection() {
  return (
    <div className="">
        <SnowflakeAnimation />
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2  w-[75%]">
        <BookingMenu />
      </div>
        <CountElement />
        <Speciality />
        <AccommodationList />
        <TestimonialSlider />
    </div>
  );
}
