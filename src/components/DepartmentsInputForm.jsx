import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState, useRef } from "react";
import Input from "./Input";

export default function DepartmentsInputForm({ departments, setDepartments }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const departmentName = useRef();
  const cutoffRank = useRef();
  const nirfRank = useRef();
  function handleAddDepartment() {
    const departmentData = {
      departmentName: departmentName.current.value,
      cutoffRank: cutoffRank.current.value,
      noOfSeats: nirfRank.current.value,
    };
    if (
      departmentData.departmentName &&
      departmentData.cutoffRank &&
      departmentData.noOfSeats
    ) {
      setDepartments(departmentData);
      setIsFormOpen(false);
      departmentName.current.value = "";
      cutoffRank.current.value;
      nirfRank.current.value;
    }
  }
  return (
    <div>
      <div className="my-2 p-2 border-2 border-blue-200 rounded-md">
        {departments.length > 0 && (
        <table className="w-full">
          <thead className="font-semibold text-gray-500 border-b-2 border-gray-300">
            <tr>
              <td>Name</td>
              <td>Seats</td>
              <td>Cut-off Rank</td>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={index}>
                <td>{department.departmentName}</td>
                <td>{department.noOfSeats}</td>
                <td>{department.cutoffRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        {departments.length === 0 && (
          <p className="text-center text-slate-300 text-bold">
            No Departments Added
          </p>
        )}
      </div>
      <div>
        <button
          className="w-2rem h-2rem text-white p-2 bg-blue-400 text-sm rounded-md"
          onClick={() => setIsFormOpen(true)}
          type="button"
        >
          ADD
          <AddCircleOutlineIcon fontSize="medium" className="text-white" />
        </button>
      </div>
      {isFormOpen && (
        <div className="flex flex-col gap-4 items-center justify-center w-full mt-4 border-2 border-blue-200 p-4 rounded-md">
          <Input
            name="departmentName"
            id="departmentName"
            label="Department Name"
            onChange={() => {}}
            onBlur={() => {}}
            ref={departmentName}
            required
          />
          <Input
            type="number"
            name="noOfSeats"
            id="noOfSeats"
            label="Number of Seats"
            onChange={() => {}}
            onBlur={() => {}}
            ref={nirfRank}
            required
          />
          <Input
            type="number"
            name="cutoffRank"
            id="cutoffRank"
            label="Cut-off Rank"
            onChange={() => {}}
            onBlur={() => {}}
            ref={cutoffRank}
            required
          />
          <div className="w-full flex justify-center gap-4">
            <button
              type="button"
              className="bg-green-400 p-2 rounded-md text-white w-full font-bold"
              onClick={handleAddDepartment}
            >
              Add
            </button>
            <button className="bg-red-400 p-2 rounded-md text-white w-full font-bold" type="button" onClick={() => setIsFormOpen(false)}>
                Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
