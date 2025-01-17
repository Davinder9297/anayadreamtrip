import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  width = "50%",
  height = "auto",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative rounded-lg bg-white shadow-lg"
        style={{
          width,
          height,
          maxWidth: "90%", // Ensures it doesn't exceed the screen width
          maxHeight: "90%", // Ensures it doesn't exceed the screen height
        }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop clicks
      >
        {title && <h2 className="mb-4 text-lg font-bold p-6">{title}</h2>}
        {children}
        <button
          className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-800 shadow"
          onClick={onClose}
        >
          <span className="text-lg font-bold">x</span>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
