import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllocationResultCollege } from "../../../utils/http";
import React from "react";
export default function Result() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const {
    data: allocationResult,
    isPending: isResultPending,
  } = useQuery({
    queryKey: ["allocationResult"],
    queryFn: () => getAllocationResultCollege(user.collegeName),
  });

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg  overflow-auto border-2 ">
      <h1 className="text-center font-bold text-2xl text-gray-800 mb-6">
        Allocation Result
      </h1>

      {isResultPending && (
        <div className="flex justify-center">
          <CircularProgress size="1.5rem" color="primary" />
        </div>
      )}

      {!isResultPending && allocationResult?.data?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-green-200 text-gray-700 font-semibold">
              <tr>
                <th className="p-3 border border-gray-300">ID</th>
                <th className="p-3 border border-gray-300">Name</th>
                <th className="p-3 border border-gray-300">Branch</th>
              </tr>
            </thead>
            <tbody>
              {allocationResult.data.map((result) => (
                <tr key={result.id} className="border border-gray-300 hover:bg-gray-100">
                  <td className="p-3 text-center">{result.id}</td>
                  <td className="p-3 text-center">{result.studentName}</td>
                  <td className="p-3 text-center">{result.departmentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isResultPending && !allocationResult?.data?.length && (
        <h2 className="text-center text-red-500 font-medium mt-6">
          No students are allotted to your college.
        </h2>
      )}
    </div>
  );
}
