import React, { useState } from "react";
import Modal from "../../Components/Modal/Modal";
import RoomsModal from "./RoomsModal";

const RoomsAndGuestsDropdown = ({ data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="py-6 pl-6" onClick={openModal}>
        <div className="cursor-pointer text-lg">
          <div className="-mt-4 font-jost text-gray-700 text-lg">
            Rooms and Guests
          </div>
          <div className="cursor-pointer text-xl font-[500] font-jost mt-3 flex">
            {data?.rooms !== 0 ? <span>{data?.rooms} Room, </span> : ""}
            {<div className="text-white">.</div>}
            {data?.adults !== 0 ? <span>{data?.adults} Adults </span> : ""}
            {""}
            {data?.children !== 0 ? (
              <span>, {data?.children} Children </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Rooms and Guests"
        width="580px"
      >
        <RoomsModal data={data} setData={setData} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default RoomsAndGuestsDropdown;
