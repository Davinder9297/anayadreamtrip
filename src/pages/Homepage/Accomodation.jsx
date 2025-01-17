import React from "react";

const AccommodationList = () => {
  const accommodations = [
    {
      title: "Canyon Crest",
      guests: "2",
      size: "35 Feets",
      description:
        "Ea sunt tempor dolor id do nisi est sint culpa in eiusmod sed aliqua elit nisi nulla mollit proident minim commodo aute elit ut mollit velit exercitation cillum quis sed dolore quis laboris nostrud.",
    },
    {
      title: "Glacier Glade",
      guests: "2",
      size: "35 Feets",
      description:
        "Ea sunt tempor dolor id do nisi est sint culpa in eiusmod sed aliqua elit nisi nulla mollit proident minim commodo aute elit ut mollit velit exercitation cillum quis sed dolore quis laboris nostrud.",
    },
  ];

  return (
    <div className="mx-auto py-12">
      <div className="text-center text-[20px] font-jost fomt-[600] text-[#181818]">
        LUXURY
      </div>
      <div className="text-center mb-6 text-[52px] font-marcellus fomt-[700] text-[#181818]">
        Resorts
      </div>
      <div className="w-full flex justify-between">
        <div className="w-[30%] mx-auto my-auto">
          <div className="flex flex-col gap-2 w-full">
            <div className="font-marcellus font-[700] text-[26px] text-[#181818]">
              {accommodations[0].title}
            </div>
            <div className="flex gap-8">
              <div className="font-jost font-[500] text-[14px] text-[#606060]">
                {accommodations[0].guests} Guests
              </div>
              <div className="font-jost font-[500] text-[14px] text-[#606060]">
                {accommodations[0].size} Size
              </div>
            </div>
            <div className="font-jost font-[500] text-[16px] text-[#606060] leading-loose text-justify">
              {accommodations[0].description}
            </div>
            <button className="bg-primary text-white w-fit px-6 py-2 rounded-md">
              View Details
            </button>
          </div>
        </div>
        <img
          src="/images/herosection/accomodations/accomodation1.png"
          alt=""
          className="w-1/2"
        />
      </div>

      {/* 2 */}
      <div className="w-full flex justify-between">
        <div className="w-[30%] mx-auto order-2 my-auto">
          <div className="flex flex-col gap-2 w-full justify-center">
            <div className="font-marcellus font-[700] text-[26px] text-[#181818]">
              {accommodations[1].title}
            </div>
            <div className="flex gap-8">
              <div className="font-jost font-[500] text-[14px] text-[#606060]">
                {accommodations[1].guests} Guests
              </div>
              <div className="font-jost font-[500] text-[14px] text-[#606060]">
                {accommodations[1].size} Size
              </div>
            </div>
            <div className="font-jost font-[500] text-[16px] text-[#606060] leading-loose text-justify">
              {accommodations[1].description}
            </div>
            <button className="bg-primary text-white w-fit px-6 py-2 rounded-md">
              View Details
            </button>
          </div>
        </div>
        <img
          src="/images/herosection/accomodations/accomodation2.png"
          alt=""
          className="w-1/2"
        />
      </div>

      {/* 3 */}
      <div className="w-full flex justify-between">
        <div className="w-[30%] mx-auto my-auto">
          <div className="flex flex-col gap-2 w-full">
            <div className="font-marcellus font-[700] text-[26px] text-[#181818]">
              {accommodations[0].title}
            </div>
            <div className="flex gap-8">
              <div className="font-jost font-[500] text-[14px] text-[#606060]">
                {accommodations[0].guests} Guests
              </div>
              <div className="font-jost font-[500] text-[14px] text-[#606060]">
                {accommodations[0].size} Size
              </div>
            </div>
            <div className="font-jost font-[500] text-[16px] text-[#606060] leading-loose text-justify">
              {accommodations[0].description}
            </div>
            <button className="bg-primary text-white w-fit px-6 py-2 rounded-md">
              View Details
            </button>
          </div>
        </div>
        <img
          src="/images/herosection/accomodations/accomodation3.png"
          alt=""
          className="w-1/2"
        />
      </div>
    </div>
  );
};

export default AccommodationList;
