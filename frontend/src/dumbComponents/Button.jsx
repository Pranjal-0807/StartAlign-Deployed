import React from "react";

const Button = ({ type, cssClass, btnText, handleClick }) => {
  return (
    <button
      type={type ? type : ""}
      onClick={handleClick}
      className={
        cssClass
          ? cssClass
          : type === "submit"
          ? "w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-200"
          : "bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
      }
    >
      {btnText}
    </button>
  );
};

export default Button;
