import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProfastLogo from '../Shared/ProfastLogo/ProfastLogo';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-300">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="text-xl md:text-2xl font-extrabold text-secondary">Dashboard</div>
                </div>

                <div className='min-h-[95vh]'>
                    <Outlet></Outlet>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu px-0 bg-base-200 text-base-content min-h-full w-2/3 md:w-1/2 lg:w-80">
                    <div className='px-5 md:px-8 md:py-2'>
                        <ProfastLogo></ProfastLogo>
                    </div>

                    <div className="divider my-2 md:my-4"></div>

                    <div className='grid gap-1 md:gap-3 px-4'>
                        <NavLink to='/dashboard/my-parcels'>
                            <li className='btn btn-sm md:btn-md btn-ghost rounded-lg lg:text-lg'>My Parcels</li>
                        </NavLink>
                        <NavLink to='/dashboard/payment-history'>
                            <li className='btn btn-sm md:btn-md btn-ghost rounded-lg lg:text-lg'>Payment History</li>
                        </NavLink>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;