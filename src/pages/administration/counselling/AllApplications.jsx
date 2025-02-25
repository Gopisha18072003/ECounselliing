import { useQuery } from "@tanstack/react-query";
import {
  fetchAllApplications,
  updateCounsellingStatus,
} from "../../../utils/http";
import CircularProgress from "@mui/material/CircularProgress";
import ApplicationDetails from "../../student/counselling/ApplicationDetails";
import { useState, useEffect } from "react";
import EntityDetailsModal from "../../../components/EntityDetailsModal";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { queryClient } from "../../../utils/queryClient";
import { authActions } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function AllApplications() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allApplications"],
    queryFn: fetchAllApplications,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClickApplication(id) {
    setSelectedApplication(null);
    const application = data?.find((app) => app.id === id);
    setSelectedApplication(application);
    setIsModalOpen(true);
  }

  async function handleCloseApplicationSubmission() {
    try {
      setIsClosing(true);
      const response = await updateCounsellingStatus(
        "APPLICATION_SUBMISSION_CLOSED"
      );
      if (response.statusCode === 200) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "Success",
            message: response.message,
          })
        );
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
    <div className="h-[600px] flex justify-center items-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          All Applications
        </h1>
        <div className="h-[1px] bg-gray-300 mb-4"></div>

        {isPending && (
          <div className="flex justify-center py-6">
            <CircularProgress color="primary" />
          </div>
        )}

        {isError && <p className="text-red-500 text-center">{error}</p>}

        {!isPending && data?.length > 0 && !data.statusCode && (
          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">E-Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {data.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-100">
                    <td className="py-3 px-4">{application.id}</td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleClickApplication(application.id)}
                      >
                        {application.studentName}
                      </button>
                    </td>
                    <td className="py-3 px-4">{application.erank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-6 bg-red-600 text-white font-medium px-4 py-2 rounded-lg w-full hover:bg-red-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isClosing}
              onClick={handleCloseApplicationSubmission}
            >
              {isClosing ? <CircularProgress size={18} color="inherit" /> : "Close Application Submission"}
            </button>
          </div>
        )}

        {!isPending && data?.statusCode === 204 && (
          <p className="text-center text-gray-500 font-semibold">
            No Applications Found
          </p>
        )}

        {isModalOpen && (
          <EntityDetailsModal
            data={selectedApplication}
            isLoading={false}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <ApplicationDetails data={selectedApplication} />
          </EntityDetailsModal>
        )}
      </div>
    </div>
  );
}
