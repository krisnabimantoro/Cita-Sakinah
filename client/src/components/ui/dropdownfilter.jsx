import React from "react";

const DropdownFilter = ({ isOpen, options, selectedOptions, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bg-button text-white border-none shadow-lg rounded-lg mt-2 w-full max-w-xs z-50">
      <div className="flex flex-col gap-2 p-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-main"
              checked={selectedOptions.includes(option)}
              onChange={() => onSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownFilter;
