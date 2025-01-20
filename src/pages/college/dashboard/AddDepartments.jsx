import { useState } from "react";
import DepartmentFormInput from "../../../components/DepartmentFormInput";
import { useSelector } from "react-redux";
export default function AddDepartments() {
  const [departments, setDepartments] = useState([]);
  const addedDepartments = useSelector((state)=> state.auth.user.departments);
  function handleAddDepartment({ departmentName, noOfSeats, cutoffRank }) {
    setDepartments([
      ...departments,
      {
        departmentName,
        noOfSeats,
        cutoffRank,
      },
    ]);
  }
  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <h1 className="text-h3 font-bold py-2">Existing Departments</h1>
      <table className=" border-2 rounded-md w-1/2 mb-4">
          <thead className="font-semibold text-gray-500 border-b-2 border-gray-300">
            <tr>
              <td>Name</td>
              <td>Seats</td>
              <td>Cut-off Rank</td>
            </tr>
          </thead>
          <tbody>
            {addedDepartments.map((dept, index) => (
              <tr key={index}>
                <td>{dept.departmentName}</td>
                <td>{dept.noOfSeats}</td>
                <td>{dept.cutoffRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <form action="" className="w-1/2">
        <DepartmentFormInput
          departments={departments}
          setDepartments={handleAddDepartment}
        />
        <div className="w-1/2 mx-auto">
            <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md w-full ">
                Submit
            </button>
        </div>
      </form>
    </div>
  );
}
