import React, { useState, useEffect, useActionState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../components/Input";
import TextArea from "../../../components/ChnageAddress";
import { updateCollege } from "../../../utils/http";
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
    const collegeName = formData.get("collegeName").trim();
    const contactInfo = formData.get("contactNumber").trim();
    const address = `${changeAddress.streetName}, ${changeAddress.city}, ${changeAddress.state}`;

    const updatedCollegeData = {
      collegeName,
      address,
      contactInfo,
      nirfRank: user.nirfRank,
      mailId: user.mailId,
    };

    const nameRegex = /^[A-Za-z\s]+$/;
    const contactRegex = /^\d{10}$/;

    if (!collegeName || !nameRegex.test(collegeName)) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: ["Invalid college name"],
        })
      );
      setIsUpdated(false);
      return user;
    }

    if (!contactInfo || !contactRegex.test(contactInfo)) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: ["Contact number must be exactly 10 digits"],
        })
      );
      setIsUpdated(false);
      return user;
    }

    setChangeAddress((prev) => ({ ...prev, isChanges: false }));
    try {
      const response = await updateCollege(updatedCollegeData);

      if (response.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(authActions.update(response.data));
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: [response.message],
          })
        );
        setIsUpdated(false);
        return response.data;
      }
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message],
        })
      );
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
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col items-center justify-center h-[600px]">
      <img
        src={user.logo}
        alt="logo"
        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
      />
      <p className="text-lg text-gray-700 font-semibold mt-4">{user.mailId}</p>
      <p className="text-md text-gray-600 font-medium mt-1">
        <span className="font-semibold text-gray-800">NIRF Ranking:</span>{" "}
        {user.nirfRank}
      </p>

      <form
        className="w-full flex flex-col gap-4 mt-6 p-6 bg-gray-50 rounded-lg shadow-md"
        action={formAction}
      >
        <Input
          label="College Name"
          name="collegeName"
          defaultValue={formState?.collegeName || user.collegeName}
          onChange={(value = true) => setIsUpdated(value)}
        />
        <Input
          label="Contact Number"
          name="contactNumber"
          defaultValue={formState?.contactInfo || user.contactInfo}
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
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-green-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isPending ? <CircularProgress color="inherit" size="1.5rem" /> : "Update"}
        </button>
      </form>
    </div>
  );
}
