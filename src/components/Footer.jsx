import React from "react";
import digitalIndiaLogo from '../assets/images/digitalIndia.jpg';
import eCounsellingLogo from '../assets/images/e-counselling.png';
import nicLogo from '../assets/images/nicLogo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center pb-6">
      {/* Top Terms Links */}
      <div className="bg-blue-500 text-white text-sm py-3">
        <ul className="flex flex-wrap justify-center gap-4">
          {["Terms and Conditions", "Hyperlink Policy", "Privacy Policy", "Copyright Policy", "Disclaimer"].map((item) => (
            <li key={item}>
              <a href="#" className="hover:underline">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Content */}
      <div className="text-sm mt-4 px-6 text-gray-700">
        <p>
          Content Owned and Maintained by{" "}
          <span className="font-semibold">Engineering Entrance Examinations Board.</span>
        </p>
        <p>
          Designed, Developed, and Hosted by{" "}
          <span className="text-red-600 font-semibold">National Informatics Centre,</span>{" "}
          <span className="text-red-600">Ministry of Electronics & Information Technology</span>, Government of India.
        </p>
      </div>

      {/* Logos Section */}
      <div className="flex flex-wrap justify-center items-center mt-6 gap-6">
        <img src={nicLogo} alt="NIC Logo" className="h-24 object-contain" />
        <div className="border-l border-gray-400 h-10 hidden md:block"></div>
        <img src={digitalIndiaLogo} alt="Digital India Logo" className="h-24 object-contain" />
        <div className="border-l border-gray-400 h-10 hidden md:block"></div>
        <img src={eCounsellingLogo} alt="Counselling Services" className="h-20 object-contain" />
      </div>
    </footer>
  );
};

export default Footer;
