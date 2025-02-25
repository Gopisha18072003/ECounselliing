import {getCounsellingStatus, getApplicationData} from "../../../utils/http.js"
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {counsellingStatusActions} from "../../../store/counsellingSlice.js";
import CircularProgress from "@mui/material/CircularProgress";
import ApplicationForm from "../counselling/ApplicationForm.jsx";
import ApplicationDetails from "../counselling/ApplicationDetails.jsx";
import { useEffect } from "react";
import { authActions } from "../../../store/authSlice.js";
import { uiActions } from "../../../store/uiSlice.js";
import { useNavigate } from "react-router-dom";
import Result from "../counselling/Result.jsx";
import React from "react";
export default function Counselling() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    
    const { data: counsellingStatus, isPending: isStatusPending, isError: isErrorStatus, error: statusError } = useQuery({
      queryKey: ['counsellingStatus'],
      queryFn: getCounsellingStatus,
    });
  
    const { data: applicationData, isPending: isApplicationPending } = useQuery({
      queryKey: ['applicationData'],
      queryFn: () => getApplicationData(user.studentName),
    });
  
    useEffect(() => {
      if (isErrorStatus && statusError) {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: "Invalid or expired Token. Please login again!",
          })
        );
        navigate("/login/student");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(authActions.logout());
      }
    }, [isErrorStatus, navigate, dispatch]);
  
    const status = counsellingStatus?.data?.status;
  
    return (
      <div className="w-full h-[700px] flex flex-col justify-center items-center bg-gray-100 shadow-md p-6 rounded-lg overflow-auto">
        {/* Loading Spinner */}
        {(isStatusPending || isApplicationPending) && (
          <div className="flex justify-center items-center">
            <CircularProgress color="primary" />
          </div>
        )}
  
        {/* Counselling Not Started */}
        {!isStatusPending && !isApplicationPending && status === "NOT_STARTED" && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-semibold text-gray-400 text-center">
              Counselling process has not started yet
            </h1>
          </div>
        )}
  
        {/* Application Submission Started */}
        {!isStatusPending && !isApplicationPending && status === "APPLICATION_SUBMISSION_STARTED" && (
          <div className="w-full">
            <h1 className="text-center text-lg font-semibold text-blue-600 mb-4">
              Counselling Process Started: <span className="text-black">{applicationData ? "Application Submitted" : "Fill the Application Form"}</span>
            </h1>
            {applicationData ? <ApplicationDetails data={applicationData.data} /> : <ApplicationForm />}
          </div>
        )}
  
        {/* Application Submission Closed */}
        {!isStatusPending && status === "APPLICATION_SUBMISSION_CLOSED" && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold text-gray-400 text-center">
              <span className="text-blue-500">Application submitted: </span> Result not released  yet.
            </h1>
          </div>
        )}
  
        {/* Allocation Result Out */}
        {!isStatusPending && status === "ALLOCATION_RESULT_OUT" && (
          <div className="w-full flex justify-center">
            <Result />
          </div>
        )}
      </div>
    );
  }
  