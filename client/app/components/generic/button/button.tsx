import React, { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface IButton extends HTMLProps<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, ...props }: IButton) => {
    return (
        <button
            className={twMerge(`py-2 px-4 rounded`, { ...props }.className)}
        >
            {children}
        </button>
    );
};
