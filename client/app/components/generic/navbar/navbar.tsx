import React from "react";

interface INavBar {
    children: React.ReactNode;
}

export const NavBar = ({ children }: INavBar) => {
    return (
        <div className="flex items-center">
            <div className="text-lg font-bold">My App</div>
            <div className="flex space-x-4">{children}</div>
        </div>
    );
};
