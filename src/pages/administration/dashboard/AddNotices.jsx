import React, { useState } from "react";
import { useActionState } from "react";
import { addNotice } from "../../../utils/http";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/authSlice";
import { uiActions } from "../../../store/uiSlice";
import { CircularProgress } from "@mui/material";

export default function AddNotices() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState({ title: "", description: "" });

  async function addNoticeAction(prev, formData) {
    const enteredData = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    if (!enteredData.title.trim()) {
      setIsError((prev) => ({ ...prev, title: "Title is required" }));
      return;
    }
    if (!enteredData.description.trim()) {
      setIsError((prev) => ({
        ...prev,
        description: "Description is required",
      }));
      return;
    }

    try {
      const response = await addNotice(enteredData);
      if (response.statusCode === 201) {
        dispatch(uiActions.showSuccessNotification({ status: "success", message: response.message }));
      }
      if (response.statusCode === 500) {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: ["Data is too long"],
          })
        );
      }
      return { errors: null };
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message],
        })
      );
      navigate("/login/admin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    }
  }

  const [formState, formAction, isPending] = useActionState(addNoticeAction, {
    errors: null,
  });

  return (
    <div className="h-[600px] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Add Notice
        </h1>
        <form className="space-y-6" action={formAction}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Enter notice title"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {isError.title && <p className="text-sm text-red-500 mt-1">{isError.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              required
              name="description"
              placeholder="Enter detailed description"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            ></textarea>
            {isError.description && <p className="text-sm text-red-500 mt-1">{isError.description}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="reset"
              className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none w-[100px] flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              disabled={isPending}
            >
              {isPending ? <CircularProgress size={18} color="inherit" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
