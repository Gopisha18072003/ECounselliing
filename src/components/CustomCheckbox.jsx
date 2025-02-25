import React from "react";
export default function CustomCheckbox({ label, onChange, name }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="h-4 w-4"
        onChange={onChange}
        name={name}
      />
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
    </div>
  );
}
