import React, { useState } from 'react';

const OTPHandler = ({ email, onSubmit }) => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        e.target.nextSibling.focus();
      }
    }
  };

  const handleResendOtp = () => {
    setResendDisabled(true);
    // Trigger resend OTP logic
    setTimeout(() => setResendDisabled(false), 60000); // Enable after 60 seconds
  };

  return (
    <div className=" bg-primary p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Enter OTP
      </h2>
      <p className="text-sm text-white text-center mb-4">
        OTP sent to: <span className="font-bold">{email}</span>
      </p>
      <div className="flex gap-4 justify-center">
        {otp.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-12 h-12 border-b-2 border-white bg-transparent text-white text-center text-2xl focus:outline-none focus:border-secondary"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
      </div>
      <button
        onClick={handleResendOtp}
        className={`mt-4 text-sm w-full ${
          resendDisabled ? 'text-gray-500' : 'text-secondary'
        }`}
        disabled={resendDisabled}
      >
        Resend OTP
      </button>
      <button
        onClick={() => onSubmit(otp.join(''))}
        className="mt-6 bg-secondary text-white px-6 py-2 rounded hover:bg-white hover:text-primary transition w-full"
      >
        Verify
      </button>
      {/* <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition w-full">
        Login with Google
      </button> */}
    </div>
  );
};

export default OTPHandler;
