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
      if (resultResponse.length>0) {
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
      setIsPublishing(false); // ✅ Ensure state is reset after the API call
      queryClient.invalidateQueries("counsellingStatusAdmin");
    }
  }

  return (
    <div>
      <h1 className="text-lg font-semibold">Application Submission Window is Closed</h1>
      <button
        disabled={isPublishing}
        onClick={handlePublishResult}
        className="w-[160px] bg-green-500 px-4 py-2 rounded text-white mt-4 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPublishing ? <CircularProgress size={18} color="inherit" /> : "Publish Result"}
      </button>
    </div>
  );
}
