import React from "react";
import { useSelector } from "react-redux";
import Input from "../../../components/Input";

export default function AcademicInformation() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex items-center justify-center h-[700px] bg-gray-100">
      <div className="w-[50%] bg-white p-8 rounded-xl shadow-lg">
        <p className="text-sm text-gray-600 text-center mb-4">
          <span className="text-lg text-red-600">*</span> You cannot change your academic details
        </p>
        <form className="flex flex-col gap-4">
          <Input
            label="10th Marks (%)"
            name="tenthMarks"
            value={user.tenthMarks}
            disabled
          />
          <Input
            label="10th Board"
            name="tenthBoard"
            value={user.tenthboard}
            disabled
          />
          <Input
            label="12th Marks (%)"
            name="twelvesMarks"
            value={user.twelveMarks}
            disabled
          />
          <Input
            label="12th Board"
            name="twelfthboard"
            value={user.twelfthboard}
            disabled
          />
          <Input
            label="E-Rank"
            name="erank"
            value={user.erank}
            disabled
          />
          <Input
            label="School Name"
            name="schoolName"
            value={user.schoolName}
            disabled
          />
        </form>
      </div>
    </div>
  );
}
