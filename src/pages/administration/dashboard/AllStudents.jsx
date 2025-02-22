import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { fetchAllStudents, fetchStudentDetails } from "../../../utils/http"; // Assuming this function updates status
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";
import { authActions } from "../../../store/authSlice";
import EntityDetailsModal from "../../../components/EntityDetailsModal";
import StudentDetails from "../../../components/StudentDetails";

export default function AllStudents() {
  const {
    data: allStudents,
    loading: isLoading,
    error,
  } = useFetch(fetchAllStudents);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetailsLoading, setStudentDetailsLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "ADMIN" && error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error],
        })
      );
      navigate("/login/admin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    }
  }, [error, dispatch, navigate]);

  async function handleGetStudentDetails(id) {
      setStudentDetailsLoading(true); // ✅ Start Loading
      try {
        const response = await fetchStudentDetails(id);
        if (response.statusCode === 200) {
          setSelectedStudent(response.data);
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
        setStudentDetailsLoading(false); // ✅ Stop Loading
      }
    }

    function handleClickStudent(student) {
        setSelectedStudent(null); // Reset old data
        setIsModalOpen(true);
        handleGetStudentDetails(student.studentName);
      }
    

  return (
    <>
      {!isLoading && allStudents && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">All Students</h2>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Student Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Rank</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student) => (
                <tr key={student.studentId}>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.studentId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  <button
                      className="hover:text-blue-500"
                      onClick={() => handleClickStudent(student)}
                    >
                      {student.studentName}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.mailId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.erank}
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
      {isModalOpen && (
        <EntityDetailsModal
          data={selectedStudent}
          isLoading={studentDetailsLoading} // Pass Loading State
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStudent(null);
          }}
        >
            <StudentDetails />
        </EntityDetailsModal>
      )}
    </>
  );
}
