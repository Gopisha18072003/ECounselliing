import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../components/Input";
import TextArea from "../../../components/ChnageAddress";
import { useActionState } from "react";
import { updateStudent } from "../../../utils/http";
import { uiActions } from "../../../store/uiSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function BasicInformation() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(false);
  const [changeAddress, setChangeAddress] = useState({
    isChanges: false,
    houseNumber: "",
    streetName: "",
    city: "",
    state: "",
  });

  async function updateAction(prev, formData) {
    const studentName = formData.get("fullName").trim();
    const contactNumber = formData.get("contactNumber").trim();
    const address = `${changeAddress.houseNumber} ${changeAddress.streetName}, ${changeAddress.city}, ${changeAddress.state}`;
    const updateBasicData = { studentName, mailId, contactNumber, address };

    const updatedUserData = {
      ...user,
      ...updateBasicData,
    };
    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
    const contactRegex = /^\d{10}$/; // Exactly 10 digits

    // Validation checks
    if (!studentName || !nameRegex.test(studentName)) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [
            "Invalid student name."
          ],
        })
      );
      setIsUpdated(false)
      return user;
    }

    if (!contactNumber || !contactRegex.test(contactNumber)) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: ["Contact number must be exactly 10 digits."],
        })
      );
      setIsUpdated(false)
      return user;
    }
    setChangeAddress((prev) => ({ ...prev, isChanges: false }));
    try {
      const response = await updateStudent(user.mailId, updatedUserData);

      if (response.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: [response.message],
          })
        );
        setIsUpdated(false)
        return response.data;
      }
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message],
        })
      );
    }
    setIsUpdated(false)
  }
  const [formState, formAction, isPending] = useActionState(updateAction);

  return (
    <div className="w-[80%] mx-auto py-6">
      <img
        src={user.img}
        alt="profile"
        className="w-[12rem] h-[12rem] rounded-full border-4 border-blue-300 mx-auto my-5 object-cover"
      />
      <p className="mb-4 text-center w-full font-medium text-gray-700">
        {user.mailId}
    </p>
      <form
        className="flex flex-col gap-4 items-center justify-center p-6 bg-gray-100 rounded-md shadow-md"
        action={formAction}
      >
        <Input
          label="Full Name"
          name="fullName"
          defaultValue={formState?.studentName || user.studentName}
          onChange={(value = true) => setIsUpdated(value)}
        />
        <Input
          label="Contact Number"
          name="contactNumber"
          defaultValue={formState?.contactNumber || user.contactNumber}
          onChange={(value = true) => setIsUpdated(value)}
        />
        <TextArea
          label="Address"
          name="address"
          value={formState?.address || user.address}
          changeAddress={changeAddress}
          setChangeAddress={setChangeAddress}
          onChange={(value = true) => setIsUpdated(value)}
          disabled
        />
        <button
          type="submit"
          disabled={!isUpdated}
          className="bg-green-500 rounded-md px-4 py-2 w-1/2 text-white font-semibold hover:bg-green-600 hover:cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {
            isPending && <CircularProgress color="white" size="1.5rem" />
          }
          {
            !isPending && <span>Update</span>
          }

        </button>
      </form>
    </div>
  );
}
