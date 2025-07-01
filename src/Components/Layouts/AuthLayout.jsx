import React from 'react';
import authImage from "../../assets/pictures/authImage.png"
import ProfastLogo from '../Shared/ProfastLogo/ProfastLogo';
import { Outlet } from 'react-router';
const AuthLayout = () => {
    return (
        <div className='flex flex-col md:flex-row h-screen font-inter'>
            <div className='flex-1 flex flex-col py-10'>
                <div className='w-10/12 mx-auto'>
                    <ProfastLogo></ProfastLogo>
                </div>
                <div className='flex-1 w-10/12 lg:w-3/5 mx-auto mt-10'>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className='bg-[#FAFDF0] flex-1 flex items-center justify-center'>
                <img src={authImage} alt="auth image" />
            </div>
        </div>
    );
};

export default AuthLayout;