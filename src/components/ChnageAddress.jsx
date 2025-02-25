import stateCityData from "../assets/data/states&city";
import Input from "./Input";
import React, { useEffect } from "react";
import { useState } from "react";
import Dropdown from "./DropdownInput";

const TextArea = ({
  name,
  id,
  label,
  required = false,
  value,
  changeAddress,
  setChangeAddress,
  onChange,
  ...rest
}) => {
  function extractAddressComponents(address) {
    // Regular expression to capture street name, city, and state
    const addressRegex = /^([^,]+)\s*,\s*([^,]+)\s*,\s*([A-Za-z\s]+)$/;

    const match = address.match(addressRegex);

    if (match) {
      return {
        streetName: match[1]?.trim() || null, // Street name
        city: match[2]?.trim() || null, // City
        state: match[3]?.trim() || null, // State
      };
    }

    return null; // Return null if format doesn't match
  }

  const { streetName, city, state } = extractAddressComponents(value);
  useEffect(() => {
    setChangeAddress((prevState) => ({
      ...prevState,
      streetName,
      city,
      state,
    }));
  }, [value]);

  function handleToggleChangeAddress() {
    setChangeAddress((prevState) => ({
      ...prevState,
      isChanges: !prevState.isChanges,
    }));
  }

  function handleInputChange(event, key) {
    onChange();
    if (key == "state") {
      onChange(false);
      setChangeAddress((prevState) => ({
        ...prevState,
        [key]: event.target.value,
        city: "",
      }));
    } else {
      setChangeAddress((prevState) => ({
        ...prevState,
        [key]: event.target.value,
      }));
    }
  }
  return (
    <div className="input-group flex justify-center gap-[2rem] items-center w-full">
      <div className=" flex gap-1 justify-start items-center w-1/2">
        {label && (
          <label
            htmlFor={id || name}
            className="input-label block text-gray-700 text-p font-semibold"
          >
            {label}
          </label>
        )}
        {required && <span className="text-[1.25rem] text-red-500">*</span>}
      </div>
      <div className="w-1/2 flex gap-8 items-center border-2 p-2 rounded-md">
        {!changeAddress.isChanges && (
          <div className="flex flex-col w-full gap-4">
            <textarea
              name={name}
              id={id || name}
              required={required}
              className="input-field border-2 p-1 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              defaultValue={value}
              {...rest} // Spread other props like `min`, `max`, `pattern`, etc.
            />
            <button
              className="px-2 py-1 text-sm text-white font-semibold hover:bg-yellow-600 bg-yellow-500 rounded-md"
              type="button"
              onClick={handleToggleChangeAddress}
            >
              Change
            </button>
          </div>
        )}
        {changeAddress.isChanges && (
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-4">
              <Input
                name="streetName"
                id="streetName"
                label="Street Name"
                placeholder="Gandhi Marg"
                value={changeAddress.streetName}
                onChange={(event) => handleInputChange(event, "streetName")}
                required
              />
              <Dropdown
                label="State"
                options={Object.keys(stateCityData)}
                value={changeAddress.state}
                defaultValue={changeAddress.state}
                onChange={(e) => handleInputChange(e, "state")}
                required
              />
              <Dropdown
                label="City"
                options={
                  changeAddress.state ? stateCityData[changeAddress.state] : []
                }
                value={changeAddress.city}
                defaultValue={changeAddress.city}
                onChange={(e) => handleInputChange(e, "city")}
                required
              />
            </div>
            <button
              className="px-2 py-1 text-sm text-white font-semibold hover:bg-gray-600 bg-gray-500 rounded-md"
              type="button"
              onClick={handleToggleChangeAddress}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
