import React, { useState, useEffect, useActionState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../components/Input";


export default function BasicInformation() {
  const user = useSelector((state) => state.auth.user);

  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <div className="w-full">
      <img src={user.logo} alt="logo" className="w-[6rem] h-[6rem] rounded-full border-2 border-gray-300 mx-auto my-5 "/>
      <form className="flex flex-col gap-4 items-center justify-center py-4">
        <Input
          label="College Name"
          name="collegeName"
          value={user.collegeName}
        />
        <Input
          label="Email"
          name="email"
          value={user.mailId}
          disabled={true} // Email is editable
        />
        <Input
          label="Contact Number"
          name="contactNumber"
          value={user.contactInfo}
          disabled={true} // Contact Number is editable
        />
        <Input 
            label="Address"
            name="address"
            value={user.address}
            disabled
        />
        <button type="submit" disabled={!isUpdated} className="bg-green-500 rounded-md px-4 py-2 w-1/2 text-white font-semibold hover:bg-green-600 hover:cursor-pointer">
          Update
        </button>
      </form>
    </div>
  );
}
