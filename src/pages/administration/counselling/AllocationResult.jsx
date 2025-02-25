import { CircularProgress } from "@mui/material";
import { publishAllocationResult, updateCounsellingStatus } from "../../../utils/http";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { queryClient } from "../../../utils/queryClient";
import { authActions } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function AllocationResult() {
  const [isPublishing, setIsPublishing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlePublishResult() {
    setIsPublishing(true);
    try {
      const resultResponse = await publishAllocationResult();
      if (resultResponse.length > 0) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "Success",
            message: "Result Published",
          })
        );

        await updateCounsellingStatus("ALLOCATION_RESULT_OUT");
      } else {
        throw new Error(resultResponse.message || "Failed to publish result");
      }
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "Error",
          message: error.message || "An error occurred",
        })
      );
      navigate("/login/admin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    } finally {
      setIsPublishing(false);
      queryClient.invalidateQueries("counsellingStatusAdmin");
    }
  }

  return (
    <div className="h-[600px] flex justify-center items-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Application Submission Closed
        </h1>
        <p className="text-gray-600 mb-6">
          You can now proceed to publish the allocation results.
        </p>
        <button
          disabled={isPublishing}
          onClick={handlePublishResult}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isPublishing ? <CircularProgress size={22} color="inherit" /> : "Publish Result"}
        </button>
      </div>
    </div>
  );
}
