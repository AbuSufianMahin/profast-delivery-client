import React from 'react';
import NavbarLinks from './NavbarLinks';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <nav className="w-11/12 md:w-10/12 mx-auto navbar shadow md:px-8 md:py-4 rounded-2xl bg-neutral">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <NavbarLinks></NavbarLinks>
                        </ul>
                    </div>
                    <ProfastLogo></ProfastLogo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <NavbarLinks></NavbarLinks>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;