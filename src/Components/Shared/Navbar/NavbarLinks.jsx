import React from 'react';
import { NavLink } from 'react-router';

const NavbarLinks = () => {

    const links = [
        { url: "/services", name: "Services" },
        { url: "/coverage", name: "Coverage" },
        { url: "/about Us", name: "About Us" },
        { url: "/pricing", name: "Pricing" },
        { url: "/be-a-rider", name: "Be a rider" }
    ];

    return (
        <>
            {
                links.map((link, index) =>
                    <NavLink to={link.url}
                        className={({ isActive }) =>
                            isActive ? "bg-primary rounded-4xl" : ""
                        }
                    >
                        <li
                            key={index}
                            className='btn btn-ghost rounded-4xl text-secondary hover:bg-primary transform duration-300'>{link.name}
                        </li>
                    </NavLink>)
            }
        </>
    );
};

export default NavbarLinks;