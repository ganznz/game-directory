import React, { useState } from "react";

interface INavBar {
    children: React.ReactNode;
}

export const NavBar = ({ children }: INavBar) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const childrenArray = React.Children.toArray(children);
    const logo = childrenArray[0];
    const navLinks = childrenArray.slice(1);

    return (
        <>
            <nav className="bg-light-bg border-t-10 border-light-accent">
                <div className="flex items-center justify-center h-16">
                    {logo}
                    <div className="hidden md:flex ml-10 h-full items-center">
                        {navLinks.map((link, i) => (
                            <div
                                key={i}
                                className="flex items-center h-full p-3 md:hover:bg-light-secondary"
                            >
                                {link}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={toggleMenu}
                        className="absolute left-3 md:hidden bg-transparent flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <span className="sr-only">Open navigation links</span>
                        {isOpen ? (
                            <i className="pi pi-times text-gray-600"></i>
                        ) : (
                            <i className="pi pi-bars text-gray-600"></i>
                        )}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden flex flex-col">
                        <div className="p-3 flex flex-col gap-4 items-center h-[80vh] absolute w-full flex-auto bg-gradient-to-b from-white to-transparent via-white/85">
                            {navLinks.map((link, i) => (
                                <div key={i}>{link}</div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};
