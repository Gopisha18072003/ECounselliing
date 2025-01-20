import useFetch from "../../../hooks/useFetch";
import { fetchAllStudents } from "../../../utils/http"; // Assuming this function updates status
import CircularProgress from "@mui/material/CircularProgress";

export default function AllStudents() {
  const {
    data: allStudents,
    loading: isLoading,
    error,
  } = useFetch(fetchAllStudents);

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
                    {student.studentName}
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
      {
        isLoading && !allStudents && error && (
            <div className="flex justify-center items-center  h-[20rem]">
          <CircularProgress />
        </div>
        )
      }
    </>
  );
}
