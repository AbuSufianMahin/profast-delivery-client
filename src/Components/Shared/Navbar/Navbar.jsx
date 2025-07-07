import React from 'react';
import NavbarLinks from './NavbarLinks';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { warningToast } from '../../../Utilities/toastify';

const Navbar = () => {
    const { user, logOutUser } = useAuth();
    console.log(user);

    const handleLogout = () => {
        logOutUser();
        warningToast("You have been logged out")
    }

    return (
        // sticky top-2 z-1000
        <nav className="w-11/12 md:w-10/12 mx-auto navbar shadow-md md:px-8 md:py-4 rounded-2xl bg-neutral">
            <div className="navbar-start gap-2 md:gap-0">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <NavbarLinks></NavbarLinks>
                    </ul>
                </div>
                <div>
                    <ProfastLogo></ProfastLogo>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-1 px-1">
                    <NavbarLinks></NavbarLinks>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className='flex items-center gap-5'>
                            <div className="avatar avatar-online">
                                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                                    <img src={`${user.photoURL || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}`} referrerPolicy='no-referrer' />
                                </div>
                            </div>
                            <div>
                                <button className='btn btn-primary text-secondary' onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                        :
                        <div className='flex gap-2'>
                            <Link className='btn btn-primary text-secondary hover:bg-transparent' to='/login'>Login</Link>
                            <Link className='btn btn-primary text-secondary btn-outline' to='/register'>Register</Link>
                        </div>
                }
            </div>
        </nav>

    );
};

export default Navbar;