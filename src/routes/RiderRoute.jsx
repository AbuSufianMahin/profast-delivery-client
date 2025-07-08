import React from 'react';
import useUserRole from '../hooks/useUserRole';
import LoadingInfinite from '../Components/Shared/Loading/LoadingInfinite';
import { Navigate } from 'react-router';

const RiderRoute = ({children}) => {
    const { userRole, isRoleLoading } = useUserRole();

    if (isRoleLoading) {
        return (
            <div className='flex justify-center'>
                <div className='w-20 pt-12 min-h-[50vh]'>
                    <LoadingInfinite></LoadingInfinite>
                </div>
            </div>
        )
    }

    if (userRole !== "rider"){
        return <Navigate to='/error/forbidden'></Navigate>
    }

    return children
};

export default RiderRoute;