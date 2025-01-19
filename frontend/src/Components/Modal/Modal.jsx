import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  width = "50%",
  height = "auto",
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
      modalRef.current?.focus(); // Focus on the modal
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="relative rounded-lg bg-white shadow-lg"
        style={{
          width,
          height,
          maxWidth: "90%",
          maxHeight: "90%",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop clicks
      >
        {title && <h2 className="mb-4 text-lg font-bold p-6">{title}</h2>}
        {children}
        <button
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-800 shadow"
          onClick={onClose}
          aria-label="Close modal"
        >
          <span className="text-lg font-bold">x</span>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
