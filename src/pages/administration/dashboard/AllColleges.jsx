import useFetch from "../../../hooks/useFetch";
import { fetchAllColleges } from "../../../utils/http"; // Assuming this function updates status
import CircularProgress from "@mui/material/CircularProgress";

export default function AllColleges() {
  const {
    data: allColleges,
    loading: isLoading,
    error,
  } = useFetch(fetchAllColleges);

  return (
    <>
      {!isLoading && allColleges && (
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
                    {college.collegeName}
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
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mx-auto"
                        onClick={() => {}}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mx-auto"
                        onClick={() => {}}
                      >
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
        isLoading && !allColleges && error && (
            <div className="flex justify-center items-center  h-[20rem]">
          <CircularProgress />
        </div>
        )
      }
    </>
  );
}
