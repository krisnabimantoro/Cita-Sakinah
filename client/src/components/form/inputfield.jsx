import React from "react";
import { FiChevronDown } from "react-icons/fi";

const InputField = ({
  icon,
  type = "text",
  placeholder,
  id,
  name,
  value,
  onChange,
  label,
  rows,
  options = [],
  passwordInput = false,
  textarea = false,
  dropdown = false,
}) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label htmlFor={id} className="text-main font-semibold text-sm">
        {label}
      </label>
    )}
    <div
      className={`flex items-center border border-main rounded-lg p-3 text-main`}
    >
      {icon && <span className="px-2 text-xl opacity-70">{icon}</span>}
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 outline-none resize-none w-full"
          rows={rows}
        />
      ) : dropdown ? (
        <div className="flex items-center w-full">
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="flex-1 outline-none bg-transparent appearance-none"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value} className="text-main">
                {option.label}
              </option>
            ))}
          </select>
          <FiChevronDown className="text-abugelap" size={20} />
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={passwordInput ? "current-password" : "off"}
          className="flex-1 outline-none w-full"
        />
      )}
    </div>
  </div>
);

export default InputField;
