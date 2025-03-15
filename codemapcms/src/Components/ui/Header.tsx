"use client";
import React, { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative bg-blue-900  lg:border-gray-200 bg- dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-1">
          <Image src="/logo.png" alt="Flowbite Logo" width={80} height={80} />
          <span className="text-white font-extrabold text-3xl">ContenZ</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>

        {/* Navbar Links */}
        <div
          className={`absolute md:relative top-full left-0 right-0 w-full md:w-auto bg-blue-900 md:flex md:items-center md:space-x-8 transition-all duration-300 ease-in-out z-50 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
            <li>
              <a
                href="#"
                className="text-gray-900  dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
              >
                Home
              </a>
            </li>

            {/* Dropdown */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
              >
                <span>Dropdown</span>
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 w-44 bg-white border border-gray-200  rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 transition-all duration-200 z-50 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <ul className="py-2 text-gray-700 dark:text-gray-400">
                  <li onClick={toggleDropdown}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li onClick={toggleDropdown}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Settings
                    </a>
                  </li>
                  <li onClick={toggleDropdown}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>

                <div className="py-1" onClick={toggleDropdown}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </li>

            <li>
              <a
                href="#"
                className="hover:text-blue-700 text-gray-900 dark:text-white dark:hover:text-blue-500"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-700 text-gray-900 dark:text-white dark:hover:text-blue-500"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-700 text-gray-900 dark:text-white dark:hover:text-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
