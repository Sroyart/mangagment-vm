import React from "react";

type Props = {
  className: string;
  type: string;
  read: boolean;
  children: React.ReactNode;
};

const Input: React.FC<Props> = ({ children, type, className, read }) => {
  return (
    <div className="my-4">
      {type !== "textarea" ? (
        <input
          disabled={read}
          className={className + "  border px-1.5 py-2"}
          type={type}
        >
          {children}
        </input>
      ) : (
        <textarea className={className + " h-24 border px-1.5 py-2"}></textarea>
      )}
    </div>
  );
};

export default Input;
