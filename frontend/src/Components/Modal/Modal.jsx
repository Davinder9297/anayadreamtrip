import React, { useEffect } from 'react';
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children, title }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Restore scrolling
    }
    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative rounded bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop clicks
      >
        {title && <h2 className="mb-4 text-lg font-bold">{title}</h2>}
        {children}
        <div
          className="absolute -right-6 -top-6 ml-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-gray-800 shadow-md shadow-black"
          onClick={onClose}
        >
          <span className="mb-1.5 text-2xl font-bold leading-none">x</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
