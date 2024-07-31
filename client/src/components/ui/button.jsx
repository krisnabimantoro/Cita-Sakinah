import React from "react";

const Button = ({ name, width, color, icon = null, onClick = null }) => (
  <button
    className={`${color} text-white rounded-lg py-3 ${width} flex gap-3 items-center justify-center`}
    onClick={onClick}
  >
    {icon && <span>{icon}</span>}
    <span className="font-medium">{name}</span>
  </button>
);

export default Button;
