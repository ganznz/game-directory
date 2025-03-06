import { Menu, X } from "lucide-react";
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
      <nav className="sticky top-0 z-1000 border-t-10 border-light-accent bg-light-bg shadow-sm dark:border-dark-accent">
        <div className="flex h-16 items-center justify-center dark:bg-dark-secondary">
          {logo}
          <div className="ml-10 hidden h-full items-center md:flex">
            {navLinks.map((link, i) => (
              <div
                key={i}
                className="flex h-full items-center p-3 md:hover:bg-light-secondary dark:md:hover:bg-[#616060]"
              >
                {link}
              </div>
            ))}
          </div>
          <button
            onClick={toggleMenu}
            className="absolute left-3 flex items-center justify-center rounded-md bg-transparent p-2 md:hidden"
          >
            <span className="sr-only">Open navigation links</span>
            {isOpen ? (
              <X className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="flex flex-col md:hidden">
            <div className="absolute z-1001 flex h-[80vh] w-full flex-auto flex-col items-center gap-4 bg-gradient-to-b from-white via-white to-transparent p-3 dark:from-dark-secondary dark:via-dark-secondary">
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
