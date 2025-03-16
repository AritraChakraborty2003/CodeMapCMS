import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="relative bottom-0  footer flex flex-wrap max-w-screen bg-blue-900">
      <>
        <div className="QuickLinks w-screen lg:h-[45vh]  lg:w-[33.3%]  flex justify-center items-center">
          <div className="imageHolder ">
            <Image
              src="/logo.png"
              alt="Flowbite Logo"
              width={300}
              height={300}
            />
            <p className="ml-16 font-semibold text-white text-xl">
              ContenZ Platform
            </p>
          </div>
        </div>
        <div className="contact flex flex-wrap w-[100%] h-full  lg:h-[40vh]  lg:w-[33.3%] justify-center lg:mt-10 ">
          <div className="flex flex-col w-screen lg:w-[45%] h-full mt-6 ml-4 text-white">
            <ul>
              <p className="font-semibold">Quick Links</p>
              <li className="mt-4">Services</li>
              <li className="mt-2">About us</li>
              <li className="mt-2">Contact Us</li>
              <li className="mt-2">Our Blogs</li>
              <li className="mt-2">Codemap</li>
            </ul>
          </div>

          <div className="flex flex-col text-white  w-screen lg:w-[45%] h-full  lg:h-[40vh]  mt-6 ml-4  lg:text-[2.05vmin]">
            <ul className="lg:text-[2.05vmin]">
              <p className="font-semibold">Contact us</p>
              <li className="mt-4">Email: codemap2024@gmail.com</li>
              <li className=" mt-3">Phone: +91 7585824862</li>
              <li className="mt-3">Website: www.codemap.online</li>
              <li className="mt-3">Blogs: www.blogs.codemap.online</li>
            </ul>
          </div>
        </div>
        <div className="Location  w-[100vw] lg:w-[33.34%] mt-6 lg:mt-15 ">
          <p className="font-semibold text-white ml-5 lg:ml-10 text-md">
            Location
          </p>
          <div className="w-[90%] lg:w-[75%] h-48 ml-5 lg:ml-10 mt-4 ">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.545293974996!2d77.4922794!3d28.4761721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce96d0a5f3e81%3A0x89e56702c6e3bf7b!2sIIMT%20Group%20of%20Colleges%2C%20Knowledge%20Park%20III%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310!5e0!3m2!1sen!2sin!4v1710597890231!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </>
      <div className="w-screen flex justify-center items-center pb-2">
        <p className="text-center text-white mt-4 lg:mt-0">
          &copy; All Rights Reserved. Codemap 2025
        </p>
      </div>
    </div>
  );
};

export default Footer;
