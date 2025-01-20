import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice"; // Adjust the path as necessary
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";

export default function Accounts() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Add reset password logic here
    console.log("Password reset form submitted");
  };

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");

    // Dispatch the logout action
    dispatch(authActions.logout());
    dispatch(uiActions.showSuccessNotification({status: "success", message:"Logout Successfully"}))
    navigate('/')

    // Optional: Navigate to login page or home page after logout
    console.log("User logged out");
  };

  const handleDeleteAccount = () => {
    // Add delete account logic here
    console.log("Account deleted");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      {/* Reset Password Dropdown */}
      <div className="mb-4 ">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full text-left hover:bg-blue-600 flex justify-between items-center"
        >
          <span>Reset Password</span>
          {isDropdownOpen && <ArrowDropUpIcon/> }
          {!isDropdownOpen && <ArrowDropDownIcon/> }
        </button>
        {isDropdownOpen && (
          <form
            onSubmit={handleResetPassword}
            className="mt-4 space-y-4 bg-white p-4 rounded-md shadow-md"
          >
            <div>
              <label htmlFor="currentPassword" className="block text-gray-700 font-medium">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                required
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-gray-700 font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
            >
              Reset
            </button>
          </form>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md w-full mb-4 hover:bg-red-600"
      >
        Logout
      </button>

      {/* Delete Account Button */}
      <button
        onClick={handleDeleteAccount}
        className="bg-gray-700 text-white px-4 py-2 rounded-md w-full hover:bg-gray-800"
      >
        Delete Account
      </button>
    </div>
  );
}
