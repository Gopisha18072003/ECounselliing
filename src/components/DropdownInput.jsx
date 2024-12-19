import React from "react";

const Dropdown = ({ name, id, options, value='', onChange, label, required }) => {
  return (
    <div className="flex gap-[2rem] justify-start items-center"> 
      <div className="w-2/5">
        {label && (
          <label htmlFor={id} className="block text-gray-700 text-p font-medium">
            {label}
          </label>
        )}
      </div>
      <div className="w-[44%]">
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
