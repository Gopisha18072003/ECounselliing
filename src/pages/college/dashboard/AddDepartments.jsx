import { useEffect, useState } from "react";
import AddDepartmentFormInput from "../../../components/AddDepartmentFormInput";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";

export default function AddDepartments() {
  const existingDepartments = useSelector((state) => state.auth.user.departments);
  const [departments, setDepartments] = useState(existingDepartments);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.update({ departments }));
    const updatedDate = { ...user, departments };
    localStorage.setItem("user", JSON.stringify(updatedDate));
  }, [departments]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col items-center  overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Existing Departments</h1>

      <div className="w-full max-w-2xl overflow-x-auto">
        <table className="w-full bg-gray-50 shadow-md rounded-lg overflow-hidden border border-gray-300">
          <thead className="bg-gray-200 text-gray-700 font-semibold border-b">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Seats</th>
              <th className="px-4 py-2 text-left">Cut-off Rank</th>
            </tr>
          </thead>
          <tbody>
            {existingDepartments.map((dept, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-2">{dept.departmentName}</td>
                <td className="px-4 py-2">{dept.noOfSeats}</td>
                <td className="px-4 py-2">{dept.cutoffRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-2xl mt-6">
        <AddDepartmentFormInput mailId={user.mailId} setDepartments={setDepartments} />
      </div>
    </div>
  );
}
