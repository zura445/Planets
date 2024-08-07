import React, { useState } from "react";
import data from "../data.json";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav>
        <div className="flex justify-between items-center pt-[22px] px-8 border-b pb-7">
          <div className="text-lg text-center text-white">THE PLANETS</div>
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none bg-black"
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg
                width="24"
                height="17"
                viewBox="0 0 24 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  width="24"
                  height="3"
                  rx="1.5"
                  fill={isOpen ? "#979797" : "#FFFFFF"}
                />
                <rect
                  y="7"
                  width="24"
                  height="3"
                  rx="1.5"
                  fill={isOpen ? "#979797" : "#FFFFFF"}
                />
                <rect
                  y="14"
                  width="24"
                  height="3"
                  rx="1.5"
                  fill={isOpen ? "#979797" : "#FFFFFF"}
                />
              </svg>
            </button>
          </div>

          {/* დესკტოპის მენიუ */}
          <ul className="hidden sm:flex lg:gap-14 gap-10 text-xs items-center">
            {data.map((planet, index) => (
              <li key={index}>
                <Link
                  className={`text-white`}
                  to={`/${planet.name.toLowerCase()}`}
                >
                  {planet.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isOpen && (
          <ul className="sm:hidden py-2">
            {data.map((planet, index) => (
              <li key={index} className="px-8 py-2">
                <Link
                  className={`text-white hover:text-gray-300 ${
                    location.pathname === `/${planet.name.toLowerCase()}`
                      ? "font-bold"
                      : ""
                  }`}
                  to={`/${planet.name.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  {planet.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
