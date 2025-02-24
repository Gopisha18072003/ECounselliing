import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice"; // Adjust the path as necessary
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";
import { useRef } from "react";
import Modal from "../../../components/Modal";

import {
  requestOtpCollege,
  validateOtpCollege,
  resetPasswordCollege,
  deleteStudent,
} from "../../../utils/http";
import { useSelector } from "react-redux";
import { useActionState } from "react";
import { CircularProgress } from "@mui/material";
import { useInput } from "../../../hooks/useInput";
import Input from "../../../components/Input";
import validators from "../../../utils/validators";

export default function Accounts() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutModalRef = useRef();
  const deleteModalRef = useRef();
  const sendOtpModalRef = useRef();
  const validateOtpModalRef = useRef();
  const user = useSelector((state) => state.auth.user);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const {
    value: enteredPassword,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordError,
  } = useInput("", validators.passwordValidator);
  const {
    value: enteredCurrentPassword,
    handleInputChange: handleCurrentPasswordChange,
    handleInputBlur: handleCurrentPasswordBlur,
    hasError: currentPasswordError,
  } = useInput("", validators.passwordValidator);
  const {
    value: enteredConfirmPassword,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
    hasError: confirmPasswordError,
  } = useInput("", (confirmPassword) =>
    validators.confirmPasswordValidator(enteredPassword, confirmPassword)
  );

  const resetPasswordAction = async (prev, formData) => {
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Validation checks
    if (currentPassword !== "India@2021") {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: ["Invalid current password."],
        })
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: ["Passwords do not match."],
        })
      );
      return;
    }
    if (newPassword === currentPassword) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: ["New password cannot be same as current password."],
        })
      );
      return;
    }

    // Add reset password logic here
    const response = await resetPasswordCollege(user.mailId, newPassword);
    if (response.statusCode === 200) {
      dispatch(
        uiActions.showSuccessNotification({
          status: "success",
          message: response.message,
        })
      );
      setIsDropdownOpen(false);
    }
  };

  function handleLogout() {
    // Dispatch the logout action

    dispatch(authActions.logout());

    dispatch(
      uiActions.showSuccessNotification({
        status: "success",
        message: "Logout Successfully",
      })
    );

    // Remove user from localStorage
    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/");
  }

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      const mailId = user.mailId;

      const response = await deleteStudent(mailId);
      setDeletingAccount(false);
      if (response.statusCode == 204) {
        dispatch(authActions.logout());
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: response.message,
          })
        );
        /// Remove user from localStorage
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (err) {
      setDeletingAccount(false);

      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: ["Failed to delete (Contact Administration)"],
        })
      );
      deleteModalRef.current.close();
    }
  };

  const [sendingOtp, setSendingOtp] = useState(false);
  async function handleSendOtp() {
    try {
      setSendingOtp(true);
      const response = await requestOtpCollege(user.mailId);
      setSendingOtp(false);
      if (response.statusCode === 200) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: response.message,
          })
        );
        sendOtpModalRef.current.close();
        validateOtpModalRef.current.open();
      }
    } catch (err) {
      setSendingOtp(false);
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: err.message || "Failed to send OTP",
        })
      );
    }
  }

  async function validateOtpAction(prev, formData) {
    const otp = formData.get("otp");
    try {
      const response = await validateOtpCollege(user.mailId, otp);
      if (response.statusCode === 200) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: response.message,
          })
        );
        validateOtpModalRef.current.close();
        setIsDropdownOpen(true);
      }
    } catch (err) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: err.message || "Invalid OTP",
        })
      );
    }
  }

  const [formState, formAction, isPending] = useActionState(validateOtpAction);
  const [
    resetPasswordFormState,
    resetPasswordFormAction,
    resetPasswordIsPending,
  ] = useActionState(resetPasswordAction);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      {/* Reset Password Dropdown */}
      <div className="mb-4 ">
        <button
          onClick={() => sendOtpModalRef.current.open()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full text-left hover:bg-blue-600 flex justify-between items-center"
        >
          <span>Reset Password</span>
          {isDropdownOpen && <ArrowDropUpIcon />}
          {!isDropdownOpen && <ArrowDropDownIcon />}
        </button>
        {isDropdownOpen && (
          <form
            action={resetPasswordFormAction}
            className="mt-4 space-y-4 bg-white p-4 rounded-md shadow-md"
          >
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              label="Current Password"
              value={enteredCurrentPassword}
              onChange={handleCurrentPasswordChange}
              onBlur={handleCurrentPasswordBlur}
              errorMessage={currentPasswordError}
              required
            />
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              value={enteredPassword}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              errorMessage={passwordError}
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              value={enteredConfirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              errorMessage={confirmPasswordError}
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={
                passwordError || confirmPasswordError || currentPasswordError
              }
            >
              {resetPasswordIsPending ? (
                <CircularProgress color="white" size={24} />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => logoutModalRef.current.open()}
        className="bg-red-500 text-white px-4 py-2 rounded-md w-full mb-4 hover:bg-red-600"
      >
        Logout
      </button>

      {/* Delete Account Button */}
      <button
        onClick={() => deleteModalRef.current.open()}
        className="bg-gray-700 text-white px-4 py-2 rounded-md w-full hover:bg-gray-800"
      >
        Delete Account
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
      {/* Model for delete account */}
      <Modal
        title="Are you sure you want to delete your account?"
        ref={deleteModalRef}
      >
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-red-600"
        >
          {deletingAccount && <CircularProgress color="white" size="1.4rem" />}
          {!deletingAccount && "Yes"}
        </button>
      </Modal>
      {/* Add modals for reset password, logout, and delete account */}
      <Modal title="Reset Password" ref={sendOtpModalRef}>
        <p>Send otp in your registered email id.</p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-green-600"
          onClick={handleSendOtp}
        >
          {sendingOtp ? <CircularProgress color="white" size={24} /> : "Send"}
        </button>
      </Modal>
      <Modal title="Reset Password" ref={validateOtpModalRef}>
        <p>Enter OTP sent to your registered email.</p>
        <form action={formAction}>
          <input
            type="number"
            placeholder="Enter OTP"
            className="border-2 p-2 rounded-md w-full mt-4 focus:outline-0 focus:border-gray-500"
            name="otp"
            required
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-green-600">
            {isPending ? (
              <CircularProgress color="white" size={24} />
            ) : (
              "Validate"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}
