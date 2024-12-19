import React from "react";
import digitalIndiaLogo from '../assets/images/digitalIndia.jpg';
import eCounsellingLogo from '../assets/images/e-counselling.png';
import nicLogo from '../assets/images/nicLogo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4">
      {/* Top Terms Links */}
      <div className="bg-blue-500 text-white text-sm py-2">
        <ul className="flex flex-wrap justify-center space-x-4">
          <li>
            <a href="#" className="hover:underline">
              Terms and Conditions
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Hyperlink Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Copyright Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Disclaimer
            </a>
          </li>
        </ul>
      </div>

      {/* Footer Content */}
      <div className="text-sm mt-4 px-4 text-gray-700">
        <p>
          Content Owned and Maintained by{" "}
          <span className="font-semibold">
            West Bengal Joint Entrance Examinations Board.
          </span>
        </p>
        <p>
          Designed, Developed and Hosted by{" "}
          <span className="text-red-600 font-semibold">
            National Informatics Centre,
          </span>{" "}
          <span className="text-red-600">
            Ministry of Electronics & Information Technology
          </span>
          , Government of India
        </p>
      </div>

      {/* Logos */}
      <div className="flex justify-center items-center mt-4 space-x-8">
        <img
          src={nicLogo}
          alt="NIC Logo"
          className="h-[6rem]"
        />
        <div className="border-l border-gray-300 h-8"></div>
        <img
          src={digitalIndiaLogo}
          alt="Digital India Logo"
          className="h-[6rem]"
        />
        <div className="border-l border-gray-300 h-8"></div>
        <img
          src={eCounsellingLogo}
          alt="Counselling Services"
          className="h-[4rem]"
        />
      </div>
    </footer>
  );
};

export default Footer;
