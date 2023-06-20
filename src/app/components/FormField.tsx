"use client";
import React from "react";
import { Field } from "formik";
import Input from "./Input";
import classNames from "classnames";

type Props = {
  size?: string;
  as?: (props: any) => JSX.Element;
  name: string;
  label: string;
  type: string;
  read: boolean;
  className?: string;
};

const FormField: React.FC<Props> = ({
  size = "full",
  as: Component = Input,
  name,
  label,
  read,
  ...otherProps
}) => {
  return (
    <div>
      <Field name={name} className="w-2/4 px-6 ">
        {({
          // @ts-ignore
          field, // @ts-ignore
          meta,
        }) => (
          <label>
            <span className="block mb-2 text-sm font-medium ">{label}</span>
            <Component
              className={`${
                read ? "bg-gray-500 text-gray-300" : ""
              } border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  bg-gray-600 border-gray-500 placeholder-gray-400 text-white`}
              read={read}
              {...field}
              {...otherProps}
            />
            {meta.error && meta.touched ? (
              <span className="block text-red-600">{meta.error}</span>
            ) : null}
          </label>
        )}
      </Field>
    </div>
  );
};

export default FormField;
