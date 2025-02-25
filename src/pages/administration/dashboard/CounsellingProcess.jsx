import {
    getCounsellingStatus,
    updateCounsellingStatus,
  } from "../../../utils/http.js";
  import { useDispatch } from "react-redux";
  import { useQuery } from "@tanstack/react-query";
  import CircularProgress from "@mui/material/CircularProgress";
  import AllApplications from "../counselling/AllApplications.jsx";
  import AllocationResult from "../counselling/AllocationResult.jsx";
  import { useState, useEffect } from "react";
  import { uiActions } from "../../../store/uiSlice.js";
  import { queryClient } from "../../../utils/queryClient.js";
  import { authActions } from "../../../store/authSlice.js";
  import { useNavigate } from "react-router-dom";
  import Result from "../counselling/Result.jsx";
  import React from "react";
  export default function Counselling() {
    const {
      data: counsellingStatus,
      isFetching: isStatusPending,
      isError: isStatusError,
      error,
    } = useQuery({
      queryKey: ["counsellingStatusAdmin"],
      queryFn: getCounsellingStatus,
    });
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      if (isStatusError && error && !isStatusPending) {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: "Invalid or expired Token. Please login again!!",
          })
        );
        navigate("/login/admin");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(authActions.logout());
      }
    }, [isStatusError, navigate, dispatch]);
  
    const [isWaiting, setIsWaiting] = useState(false);
  
    async function handleChangeCounsellingStatus(status) {
      try {
        setIsWaiting(true);
        const response = await updateCounsellingStatus(status);
        if (response.statusCode === 200) {
          dispatch(
            uiActions.showSuccessNotification({
              status: "Success",
              message: response.message,
            })
          );
          queryClient.invalidateQueries("counsellingStatusAdmin");
        }
      } catch (error) {
        dispatch(
          uiActions.showErrorNotification({
            status: "Error",
            message: error.message,
          })
        );
        navigate("/login/admin");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(authActions.logout());
      } finally {
        setIsWaiting(false);
      }
    }
  
    const status = counsellingStatus?.data?.status;
  
    return (
      <div className="w-full h-[600px] flex justify-center items-center bg-gray-100 px-6">
        {isStatusPending && <CircularProgress color="primary" />}
        
        {!isStatusPending && status === "NOT_STARTED" && (
          <div className="bg-white shadow-lg p-6 rounded-lg text-center w-full max-w-md">
            <h1 className="text-2xl font-semibold text-gray-800">
              Start Counselling Process
            </h1>
            <button
              className="w-full bg-green-600 text-white font-medium py-2 rounded-lg mt-4 hover:bg-green-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isWaiting}
              onClick={() =>
                handleChangeCounsellingStatus("APPLICATION_SUBMISSION_STARTED")
              }
            >
              {isWaiting ? <CircularProgress color="inherit" size={20} /> : "Start"}
            </button>
          </div>
        )}
  
        {!isStatusPending && status === "APPLICATION_SUBMISSION_STARTED" && (
          <div className="w-full max-w-4xl">
            <AllApplications />
          </div>
        )}
  
        {!isStatusPending && status === "APPLICATION_SUBMISSION_CLOSED" && (
          <div className="w-full max-w-4xl">
            <AllocationResult />
          </div>
        )}
  
        {!isStatusPending && status === "ALLOCATION_RESULT_OUT" && (
          <div className="w-full max-w-4xl">
            <Result />
          </div>
        )}
      </div>
    );
  }
  