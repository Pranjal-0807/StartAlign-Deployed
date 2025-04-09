import React from "react";

const Dropdowns = ({ dropdownDetails }) => {
  return (
    <>
      {dropdownDetails.map((dropdown) => (
        <Dropdown
          key={dropdown.id}
          name={dropdown.name}
          label={dropdown.label}
          options={dropdown.options}
        />
      ))}
    </>
  );
};

export default Dropdowns;

const Dropdown = ({ label, options, cssClass, name }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select
        name={name}
        defaultValue={options[0]}
        className={
          cssClass ? cssClass : "border border-gray-300 rounded-md p-2 w-full"
        }
      >
        <option>Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
