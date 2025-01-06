import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-black text-white p-4 sticky top-0 w-full z-50 bg-opacity-50 backdrop-blur-lg opacity-80">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={25}
            // className="w-auto h-10"
          />
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex space-x-6">
          <Link href="#home" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="#hotels" className="hover:text-gray-400">
            Hotels
          </Link>
          <Link href="#rooms" className="hover:text-gray-400">
            Rooms
          </Link>
        </nav>

        {/* Contact Us Button */}
        <div className="hidden md:block">
          <Link href="#contact" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-blue-800 bg-opacity-50 text-white p-4">
          <Link href="#home" className="block py-2">
            Home
          </Link>
          <Link href="#hotels" className="block py-2">
            Hotels
          </Link>
          <Link href="#rooms" className="block py-2">
            Rooms
          </Link>
          <Link href="#contact" className="block py-2 bg-blue-500 text-white px-4 rounded">
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
