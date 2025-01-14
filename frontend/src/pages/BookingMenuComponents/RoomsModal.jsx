import React from "react";

const RoomsModal = ({ data, setData, closeModal }) => {
  return (
    <div className="py-4 px-16 min-w-[500px] font-jost p-6">
      {/* <h2 className="text-lg font-bold mb-4">Rooms and Guests</h2> */}

      {/* Rooms Row */}
      <div className="flex justify-between items-center mb-4">
        <span>No. of Rooms</span>
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            className="px-4 py-2 bg-gray-200"
            onClick={() =>
              setData({ ...data, rooms: Math.max(1, data?.rooms - 1) })
            }
            disabled={data?.rooms <= 1}
          >
            -
          </button>
          <div className="px-6 py-2 text-center">{data?.rooms}</div>
          <button
            className="px-4 py-2 bg-gray-200"
            onClick={() => setData({ ...data, rooms: data?.rooms + 1 })}
          >
            +
          </button>
        </div>
      </div>

      {/* Adults Row */}
      <div className="flex justify-between items-center mb-4">
        <span>No. of Adults</span>
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            className="px-4 py-2 bg-gray-200"
            onClick={() =>
              setData({ ...data, adults: Math.max(1, data?.adults - 1) })
            }
            disabled={data?.adults <= 1}
          >
            -
          </button>
          <div className="px-6 py-2 text-center">{data?.adults}</div>
          <button
            className="px-4 py-2 bg-gray-200"
            onClick={() => setData({ ...data, adults: data?.adults + 1 })}
          >
            +
          </button>
        </div>
      </div>

      {/* Children Row */}
      <div className="flex justify-between items-center mb-4">
        <span>No. of Children</span>
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            className="px-4 py-2 bg-gray-200"
            onClick={() =>
              setData({ ...data, children: Math.max(0, data?.children - 1) })
            }
            disabled={data?.children <= 0}
          >
            -
          </button>
          <div className="px-6 py-2 text-center">{data?.children}</div>
          <button
            className="px-4 py-2 bg-gray-200"
            onClick={() => setData({ ...data, children: data?.children + 1 })}
          >
            +
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        className="px-6 py-2 bg-primary text-white rounded-md flex justify-center items-center w-24 mx-auto mt-8"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  );
};

export default RoomsModal;
