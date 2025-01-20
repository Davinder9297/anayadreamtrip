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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          width,
          height,
          maxWidth: "90%",
          maxHeight: "90%",
          padding: "20px",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop clicks
      >
        {title && (
          <h2
            style={{
              marginBottom: "16px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {title}
          </h2>
        )}
        {children}
        <button
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e5e5e5",
            color: "#333",
            borderRadius: "50%",
            border: "none",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          }}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕ 
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
