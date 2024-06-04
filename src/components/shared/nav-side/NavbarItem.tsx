import React, { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

interface NavbarItemProps {
    icon?: React.ReactNode;
    title: string;
    href: string;
    children?: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ icon, title, href, children }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <li>
            {children ? (
                <>
                    <button
                        type="button"
                        className="flex items-center w-full p-2 rounded-lg group hover:bg-dark_ud-100 hover:bg-opacity-30 group transition-colors"
                        aria-controls="dropdown-example"
                        onClick={toggleDropdown}
                    >
                        {icon}
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{title}</span>
                        <IoIosArrowDropdown className='w-6 h-6' color="white"/>
                    </button>
                    <ul className={`py-2 space-y-2 ${isDropdownOpen ? 'block ' : 'hidden'}`}>{children}</ul>
                </>
            ) : (
                <Link to={href} className="flex items-center p-2 rounded-lg hover:bg-dark_ud-100 hover:bg-opacity-30 group transition-colors">
                    {icon}
                <span className={`${icon ? 'ms-3' : 'ms-9'}`}>{title}</span>
                </Link>
            )}
        </li>
    );
};

export default NavbarItem;
