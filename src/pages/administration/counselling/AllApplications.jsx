import { useQuery } from "@tanstack/react-query";
import {
  fetchAllApplications,
  updateCounsellingStatus,
} from "../../../utils/http";
import CircularProgress from "@mui/material/CircularProgress";
import ApplicationDetails from "../../student/counselling/ApplicationDetails";
import { useState } from "react";
import EntityDetailsModal from "../../../components/EntityDetailsModal";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { queryClient } from "../../../utils/queryClient";
import { useEffect } from "react";
import { authActions } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
export default function AllApplications() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allApplications"],
    queryFn: fetchAllApplications,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  function handleClickApplication(id) {
    setSelectedApplication(null);
    const application = data?.find((app) => app.id === id);
    setSelectedApplication(application);
    setIsModalOpen(true);
  }
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleCloseApplicationSubmission() {
    // Close the application submission
    try {
      setIsClosing(true);
      const response = await updateCounsellingStatus(
        "APPLICATION_SUBMISSION_CLOSED"
      );
      if (response.statusCode === 200) {
        // Show success notification
        dispatch(
          uiActions.showSuccessNotification({
            status: "Success",
            message: response.message,
          })
        );
      }
    } catch (error) {
      // Show error notification
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
      setIsClosing(false);
      queryClient.invalidateQueries("counsellingStatusAdmin");
    }
  }
  useEffect(() => {
    if (isError && error && !isPending) {
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
  }, [isError, navigate, dispatch]);
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-1/2">
      <h1 className="text-[1.5rem] font-medium ">All Applications</h1>
      <div className="h-[0.5px] bg-gray-400 mb-4"></div>
      {isPending && <CircularProgress color="primary" />}
      {isError && <p>{error}</p>}
      {!isPending && data?.length > 0 && !data.statusCode && (
        <div className="w-full">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="border-b-2 ">
                <td className="font-semibold text-lg">Id</td>
                <td className="font-semibold text-lg">Name</td>
                <td className="font-semibold text-lg">E-Rank</td>
              </tr>
            </thead>
            <tbody>
              {data.map((application) => (
                <tr key={application.id} className="border-b-2 ">
                  {/* <ApplicationDetails data={application} /> */}

                  <td className="py-2">{application.id}</td>
                  <td>
                    <button
                      className="hover:text-blue-500"
                      onClick={() => handleClickApplication(application.id)}
                    >
                      {application.studentName}
                    </button>
                  </td>
                  <td>{application.erank}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-8 mb-4 bg-red-500 text-white rounded px-2 py-2 hover:bg-red-600 w-[240px] disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isClosing}
            onClick={handleCloseApplicationSubmission}
          >
            {isClosing ? (
              <CircularProgress size={18} color="white " />
            ) : (
              "Close Application Submission"
            )}
          </button>
        </div>
      )}
      {!isPending && data.statusCode === 204 && (
        <p className="text-center mb-4 text-gray-400 font-semibold">
          No Applications Found
        </p>
      )}
      {isModalOpen && (
        <EntityDetailsModal
          data={selectedApplication}
          isLoading={false} // Pass Loading State
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            
          }}
        >
          <ApplicationDetails data={selectedApplication} />
        </EntityDetailsModal>
      )}
    </div>
  );
}
