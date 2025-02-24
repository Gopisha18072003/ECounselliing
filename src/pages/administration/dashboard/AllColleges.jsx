import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { fetchAllColleges, fetchCollegeDetails } from "../../../utils/http";
import CircularProgress from "@mui/material/CircularProgress";
import { uiActions } from "../../../store/uiSlice";
import { authActions } from "../../../store/authSlice";
import EntityDetailsModal from "../../../components/EntityDetailsModal";
import CollegeDetails from "../../../components/CollegeDetails";
import { useQuery } from "@tanstack/react-query";
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
  const [collegeDetailsLoading, setCollegeDetailsLoading] = useState(false); // ✅ New State

  useEffect(() => {
    if (isError && error && !isFetching) {
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
    setCollegeDetailsLoading(true); // ✅ Start Loading
    try {
      const response = await fetchCollegeDetails(id);
      if (response.statusCode === 200) {
        setSelectedCollege(response.data);
      } else {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: ["Failed to fetch college details"],
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message || "Failed to fetch college details"],
        })
      );
      navigate("/login/admin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    } finally {
      setCollegeDetailsLoading(false); // ✅ Stop Loading
    }
  }

  function handleClickCollege(college) {
    setSelectedCollege(null); // Reset old data
    setIsModalOpen(true);
    handleGetCollegeDetails(college.collegeName);
  }

  return (
    <>
      {!isLoading && allColleges?.length > 0 && (
        
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">All Colleges</h2>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">College ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  College Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allColleges.map((college) => (
                <tr key={college.collegeId}>
                  <td className="border border-gray-300 px-4 py-2">
                    {college.collegeId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="hover:text-blue-500"
                      onClick={() => handleClickCollege(college)}
                    >
                      {college.collegeName}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {!college.status ? (
                      <span className="text-red-500 font-semibold">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-green-500 font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 ">
                    {!college.status ? (
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mx-auto">
                        Unblock
                      </button>
                    ) : (
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mx-auto">
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-[20rem]">
          <CircularProgress />
        </div>
      )}
      {
        !isLoading && allColleges.statusCode === 204 && (
            <div className="h-[400px] flex justify-center items-center">
                <h1 className="text-3xl font-bold text-gray-400">No colleges registered yet</h1>
            </div>
        )
      }

      {/* ✅ Updated Modal - Shows Spinner if Loading */}
      {isModalOpen && (
        <EntityDetailsModal
          data={selectedCollege}
          isLoading={collegeDetailsLoading} // Pass Loading State
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCollege(null);
          }}
        >
            <CollegeDetails />
        </EntityDetailsModal>
      )}
    </>
  );
}
