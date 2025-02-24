import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState, useRef } from "react";
import { addDepartment } from "../utils/http";
import { useActionState } from "react";
import Input from "./Input";
import { CircleTwoTone } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import {useNavigate} from "react-router-dom"

export default function AddDepartmentFormInput({ mailId, setDepartments }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function addDepartmentAction(prev, formData) {
    const departmentName = formData.get("departmentName");
    const noOfSeats = formData.get("noOfSeats");
    const cutoffRank = formData.get("cutoffRank");
    const newDepartment = { departmentName, noOfSeats, cutoffRank };
    
    try {
      const response = await addDepartment(mailId, newDepartment);
      if (response.statusCode == 201) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: "Department Added Successfully",
          })
        );
      }
      setDepartments((prev) => [...prev, newDepartment]);
      setIsFormOpen(false);
    } catch (err) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [err.message],
        })
      );
      navigate("/login/college");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      return null;
    }
  }

  const [formState, formAction, isPending] =
    useActionState(addDepartmentAction);
  return (
    <form className="w-1/2" action={formAction}>
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
            required
          />
          <Input
            type="number"
            name="noOfSeats"
            id="noOfSeats"
            label="Number of Seats"
            onChange={() => {}}
            onBlur={() => {}}
            required
          />
          <Input
            type="number"
            name="cutoffRank"
            id="cutoffRank"
            label="Cut-off Rank"
            onChange={() => {}}
            onBlur={() => {}}
            required
          />
          <div className="w-full flex justify-center gap-4">
            <button
              type="submit"
              className="bg-green-400 p-2 rounded-md text-white w-full font-bold"
            >
              {isPending ? (
                <CircularProgress size="1.3rem" color="white" />
              ) : (
                "Add"
              )}
            </button>
            <button
              className="bg-red-400 p-2 rounded-md text-white w-full font-bold"
              type="button"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
