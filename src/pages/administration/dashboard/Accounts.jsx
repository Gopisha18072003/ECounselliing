import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";
import Modal from "../../../components/Modal";

export default function Accounts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutModalRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch(authActions.logout());
    dispatch(uiActions.showSuccessNotification({ status: "success", message: "Logout Successfully" }));
    navigate("/");
  };

  return (
    <div className="h-[600px] flex justify-center items-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>

        {/* Logout Button */}
        <button
          onClick={() => logoutModalRef.current.open()}
          className="w-full bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>

        {/* Modal for logout confirmation */}
        <Modal title="Are you sure you want to logout?" ref={logoutModalRef}>
          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Yes, Logout
            </button>
            <button
              onClick={() => logoutModalRef.current.close()}
              className="bg-gray-300 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
