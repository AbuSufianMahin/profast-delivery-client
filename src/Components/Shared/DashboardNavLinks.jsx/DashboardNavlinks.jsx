import React from 'react';
import { FaHome, FaBoxOpen, FaHistory, FaTruckMoving, FaUserEdit, FaUserCheck, FaUserClock, FaUserTimes, FaUserShield } from 'react-icons/fa';
import { NavLink } from 'react-router';

const DashboardNavlinks = () => {
    const navItems = [
        {
            path: '/',
            icon: <FaHome className="text-lg md:text-xl" />,
            label: "Home"
        },
        {
            path: '/dashboard/my-parcels',
            icon: <FaBoxOpen className="text-lg md:text-xl" />,
            label: 'My Parcels',
        },
        {
            path: '/dashboard/payment-history',
            icon: <FaHistory className="text-lg md:text-xl" />,
            label: 'Payment History',
        },
        {
            path: '/dashboard/track-package',
            icon: <FaTruckMoving className="text-lg md:text-xl" />,
            label: 'Track A Package',
        },
        {
            path: '/dashboard/update-profile',
            icon: <FaUserEdit className="text-lg md:text-xl" />,
            label: 'Update Profile',
        },
        {
            path: '/dashboard/active-riders',
            icon: <FaUserCheck className="text-lg md:text-xl" />,
            label: 'Active Riders',
        },
        {
            path: '/dashboard/pending-riders',
            icon: <FaUserClock className="text-lg md:text-xl" />,
            label: 'Pending Riders',
        },
        {
            path: '/dashboard/rejected-riders',
            icon: <FaUserTimes className="text-lg md:text-xl" />,
            label: 'Rejected Riders',
        },
        {
            path: '/dashboard/make-admin',
            icon: <FaUserShield className="text-lg md:text-xl" />,
            label: 'Make Admin',
        }
    ];

    return (

        <div className='grid gap-1 md:gap-2 pl-4 pr-6 md:pr-14'>
            {navItems.map((link, index) => (
                <li key={index}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            `flex shadow-sm items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                            ${isActive
                                ? 'bg-primary text-secondary font-bold'
                                : 'hover:bg-base-300'}`
                        }
                    >
                        {link.icon}
                        {link.label}
                    </NavLink>
                </li>
            ))}

        </div>

    );
};

export default DashboardNavlinks;