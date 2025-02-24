import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { uiActions } from "../../../store/uiSlice";
import {
  getAllocationResultCollege,
  resetCounselling,
} from "../../../utils/http";
import { queryClient } from "../../../utils/queryClient";
import { useState } from "react";
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
    queryKey: ["allocationResult"],
    queryFn: () => getAllocationResultCollege(user.collegeName),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
console.log(allocationResult)
  return (
    <div className="bg-white p-4 rounded shadow-md w-[70%]">
      <h1 className="mb-4 text-center font-bold text-2xl">
        Allocation Result out
      </h1>
      {isResultPending && <CircularProgress size="1.3rem" color="primary" />}
      {!isResultPending &&
        allocationResult &&
        allocationResult?.data?.length > 0 && (
          <>
            <table className="w-full ">
              <thead className="bg-gray-200 font-semibold">
                <tr>
                  <td className="p-2">Id</td>
                  <td>Name</td>
                  <td>Branch</td>
                </tr>
              </thead>
              <tbody>
                {allocationResult.data.map((result) => (
                  <tr key={result.id} className="border-2">
                    <td className="p-2">{result.id}</td>
                    <td>{result.studentName}</td>

                    <td>{result.departmentName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </>
        )}
        {
            !isResultPending &&
            !allocationResult &&
             (
                <h2>No Students are alloted to your college</h2>
            )
        }
    </div>
  );
}
