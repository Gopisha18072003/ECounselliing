import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { uiActions } from "../../../store/uiSlice";
import { getAllocationResultStudent } from "../../../utils/http";

export default function Result() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const {
    data: allocationResult,
    isPending: isResultPending,
    isError: isResultError,
    error,
  } = useQuery({
    queryKey: ["allocationResultStudent"],
    queryFn: () => getAllocationResultStudent(user.studentName),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div className="bg-white p-4 rounded shadow-md w-[70%]">
      <h1 className="mb-4 text-center font-bold text-2xl">
        Allotement Result out
      </h1>
      {isResultPending && <CircularProgress size="1.3rem" color="primary" />}
      {!isResultPending && allocationResult.data && (
        <div>
          {allocationResult.data.collegeName && (
            <>
              <h2 className="text-center mb-8">
                {" "}
                <span className="text-green-600 text-lg font-medium">
                  Congratulations!!{" "}
                </span>{" "}
                {allocationResult.data.studentName}
              </h2>
              <div>
                <p className="w-full flex">
                  <span className="font-bold block w-[40%]">College Name:</span>{" "}
                  <span className="block w-[60%]">{allocationResult.data.collegeName}</span>
                </p>
                <p className="w-full flex">
                  {" "}
                  <span className="font-bold block w-[40%]">Department Name :</span>{" "}
                  <span className="block w-[60%]">{allocationResult.data.departmentName}</span>
                </p>
              </div>
            </>
          )}
          {!allocationResult.data.collegeName && (
            <>
              <h2 className="text-center mb-8">
                {" "}
                <span className="text-red-600 text-lg font-medium">
                  Sorry!!{" "}
                </span>{" "}
                {allocationResult.data.studentName}
              </h2>
              <div>
                <p className="w-full flex">
                  <span className="font-bold block w-[40%]">College Name:</span>{" "}
                  <span className="block w-[60%] text-red-500">Not Allocated</span>
                </p>
                <p className="w-full flex">
                  {" "}
                  <span className="font-bold block w-[40%]">Department Name :</span>{" "}
                  <span className="block w-[60%] text-red-500">Not Allocated</span>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
