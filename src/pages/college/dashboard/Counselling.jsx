import { getCounsellingStatus } from "../../../utils/http.js";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { authActions } from "../../../store/authSlice.js";
import { uiActions } from "../../../store/uiSlice.js";
import { useNavigate } from "react-router-dom";
import Result from "../counselling/Result.jsx";
import React from "react";
export default function Counselling() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: counsellingStatus,
    isPending: isStatusPending,
    isError: isErrorStatus,
    error: statusError,
  } = useQuery({
    queryKey: ["counsellingStatus"],
    queryFn: getCounsellingStatus,
  });

  useEffect(() => {
    if (isErrorStatus && statusError) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: "Invalid or expired Token. Please login again!!",
        })
      );
      navigate("/login/college");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    }
  }, [isErrorStatus, navigate, dispatch]);

  const status = counsellingStatus?.data?.status;

  return (
    <div className="w-full h-[600px] flex flex-col justify-center items-center  rounded-lg p-6  ">
      {isStatusPending && <CircularProgress color="primary" />}
      
      {!isStatusPending && status === "NOT_STARTED" && (
        <div className="h-[400px] flex justify-center items-center">
          <h1 className="text-4xl font-semibold text-gray-400">Counselling process not started yet</h1>
        </div>
      )}

      {!isStatusPending && status === "APPLICATION_SUBMISSION_STARTED" && (
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700">
            <span className="text-blue-500">Counselling Process Started:</span> Students are filling the application form
          </h1>
        </div>
      )}

      {!isStatusPending && status === "APPLICATION_SUBMISSION_CLOSED" && (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-400">
            <span className="text-2xl font-semibold text-blue-500">Application Submission Closed:</span> Result not out yet
          </h1>
        </div>
      )}

      {!isStatusPending && status === "ALLOCATION_RESULT_OUT" && (
        <div className="w-full max-w-xl flex justify-center items-center">
          <Result />
        </div>
      )}
    </div>
  );
}
