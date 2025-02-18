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
        dispatch(authActions.update({departments}));
        const updatedDate = {...user, departments}
        localStorage.setItem('user', JSON.stringify(updatedDate));
    }, [departments])



  

  return (
    <div className="w-full flex flex-col justify-center items-center py-8 gap-6">
      <h1 className="text-h3 font-bold py-2 text-gray-700">Existing Departments</h1>
      <table className=" border-2 rounded-md w-1/2 mb-4 ">
        <thead className="font-semibold text-gray-500 bg-gray-200 border-b-2 border-gray-300">
          <tr>
            <td className="px-4 py-2">Name</td>
            <td className="px-4 py-2">Seats</td>
            <td className="px-4 py-2">Cut-off Rank</td>
          </tr>
        </thead>
        <tbody >
          {existingDepartments.map((dept, index) => (
            <tr key={index}>
              <td className="px-4 py-1">{dept.departmentName}</td>
              <td className="px-4 py-1">{dept.noOfSeats}</td>
              <td className="px-4 py-1">{dept.cutoffRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <AddDepartmentFormInput
          mailId={user.mailId}
          setDepartments={setDepartments}
        />
        

    </div>
  );
}
