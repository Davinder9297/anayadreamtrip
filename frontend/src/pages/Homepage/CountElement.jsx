"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import bgImg from "../../../public/images/herosection/CountElement/bgImg.png";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 721 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 720, min: 481 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 2,
  },
};

function CountElement() {
  const [trustedMembers, setTrustedMembers] = useState(0);
  const [gstFiled, setGstFiled] = useState(0);
  const [tdsFiled, setTdsFiled] = useState(0);
  const [itrFiled, setItrFiled] = useState(0);

  const animateCount = (setCount, target) => {
    let count = 0;
    const duration = 2000;
    const interval = (target / duration) * 10;

    const intervalId = setInterval(() => {
      count += interval;
      if (count >= target) {
        setCount(target);
        clearInterval(intervalId);
      } else {
        setCount(Math.ceil(count));
      }
    }, 10);
  };

  useEffect(() => {
    animateCount(setTrustedMembers, 1762);
    animateCount(setGstFiled, 2078);
    animateCount(setTdsFiled, 7064);
    animateCount(setItrFiled, 1212);
  }, []);

  const items = [
    { count: trustedMembers, label: "Trusted Members", icon: "/images/herosection/CountElement/countelement1.svg" },
    { count: gstFiled, label: "GST Return Filed", icon: "/images/herosection/CountElement/countelement2.svg" },
    { count: tdsFiled, label: "TDS Return Filed", icon: "/images/herosection/CountElement/countelement3.svg" },
    { count: itrFiled, label: "ITR Filed", icon: "/images/herosection/CountElement/countelement4.svg" },
  ];

  return (
    <div
      className={`bg-cover h-44 w-[100%] flex ml-auto mb-8 xsm:h-40 xsm:pt-0 xsm:bg-contain xsm:bg-no-repeat small:h-44 small:mt-0 small:pt-0 xsm:mt-0 small:bg-contain small:bg-no-repeat`}
      style={{ backgroundImage: `url(${bgImg.src})` }}
    >
      {/* Desktop View */}
      <div className="xsm:hidden small:hidden flex justify-between w-[80%] mx-auto items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.icon}
              alt=""
              height={50}
              width={50}
              className="mb-4 mid:h-10"
            />
            <div className="mb-4 text-[#252B42] text-[24px] font-[700] font-inter mid:text-base">
              {item.count}+
            </div>
            <div className="mb-4 text-[#737373] text-[14px] font-[400] font-inter mid:text-base">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View Carousel */}
      <div className="block mid:hidden lg:hidden xl:hidden 2xl:hidden w-[90%] mx-auto">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          showDots={true}
          draggable={true}
          arrows={false}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center small:mt-6 xsm:mt-10 xsm:mb-7 small:mb-7"
            >
              <Image
                src={item.icon}
                alt=""
                height={50}
                width={50}
                className="mb-4 xsm:mb-2 xsm:h-8 small:h-10"
              />
              <div className="mb-4 text-[#252B42] text-[24px] font-[700] font-inter xsm:text-sm small:text-sm">
                {item.count}+
              </div>
              <div className="mb-4 text-[#737373] text-[14px] font-[400] font-inter xsm:text-sm small:text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CountElement;
