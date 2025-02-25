import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { uiActions } from "../../../store/uiSlice";
import { getAllocationResultAdmin, resetCounselling } from "../../../utils/http";
import { queryClient } from "../../../utils/queryClient";
import { useState } from "react";
export default function Result() {
  const {
    data: allocationResult,
    isPending: isResultPending,
    isError: isResultError,
    error,
  } = useQuery({
    queryKey: ["allocationResult"],
    queryFn: getAllocationResultAdmin,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isRessetting, setIsRessetting] = useState(false);
  async function handleResetCounselling(){
    setIsRessetting(true);
    try{
        const response = await resetCounselling();
        if(response){
            dispatch(
                uiActions.showSuccessNotification({
                status: "Success",
                message: response.message,
                })
            );
        }
    }catch(error){
        dispatch(
            uiActions.showErrorNotification({
            status: "Error",
            message: error?.message || "An error occurred",
            })
        );
        navigate("/login/admin");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(authActions.logout());
    }finally{
        setIsRessetting(false);
        queryClient.invalidateQueries("counsellingStatusAdmin");
    }
  }

  return (
    <div className="h-[600px] flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Allocation Result
        </h1>

        {isResultPending ? (
          <div className="flex justify-center">
            <CircularProgress size="1.5rem" color="primary" />
          </div>
        ) : allocationResult?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-blue-100 text-blue-800 font-semibold">
                  <tr className="border-b">
                    <th className="p-3 text-left">Id</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">College</th>
                    <th className="p-3 text-left">Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {allocationResult.map((result, index) => (
                    <tr
                      key={result.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-3">{result.id}</td>
                      <td className="p-3">{result.studentName}</td>
                      <td
                        className={`p-3 ${
                          result.collegeName ? "text-gray-700" : "text-red-500"
                        }`}
                      >
                        {result.collegeName || "Not Allocated"}
                      </td>
                      <td
                        className={`p-3 ${
                          result.departmentName !== "Not Allocated"
                            ? "text-gray-700"
                            : "text-red-500"
                        }`}
                      >
                        {result.departmentName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="w-32 bg-blue-500 px-4 py-2 text-white rounded-lg font-medium transition duration-200 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isRessetting}
                onClick={handleResetCounselling}
              >
                {isRessetting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  "Reset"
                )}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 font-medium">
            No Allocation Results Found
          </p>
        )}
      </div>
    </div>
  );
}
