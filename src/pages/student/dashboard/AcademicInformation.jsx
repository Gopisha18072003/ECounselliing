import React from "react";
import { useSelector } from "react-redux";
import Input from "../../../components/Input";

export default function AcademicInformation() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <form className="flex flex-col gap-4 items-center justify-center py-4">
        <Input
          label="10th Marks"
          name="tenthMarks"
          value={user.tenthMarks}
          disabled={true}
        />
        <Input
          label="10th Board"
          name="tenthBoard"
          value={user.tenthboard}
          disabled={true}
        />
        <Input
          label="12th Marks"
          name="twelvesMarks"
          value={user.twelveMarks}
          disabled={true}
        />
        <Input
          label="12th Board"
          name="twelfthboard"
          value={user.twelfthboard}
          disabled={true}
        />
        <Input
          label="E-Rank"
          name="erank"
          value={user.erank}
          disabled={true}
        />
        <Input
          label="School Name"
          name="schoolName"
          value={user.schoolName}
          disabled={true}
        />
      </form>
    </div>
  );
}
