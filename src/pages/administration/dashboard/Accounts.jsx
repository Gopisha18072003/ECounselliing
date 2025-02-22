import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";
import { useRef } from "react";
import Modal from "../../../components/Modal";

export default function Accounts() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutModalRef = useRef();


  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Dispatch the logout action
    dispatch(authActions.logout());

    dispatch(uiActions.showSuccessNotification({status: "success", message:"Logout Successfully"}))
    navigate('/')

    // Optional: Navigate to login page or home page after logout
    console.log("User logged out");
  };


  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      {/* Logout Button */}
      <button
        onClick={() => logoutModalRef.current.open()}
        className="bg-red-500 text-white px-4 py-2 rounded-md w-full mb-4 hover:bg-red-600"
      >
        Logout
      </button>
      {/* Modal for logout */}
      <Modal title="Are you sure you want to logout?" ref={logoutModalRef}>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-red-600"
        >
          Yes
        </button>
      </Modal>
    </div>
  );
}
