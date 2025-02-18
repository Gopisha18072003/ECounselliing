import React from "react";

const Dropdown = ({ name, id, options, value='', onChange, label, required }) => {
  return (
    <div className="flex gap-[2rem] justify-center items-center w-full"> 
      <div className="w-1/2 flex gap-1">
        {label && (
          <label htmlFor={id} className="block text-gray-700 text-p font-medium">
            {label}
          </label>
        )}
        {
          required && <span className="text-[1.25rem] text-red-500 ">*</span>
        }
      </div>
      <div className="w-1/2">
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full max-w-[190px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        >
          <option value="" disabled>
            -- Select an option --
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label || option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
