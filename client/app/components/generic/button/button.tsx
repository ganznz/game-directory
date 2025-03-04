import React, { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button = ({ children, className, ...props }: IButton) => {
  return (
    <button className={twMerge(`rounded px-4 py-2`, className)} {...props}>
      {children}
    </button>
  );
};
