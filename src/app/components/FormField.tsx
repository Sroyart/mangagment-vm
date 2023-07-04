import { Field } from "formik";
import React from "react";

const FormField = (props) => {
  return (
    <div>
      <label className="block mb-2 text-gray-600 font-medium" htmlFor="E-mail">
        {props.label}

        <Field
          type={props.type}
          name={props.name}
          className="border-solid border-gray-300 border py-2 px-4 w-full
          rounded text-gray-700"
        />
      </label>
    </div>
  );
};

export default FormField;
