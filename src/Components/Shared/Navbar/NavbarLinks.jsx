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
                links.map((link, index) => <li key={index}><NavLink to={link.url}>{link.name}</NavLink></li>)
            }
        </>
    );
};

export default NavbarLinks;