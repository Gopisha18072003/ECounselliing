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
    <div className="bg-white p-4 rounded shadow-md w-[70%]">
      <h1 className="mb-4 text-center font-bold text-2xl">Allocation Result</h1>
      {isResultPending && <CircularProgress size="1.3rem" color="primary" />}
      {!isResultPending && allocationResult && allocationResult.length > 0 && (
        <>
          <table className="w-full ">
            <thead className="bg-gray-200 font-semibold">
              <tr>
                <td className="p-2">Id</td>
                <td>Name</td>
                <td>College</td>
                <td>Branch</td>
              </tr>
            </thead>
            <tbody>
              {allocationResult.map((result) => (
                <tr key={result.id} className="border-2">
                  <td className="p-2">{result.id}</td>
                  <td>{result.studentName}</td>
                  <td className={`${result.collegeName ? "" : "text-red"}  `}>
                    {result.collegeName || "Not Allocated"}
                  </td>
                  <td
                    className={`${
                      result.departmentName !== "Not Allocated"
                        ? ""
                        : "text-red"
                    }  `}
                  >
                    {result.departmentName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="w-[120px] bg-blue-500 px-4 py-2 rounded text-white mt-4 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isRessetting}
            onClick={handleResetCounselling}
          >
            {isRessetting ? <CircularProgress size={18} color="white" />: "Reset"}
          </button>
        </>
      )}
    </div>
  );
}
