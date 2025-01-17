import React, { useState } from "react";

const OTPHandler = ({ email, onSubmit, otpLength = 6 }) => {
  const [otp, setOtp] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Ensure only numbers are allowed
      let newOtp = otp.split("");
      newOtp[index] = value;
      newOtp = newOtp.join("").slice(0, otpLength);
      setOtp(newOtp);

      if (value.length === 1 && index < otpLength - 1) {
        e.target.nextSibling?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      let newOtp = otp.split("");
      if (otp[index]) {
        // If the current box has a value, just clear it
        newOtp[index] = "";
      } else if (index > 0) {
        // If the current box is empty, move to the previous box
        newOtp[index - 1] = "";
        e.target.previousSibling?.focus();
      }
      setOtp(newOtp.join(""));
    }
  };

  const handleResendOtp = () => {
    setResendDisabled(true);
    // Trigger resend OTP logic
    setTimeout(() => setResendDisabled(false), 60000); // Enable after 60 seconds
  };

  return (
    <div className="mt-12 w-full h-full p-6">
      <h2 className="text-4xl font-bold text-black text-center mb-4 font-marcellus">
        Enter OTP
      </h2>
      <p className="text-sm text-black text-center mb-4">
        OTP sent to: <span className="font-bold">{email}</span>
      </p>
      <div className="flex gap-4 justify-center mt-12">
        {Array.from({ length: otpLength }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className={`w-12 h-12 border-2 rounded ${
              focusedIndex === index
                ? "border-secondary shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                : "border-primary"
            } bg-transparent text-center text-2xl text-black focus:outline-none`}
            value={otp[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
          />
        ))}
      </div>
      <div className="w-[90%] mt-8 flex items-end justify-end">
        <button
          onClick={handleResendOtp}
          className={`mt-4 text-sm ${
            resendDisabled ? "text-gray-500" : "text-secondary"
          }`}
          disabled={resendDisabled}
        >
          Resend OTP
        </button>
      </div>

      <button
        onClick={() => onSubmit(otp)}
        className="mt-6 bg-secondary text-white px-6 py-2 rounded hover:bg-primary hover:text-white transition w-full"
      >
        Verify
      </button>
    </div>
  );
};

export default OTPHandler;
