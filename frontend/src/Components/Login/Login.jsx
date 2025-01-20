import React, { useState } from "react";
import EmailHandler from "./EmailHandler";
import OTPHandler from "./OTPHandler";

const Login = () => {
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP
  const [email, setEmail] = useState("");

  const handleLogin = (email) => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmail(email);
      setStep(2); // Move to the OTP step
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleOtpSubmit = (otp) => {
    console.log("OTP submitted:", otp);
    // Handle OTP verification logic
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 bg-secondary flex items-center justify-center">
        <img src="/images/herosection/login/login.jpg" alt="login image" className="h-full" />
      </div>

      {/* Right side: Login or OTP */}
      <div className="w-1/2">
        {/* Conditionally Render Email or OTP Handler */}
        <div className="w-full">
          {step === 1 && <EmailHandler onLogin={handleLogin} />}
          {step === 2 && (
            <OTPHandler email={email} onSubmit={handleOtpSubmit} />
          )}
        </div>

        {/* Login with Google Button */}
      </div>
    </div>
  );
};

export default Login;
