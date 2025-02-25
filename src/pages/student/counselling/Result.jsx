import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllocationResultStudent } from "../../../utils/http";

export default function Result() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { data: allocationResult, isPending } = useQuery({
    queryKey: ["allocationResultStudent"],
    queryFn: () => getAllocationResultStudent(user.studentName),
  });

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg  flex flex-col justify-center overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Allotment Result</h1>
      {isPending ? (
        <div className="flex justify-center">
          <CircularProgress size="2rem" color="primary" />
        </div>
      ) : allocationResult?.data ? (
        <div className="text-center space-y-4">
          {allocationResult.data.collegeName ? (
            <>
              <h2 className="text-xl font-semibold text-green-600">Congratulations, {allocationResult.data.studentName}!</h2>
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <p className="text-lg font-medium text-gray-700">College Name: <span className="font-semibold">{allocationResult.data.collegeName}</span></p>
                <p className="text-lg font-medium text-gray-700">Department Name: <span className="font-semibold">{allocationResult.data.departmentName}</span></p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-red-600">Sorry, {allocationResult.data.studentName}!</h2>
              <div className="bg-red-100 p-4 rounded-lg shadow">
                <p className="text-lg font-medium text-gray-700">College Name: <span className="text-red-500 font-semibold">Not Allocated</span></p>
                <p className="text-lg font-medium text-gray-700">Department Name: <span className="text-red-500 font-semibold">Not Allocated</span></p>
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No result data available.</p>
      )}
    </div>
  );
}
