import React from 'react';
import { NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const NavbarLinks = () => {
    const { user } = useAuth();

    const links = [
        // { url: "/services", name: "Services" },
        { url: "/coverage", name: "Coverage" },
        // { url: "/about Us", name: "About Us" },
        // { url: "/pricing", name: "Pricing" },
        // { url: "/be-a-rider", name: "Be a rider" },
        { url: "/send-parcel", name: "Send Parcel" }

    ];

    const privateLinks = [
        { url: "/dashboard", name: "Dashboard" }
    ]

    return (
        <>
            {
                links.map((link, index) =>
                    <NavLink
                        key={index}
                        to={link.url}
                        className={({ isActive }) =>
                            isActive ? "bg-primary rounded-4xl text-secondary w-fit" : ""
                        }
                    >
                        <li
                            key={index}
                            className='btn btn-ghost rounded-4xl hover:bg-primary transform duration-300'>{link.name}
                        </li>
                    </NavLink>)
            }

        
            {
                user &&
                <>
                    <div className='divider divider-horizontal mx-0'></div>
                    {
                        privateLinks.map((privateLink, index) =>
                            <NavLink
                                key={index}
                                to={privateLink.url}
                                className={({ isActive }) =>
                                    isActive ? "bg-primary rounded-4xl text-secondary" : ""
                                }
                            >
                                <li
                                    key={index}
                                    className='btn btn-ghost rounded-4xl hover:bg-primary transform duration-300'>{privateLink.name}
                                </li>
                            </NavLink>)
                    }
                </>
            }
        </>
    );
};

export default NavbarLinks;