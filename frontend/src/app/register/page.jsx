'use client';
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash } from 'react-icons/fi';
import { IoCloudUploadOutline } from 'react-icons/io5';
export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [panFile, setPanFile] = useState(null);
  const [aadharFile, setAadharFile] = useState(null);
  const [dragging, setDragging] = useState({ pan: false, aadhar: false });
  const stepsManager = [
    "Select Role",
    "Details",
    "OTP Verification",
    "Documents",
    "Finish",
  ];
  const stepsUser = ["Select Role", "Details", "OTP Verification", "Finish"];
  const steps = role === "Manager" ? stepsManager : stepsUser;

  const nextStep = () => setStep((prev) => prev + 1);
  const goToStep = (stepNumber) => setStep(stepNumber);

  const animations = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const handleOtpChange = (index, value, event) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    // Handle deletion with backspace
    if (event.nativeEvent.inputType === "deleteContentBackward") {
      if (!value && index > 0) {
        const previousInput = document.getElementById(`otp-${index - 1}`);
        if (previousInput) previousInput.focus();
      }
    } else if (value && index < otp.length - 1) {
      // Auto-focus the next field
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    setOtp(updatedOtp);
  };


  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'pan') {
        setPanFile(file);
      } else if (type === 'aadhar') {
        setAadharFile(file);
      }
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragging({ ...dragging, [type]: false });
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'pan') {
        setPanFile(file);
      } else if (type === 'aadhar') {
        setAadharFile(file);
      }
    }
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    setDragging({ ...dragging, [type]: true });
  };

  const handleDragLeave = (type) => {
    setDragging({ ...dragging, [type]: false });
  };

  const removeFile = (type) => {
    if (type === 'pan') {
      setPanFile(null);
    } else if (type === 'aadhar') {
      setAadharFile(null);
    }
  };
  return (
    <div className="font-jost flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ffffff] via-[#c7a581] to-[#ab8965]">
      <div className="flex max-w-5xl w-full min-h-[600px] overflow-hidden rounded-2xl bg-white shadow-lg mt-10">
        {/* Left Section */}
        <div className="w-1/2 bg-purple-50 flex p-8 md:flex flex-col items-center justify-center">
          <Image
            src="/images/hotels/illustration.webp"
            alt="Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8">
          {/* Step Indicators */}
          <div className="flex justify-center mb-6">
            {steps.map((stepName, index) => (
              <div
                key={index}
                onClick={() => index < step && goToStep(index + 1)}
                className={`flex items-center space-x-2 cursor-pointer ${index < step ? "text-[#ab8965]" : "text-gray-400"
                  }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${index < step ? "border-[#ab8965] bg-[#ab8965]" : "border-gray-300"
                    }`}
                >
                  <span
                    className={`text-sm font-semibold ${index < step ? "text-white" : "text-gray-500"
                      }`}
                  >
                    {index + 1}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="h-1 w-8 bg-gray-300">
                    <div
                      className={`h-full ${index < step - 1 ? "bg-[#ab8965]" : ""
                        }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Animated Forms */}
          <AnimatePresence mode="wait">
            {/* Step 1: Select Role */}
            {step === 1 && (
              <motion.div
                key="step-1"
                {...animations}
                transition={{ duration: 0.4 }}
                className="gap-10 h-full flex flex-col justify-center"
              >
                <h2 className="mb-4 text-3xl font-bold text-gray-800 text-center">
                  Register as
                </h2>
                <div className="flex flex-col gap-10">
                  <button
                    onClick={() => {
                      setRole("Manager");
                      nextStep();
                    }}
                    className="w-full rounded-lg border bg-gray-100 py-3 italic font-bold text-lg  text-gray-800 hover:bg-gray-200"
                  >
                    <Image
                      src="/images/manager.png"
                      alt="Manager"
                      width={80}
                      height={80}
                      className="inline-block mr-4"
                    />
                    Manager
                  </button>
                  <button
                    onClick={() => {
                      setRole("User");
                      nextStep();
                    }}
                    className="w-full rounded-lg border bg-gray-100 py-3 italic font-bold text-lg text-gray-800 hover:bg-gray-200"
                  >
                    <Image
                      src="/images/user.png"
                      alt="User"
                      width={80}
                      height={80}
                      className="inline-block mr-4"
                    />
                    User
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div
                key="step-2-details"
                {...animations}
                transition={{ duration: 0.4 }}
                className="gap-4 flex flex-col h-full justify-between  items-center  w-full p-4"
              >

                <form className="gap-4 w-full ">
                  <h2 className="mb-4 text-2xl font-bold text-gray-800">
                    {role} Details
                  </h2>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  {/* <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter your email"
                    />
                  </div> */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Create a password"
                    />
                  </div>
                  {role === "Manager" && (
                    <>
                      <div>
                        <label
                          htmlFor="pan"
                          className="block text-sm font-medium text-gray-600"
                        >
                          PAN Number
                        </label>
                        <input
                          type="text"
                          id="pan"
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Enter your PAN number"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="aadhar"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Aadhaar Number
                        </label>
                        <input
                          type="text"
                          id="aadhar"
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Enter your Aadhaar number"
                        />
                      </div>
                    </>
                  )}
                </form>
                <div className="flex justify-between w-full mb-3">
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="rounded-lg bg-gray-300 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-lg bg-[#ab8965] py-2 px-4 text-sm font-medium text-white hover:bg-yellow-600"
                  >
                    Next
                  </button>
                </div>

              </motion.div>
            )}

            {/* Step 3: OTP Verification */}
            {step === 3 && (
              <motion.div
                key="step-3-otp"
                {...animations}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-around h-full "
              >
                <div className="flex flex-col items-center">
                  <h2 className="mb-4 text-2xl font-bold text-gray-800">
                    OTP Verification
                  </h2>
                  <p className="text-gray-600">
                    Enter the 4-digit OTP sent to your email/phone.
                  </p>
                  <div className="mt-6 flex space-x-4">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleOtpChange(index, e.target.value, e)
                        }
                        maxLength={1}
                        className="w-12 h-12 rounded-lg border border-gray-300 text-center text-2xl font-medium text-gray-800 focus:border-purple-500 focus:ring-purple-500"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex w-full justify-between px-5">
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="rounded-lg bg-gray-300 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-lg bg-[#ab8965] py-2 px-4 text-sm font-medium text-white hover:bg-yellow-600"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Documents (Manager only) */}
            {role === "Manager" && step === 4 && (
              <motion.div
                key="step-4-documents"
                {...animations}
                transition={{ duration: 0.4 }}
                className="gap-4"
              >
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  Upload Documents
                </h2>
                <form className="flex flex-col gap-2">
                  <div
                    className={`w-full max-w-md border-2 ${dragging.pan ? 'border-primary bg-blue-50' : 'border-dashed border-gray-300 bg-white'
                      } rounded-lg p-2 text-center relative`}
                    onDragOver={(e) => handleDragOver(e, 'pan')}
                    onDragLeave={() => handleDragLeave('pan')}
                    onDrop={(e) => handleDrop(e, 'pan')}
                  >
                    <IoCloudUploadOutline className="text-4xl text-primary mx-auto" />
                    <p className="text-gray-500 font-medium mt-2">Upload your PAN Card</p>
                    <p className="text-sm text-gray-400">Files supported: PDF, PNG, JPG</p>
                    <div className="mt-4">
                      <label
                        htmlFor="pan-upload"
                        className="cursor-pointer inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Browse files
                      </label>
                      <input
                        type="file"
                        id="pan-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'pan')}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-400">Maximum size: 2 MB</p>
                    {panFile && (
                      <div className="mt-4 bg-white p-3 rounded-lg shadow flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{panFile.name}</span>
                        <button
                          onClick={() => removeFile('pan')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Aadhaar Card Upload */}
                  <div
                    className={`w-full max-w-md border-2 ${dragging.aadhar ? 'border-primary bg-blue-50' : 'border-dashed border-gray-300 bg-white'
                      } rounded-lg p-2 text-center relative`}
                    onDragOver={(e) => handleDragOver(e, 'aadhar')}
                    onDragLeave={() => handleDragLeave('aadhar')}
                    onDrop={(e) => handleDrop(e, 'aadhar')}
                  >
                    <IoCloudUploadOutline className="text-4xl text-primary mx-auto" />
                    <p className="text-gray-500 font-medium mt-2">Upload your Aadhaar Card</p>
                    <p className="text-sm text-gray-400">Files supported: PDF, PNG, JPG</p>
                    <div className="mt-4">
                      <label
                        htmlFor="aadhar-upload"
                        className="cursor-pointer inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Browse files
                      </label>
                      <input
                        type="file"
                        id="aadhar-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'aadhar')}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-400">Maximum size: 2 MB</p>
                    {aadharFile && (
                      <div className="mt-4 bg-white p-3 rounded-lg shadow flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{aadharFile.name}</span>
                        <button
                          onClick={() => removeFile('aadhar')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="rounded-lg bg-gray-300 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-400"
                    >
                      Back
                    </button>
                    <button
                     type="button"
                     onClick={nextStep}
                      className="rounded-lg bg-[#ab8965] py-2 px-4 text-sm font-medium text-white hover:bg-yellow-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4 or 5: Finish */}
            {((role === "User" && step === 4) ||
              (role === "Manager" && step === 5)) && (
                <motion.div
                  key="finish"
                  {...animations}
                  transition={{ duration: 0.4 }}
                  className="gap-4 flex flex-col justify-center items-center h-full"
                >
                  <h2 className="mb-4 text-2xl font-bold text-gray-800">
                    Registration Complete!
                  </h2>
                  <Image
                    src='/images/done.png'
                    height={100}
                    width={100}
                    alt=""
                  />
                  <p className="text-gray-600 text-center">
                    Thank you for registering. We will process your details and
                    notify you soon.
                  </p>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
