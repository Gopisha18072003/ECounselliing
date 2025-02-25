import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../components/Input";
import TextArea from "../../../components/ChnageAddress";
import { useActionState } from "react";
import { updateStudent } from "../../../utils/http";
import { uiActions } from "../../../store/uiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/authSlice";

export default function BasicInformation() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [changeAddress, setChangeAddress] = useState({
    isChanges: false,
    streetName: "",
    city: "",
    state: "",
  });

  async function updateAction(prev, formData) {
    const studentName = formData.get("fullName").trim();
    const contactNumber = formData.get("contactNumber").trim();
    const address = `${changeAddress.streetName}, ${changeAddress.city}, ${changeAddress.state}`;
    const updateBasicData = { studentName, contactNumber, address };

    const updatedUserData = { ...user, ...updateBasicData };

    // Validation checks
    const nameRegex = /^[A-Za-z\s]+$/;
    const contactRegex = /^\d{10}$/;

    if (!studentName || !nameRegex.test(studentName)) {
      dispatch(uiActions.showErrorNotification({ status: "fail", message: ["Invalid student name."] }));
      setIsUpdated(false);
      return user;
    }

    if (!contactNumber || !contactRegex.test(contactNumber)) {
      dispatch(uiActions.showErrorNotification({ status: "fail", message: ["Contact number must be exactly 10 digits."] }));
      setIsUpdated(false);
      return user;
    }

    setChangeAddress((prev) => ({ ...prev, isChanges: false }));

    try {
      const response = await updateStudent(updatedUserData);
      if (response.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(authActions.update(response.data));
        dispatch(uiActions.showSuccessNotification({ status: "success", message: [response.message] }));
        setIsUpdated(false);
        return response.data;
      }
    } catch (error) {
      dispatch(uiActions.showErrorNotification({ status: "fail", message: [error.message] }));
      navigate("/login/student");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      return null;
    }
    setIsUpdated(false);
  }

  const [formState, formAction, isPending] = useActionState(updateAction);

  return (
    <div className="flex items-center justify-center h-[700px] bg-gray-100">
      <div className="w-[50%] bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={user.img}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-blue-300 object-cover mb-4"
          />
          <p className="text-gray-700 font-medium">{user.mailId}</p>
        </div>

        <form className="flex flex-col gap-4 mt-6" action={formAction}>
          <Input
            label="Full Name"
            name="fullName"
            defaultValue={formState?.studentName || user.studentName}
            onChange={() => setIsUpdated(true)}
          />
          <Input
            label="Contact Number"
            name="contactNumber"
            defaultValue={formState?.contactNumber || user.contactNumber}
            onChange={() => setIsUpdated(true)}
          />
          <TextArea
            label="Address"
            name="address"
            value={formState?.address || user.address}
            changeAddress={changeAddress}
            setChangeAddress={setChangeAddress}
            onChange={() => setIsUpdated(true)}
            disabled
          />

          <button
            type="submit"
            disabled={!isUpdated}
            className="bg-green-500 rounded-md px-4 py-2 w-full text-white font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? <CircularProgress color="inherit" size="1.5rem" /> : <span>Update</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
