import React from "react";

export const Input = ({ placeholder, className, ...props }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`p-2 border rounded-md ${className}`}
      {...props}
    />
  );
};
