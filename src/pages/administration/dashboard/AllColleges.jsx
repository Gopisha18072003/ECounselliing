import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import { fetchAllColleges, fetchCollegeDetails, toogleCollegeStatus } from "../../../utils/http";
import { uiActions } from "../../../store/uiSlice";
import { authActions } from "../../../store/authSlice";
import EntityDetailsModal from "../../../components/EntityDetailsModal";
import CollegeDetails from "../../../components/CollegeDetails";

export default function AllColleges() {
  const {
    data: allColleges,
    isFetching: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allColleges"],
    queryFn: fetchAllColleges,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collegeDetailsLoading, setCollegeDetailsLoading] = useState(false);

  useEffect(() => {
    if (isError && error && !isLoading) {
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

  async function handleGetCollegeDetails(id) {
    setCollegeDetailsLoading(true);
    try {
      const response = await fetchCollegeDetails(id);
      if (response.statusCode === 200) {
        setSelectedCollege(response.data);
      } else {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: "Failed to fetch college details",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: error.message || "Failed to fetch college details",
        })
      );
      navigate("/login/admin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    } finally {
      setCollegeDetailsLoading(false);
    }
  }

  function handleClickCollege(college) {
    setSelectedCollege(null);
    setIsModalOpen(true);
    handleGetCollegeDetails(college.collegeName);
  }
  
  async function handleToggleCollegeStatus(collegeName){
    try {
      const response = await toggleCollegeStatus(collegeName);
      if (response.statusCode === 200) {
        dispatch(uiActions.showSuccessNotification({ status: "success", message: response.message }));
        document.reload();
      }
      if (response.statusCode === 500) {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: ["Data is too long"],
          })
        );
      }

      return { errors: null };
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message],
        })
      );
      navigate("/login/admin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    }
  }
  
  return (
    <div className="p-6 bg-gray-100 h-[600px] rounded-lg">
      {!isLoading && allColleges?.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md h-[550px]">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">All Colleges</h2>
          <div className="overflow-y-auto max-h-[450px]">
    <table className="w-full border-collapse bg-white rounded-lg">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="px-6 py-3 text-left">College ID</th>
          <th className="px-6 py-3 text-left">College Name</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {allColleges.map((college) => (
          <tr key={college.collegeId} className="border-b hover:bg-gray-100">
            <td className="px-6 py-4">{college.collegeId}</td>
            <td className="px-6 py-4">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleClickCollege(college)}
              >
                {college.collegeName}
              </button>
            </td>
            <td className="px-6 py-4">
              {!college.status ? (
                <span className="text-red-500 font-semibold">Blocked</span>
              ) : (
                <span className="text-green-500 font-semibold">Active</span>
              )}
            </td>
            <td className="px-6 py-4">
              {!college.status ? (
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleToggleCollegeStatus(college.collegeName)}>Unblock</button>
              ) : (
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleToggleCollegeStatus(college.collegeName)}>Block</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <CircularProgress />
        </div>
      )}
      {!isLoading && allColleges?.statusCode === 204 && (
        <div className="h-60 flex justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-400">No colleges registered yet</h1>
        </div>
      )}

      {isModalOpen && (
        <EntityDetailsModal
          data={selectedCollege}
          isLoading={collegeDetailsLoading}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCollege(null);
          }}
        >
          <CollegeDetails />
        </EntityDetailsModal>
      )}
    </div>
  );
}
