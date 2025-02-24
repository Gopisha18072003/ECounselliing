import {
  getCounsellingStatus,
  updateCounsellingStatus,
} from "../../../utils/http.js";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { counsellingStatusActions } from "../../../store/counsellingSlice.js";
import CircularProgress from "@mui/material/CircularProgress";
import AllApplications from "../counselling/AllApplications.jsx";
import AllocationResult from "../counselling/AllocationResult.jsx";
import { useState } from "react";
import { uiActions } from "../../../store/uiSlice.js";
import { queryClient } from "../../../utils/queryClient.js";
import { authActions } from "../../../store/authSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Result from "../counselling/Result.jsx";

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
    <div className="w-full flex flex-col justify-center items-center h-[20rem] bg-gray-200">
      {isStatusPending && <CircularProgress color="primary" />}
      {!isStatusPending && status === "NOT_STARTED" && (
        <div className="bg-white shadow-md p-4 rounded-md ">
          <h1 className="text-[1.5rem] font-roboto text-gray-700">
            Start Counselling Process
          </h1>
          <button
            className="w-[6rem] bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isWaiting}
            onClick={() =>
              handleChangeCounsellingStatus("APPLICATION_SUBMISSION_STARTED")
            }
          >
            {isWaiting ? <CircularProgress color="white" size={18} /> : "Start"}
          </button>
        </div>
      )}
      {!isStatusPending && status === "APPLICATION_SUBMISSION_STARTED" && (
        <>
          <AllApplications />
        </>
      )}
      {!isStatusPending && status === "APPLICATION_SUBMISSION_CLOSED" && (
        <>
          <AllocationResult />
        </>
      )}
      {
        !isStatusPending && status === "ALLOCATION_RESULT_OUT" && (
            <>
                <Result />
            </>
        )
      }
    </div>
  );
}
