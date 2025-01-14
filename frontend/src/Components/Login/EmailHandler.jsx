import React, { useState } from "react";

const EmailHandler = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  const handleGoogleLogin = () => {
    console.log("Login with Google clicked!");
    // Handle Google login logic
  };

  return (
    <div className="w-full h-full pt-12">
      {" "}
      {/* Added pt-12 to add space from top */}
      <h2 className="text-4xl font-bold text-black text-center mb-4 font-marcellus">
        Login
      </h2>
      <div className="flex-1 relative mt-8 w-[90%] mx-auto">
        <label className="font-semibold absolute -top-3 left-3 bg-white px-1  text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
        />
      </div>
      <div className="mx-auto w-[90%]">
        <button
          onClick={() => onLogin(email)}
          className="mt-6 hover:bg-secondary hover:text-white px-6 py-2 rounded bg-primary text-white transition w-full"
        >
          Next
        </button>
      </div>
      <div className="mx-auto w-[90%] mt-16">
        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center bg-[#EFF4FB] hover:bg-opacity-70 text-[#64748B] font-[500] py-2 px-4 rounded shadow"
        >
          <img
            src="/icons/Google_Icon.svg"
            alt="Google Icon"
            className="w-8 h-8 mr-2"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default EmailHandler;
