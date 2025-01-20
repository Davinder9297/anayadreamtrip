"use client";
import {  useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Modal from "../Modal/Modal.jsx";
import Login from "../Login/Login.jsx";
import { FaRegUserCircle } from "react-icons/fa";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <div className={`text-white  w-full z-100 font-jost bg-secondary`}>
      <div style={{paddingRight:'56px',paddingTop:'10px',paddingBottom:'10px'}} className=" mx-auto  flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={80}
          />
        </div>

        {/* Desktop Navbar */}
        <div
        style={{gap:'20px'}}
          className={`flex flex-row  xsm:hidden xsm:gap-0`}
        >
          <div
            className="hover:text-gray-400 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </div>
          <Link href="/hotels" className="hover:text-gray-400">
            Hotels
          </Link>
          <Link href="#rooms" className="hover:text-gray-400">
            Resorts
          </Link>
        </div>

        {/* Contact Us Button */}
        <Link href='/login' className="xsm:hidden flex gap-2 items-center">
        <FaRegUserCircle className="text-xl"/>
          <div
            className=" text-white  rounded cursor-pointer"
          >
            Login/SignUp
          </div>
        </Link>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden lg:hidden xl:hidden 2xl:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden lg:hidden xl:hidden 2xl:hidden bg-black bg-opacity-50 text-white p-4">
          <Link href="/" className="block py-2">
            Home
          </Link>
          <Link href="/hotels" className="block py-2">
            Hotels
          </Link>
          <Link href="/resorts" className="block py-2">
            Resorts
          </Link>
          <Link
            href="/login"
            className="block py-2 bg-primary text-white px-4 rounded w-fit"
          >
            Login
          </Link>
        </div>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          width="60%"
          height="60%"
        >
          <Login />
        </Modal>
      )}
    </div>
  );
};

export default Header;
