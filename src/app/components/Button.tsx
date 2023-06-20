import React from "react";

type Props = {
  type: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  onSubmit,
  type,
  className,
}) => {
  return (
    <button
      type={type}
      className={
        "mt-4 cursor-pointer bg-sky-900 px-2 py-1.5 text-lg font-bold text-white active:bg-sky-800" +
        className
      }
      onSubmit={onSubmit}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
