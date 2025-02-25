import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchAllStudents, fetchStudentDetails } from "../../../utils/http";
import { uiActions } from "../../../store/uiSlice";
import { authActions } from "../../../store/authSlice";
import EntityDetailsModal from "../../../components/EntityDetailsModal";
import StudentDetails from "../../../components/StudentDetails";

export default function AllStudents() {
  const {
    data: allStudents,
    isFetching: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allStudents"],
    queryFn: fetchAllStudents,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetailsLoading, setStudentDetailsLoading] = useState(false);

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

  async function handleGetStudentDetails(id) {
    setStudentDetailsLoading(true);
    try {
      const response = await fetchStudentDetails(id);
      if (response.statusCode === 200) {
        setSelectedStudent(response.data);
      } else {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: ["Failed to fetch student details"],
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message || "Failed to fetch student details"],
        })
      );
      navigate("/login/admin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    } finally {
      setStudentDetailsLoading(false);
    }
  }

  function handleClickStudent(student) {
    setSelectedStudent(null);
    setIsModalOpen(true);
    handleGetStudentDetails(student.studentName);
  }

  return (
    <div className="p-6 bg-gray-100 h-[600px] rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Students</h2>
      {!isLoading && allStudents?.length > 0 && (
        <div className="overflow-auto rounded-lg border border-gray-300">
          <table className="w-full text-left bg-white rounded-lg shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3">Student ID</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Rank</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student, index) => (
                <tr
                  key={student.studentId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-all duration-200`}
                >
                  <td className="px-6 py-3">{student.studentId}</td>
                  <td className="px-6 py-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleClickStudent(student)}
                    >
                      {student.studentName}
                    </button>
                  </td>
                  <td className="px-6 py-3">{student.mailId}</td>
                  <td className="px-6 py-3">{student.erank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center h-[400px]">
          <CircularProgress />
        </div>
      )}
      {!isLoading && allStudents?.statusCode === 204 && (
        <div className="h-[400px] flex justify-center items-center">
          <h1 className="text-2xl font-semibold text-gray-400">
            No Students Registered Yet
          </h1>
        </div>
      )}
      {isModalOpen && (
        <EntityDetailsModal
          data={selectedStudent}
          isLoading={studentDetailsLoading}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStudent(null);
          }}
        >
          <StudentDetails />
        </EntityDetailsModal>
      )}
    </div>
  );
}
