import React from 'react';
import { FaHome, FaBoxOpen, FaHistory, FaTruckMoving, FaUserEdit, FaUserCheck, FaUserClock, FaUserTimes, FaUserShield, FaMotorcycle, FaClock } from 'react-icons/fa';
import { NavLink } from 'react-router';
import useUserRole from '../../../hooks/useUserRole';
import LoadingInfinite from '../Loading/LoadingInfinite';

const DashboardNavlinks = () => {
    const { userRole, isRoleLoading } = useUserRole();

    const openLinks = [
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
    ];

    const riderLinks = [
        {
            path: '/dashboard/pending-deliveries',
            icon: <FaClock className="text-lg md:text-xl" />,
            label: 'Pending Deliveries',
        }
    ]

    const adminLinks = [
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
        },
        {
            path: '/dashboard/assign-rider',
            icon: <FaMotorcycle className="text-lg md:text-xl" />,
            label: 'Assign Rider',
        }
    ]

    return (

        <div className='grid gap-1 md:gap-2 pl-4 pr-6 md:pr-14'>
            {
                openLinks.map((link, index) =>
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
                    </li>)
            }

            {
                !isRoleLoading && userRole === "rider" &&
                <>
                    <div className="divider text-sm font-bold text-secondary uppercase tracking-wider">Rider Tools</div>
                    {
                        riderLinks.map((link, index) =>
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex shadow-sm items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ?
                                            'bg-primary text-secondary font-bold'
                                            :
                                            'hover:bg-base-300'}`
                                    }
                                >
                                    {link.icon}
                                    {link.label}
                                </NavLink>
                            </li>
                        )}
                </>

            }

            {
                userRole === "admin" && !isRoleLoading &&
                <>
                    <div className="divider text-sm font-bold text-secondary uppercase tracking-wider">Admin Controls</div>
                    {
                        adminLinks.map((link, index) =>
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex shadow-sm items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ?
                                            'bg-primary text-secondary font-bold'
                                            :
                                            'hover:bg-base-300'}`
                                    }
                                >
                                    {link.icon}
                                    {link.label}
                                </NavLink>
                            </li>
                        )}
                </>
            }

        </div>

    );
};

export default DashboardNavlinks;