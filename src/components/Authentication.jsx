import { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import React from "react";
export default function Authentication() {
  const [toggleLoginSelection, setToggleLoginSelection] = useState(false);
  const [toggleRegistrationSelection, setToggleRegistrationSelection] =
    useState(false);

  function handleLoginSelection() {
    setToggleLoginSelection((prev) => !prev);
    setToggleRegistrationSelection(false);
  }

  function handleRegistrationSelection() {
    setToggleRegistrationSelection((prev) => !prev);
    setToggleLoginSelection(false);
  }

  return (
    <div className="w-full flex justify-end items-start gap-4 px-4 py-2 h-[80px]">
      {/* Login Dropdown */}
      <div className="relative">
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 border-2 border-blue-600 rounded-md flex items-center gap-2 hover:bg-blue-600 shadow-lg transition"
          onClick={handleLoginSelection}
        >
          <span>Sign-in</span>
          {toggleLoginSelection ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </button>

        {toggleLoginSelection && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-300 rounded-md shadow-lg">
            <Link
              to="/login/student"
              className="block px-4 py-2 hover:bg-blue-200"
            >
              For Students
            </Link>
            <Link
              to="/login/college"
              className="block px-4 py-2 hover:bg-blue-200"
            >
              For Colleges
            </Link>
            <Link
              to="/login/admin"
              className="block px-4 py-2 hover:bg-blue-200"
            >
              For Administrator
            </Link>
          </div>
        )}
      </div>

      {/* Registration Dropdown */}
      <div className="relative">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-600 transition"
          onClick={handleRegistrationSelection}
        >
          <span>Register</span>
          {toggleRegistrationSelection ? (
            <ArrowDropUpIcon />
          ) : (
            <ArrowDropDownIcon />
          )}
        </button>

        {toggleRegistrationSelection && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-yellow-300 rounded-md shadow-lg">
            <Link
              to="/register/student"
              className="block px-4 py-2 hover:bg-yellow-200"
            >
              For Students
            </Link>
            <Link
              to="/register/college"
              className="block px-4 py-2 hover:bg-yellow-200"
            >
              For Colleges
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
