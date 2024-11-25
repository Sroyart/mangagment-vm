import React from "react";

const Button = (props) => {
  return (
    <button
      {...props}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${props.color} bg-indigo-600`}
      type="submit"
    />
  );
};

export default Button;
