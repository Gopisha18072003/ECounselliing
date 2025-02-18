import React from "react";
import PropTypes from "prop-types";

// Flexible Input Component
const Input = ({
  type = "text",
  name,
  id,
  label,
  required = false,
  errorMessage=null,
  ...rest
}) => {
  return (
    <div className="input-group flex justify-between gap-[2rem] items-center w-full">
      <div className=" flex gap-1 justify-start items-center w-1/2">
        {label && (
          <label
            htmlFor={id || name}
            className="input-label block text-gray-700 text-p font-semibold "
          >
            {label}
          </label>
        )}
        {
            required && (<span className="text-[1.25rem] text-red-500">*</span>)
        }
      </div>
      <div className="flex flex-col w-1/2">
        <input
          type={type}
          name={name}
          id={id || name}
          required={required}
          className="input-field border-2 p-1 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          {...rest} // Spread other props like `min`, `max`, `pattern`, etc.
        />
        {
          errorMessage && (
            <p className="w-full text-sm font-medium text-red-400">{errorMessage}</p>
          )
        }
      </div>
    </div>
  );
};

// PropTypes for validation
Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

// Default Props
Input.defaultProps = {
  type: "text",
  required: false,
};

export default Input;
