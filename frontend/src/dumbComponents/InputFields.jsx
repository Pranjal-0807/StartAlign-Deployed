import React from "react";

const InputFields = ({ inputFieldDetails }) => {
  return (
    <>
      {inputFieldDetails.map((inputField) => (
        <InputField
          key={inputField.id}
          type={inputField.type}
          name={inputField.name}
          label={inputField.label}
          cssClass={inputField.cssClass}
          placeholder={inputField.placeholder}
        />
      ))}
    </>
  );
};

export default InputFields;

const InputField = ({ type, name, label, cssClass, placeholder }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={label}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={
          cssClass
            ? cssClass
            : "w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        }
      />
    </div>
  );
};
