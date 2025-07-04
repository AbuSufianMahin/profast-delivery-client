import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingRing from '../Components/Shared/Loading/LoadingRing';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, isAuthLoading } = useAuth();
    const location = useLocation();

    if (isAuthLoading) {
        return (
            <div className='flex justify-center'>
                <div className='w-20 pt-12 min-h-[50vh]'>
                    <LoadingRing></LoadingRing>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate state={{from:location.pathname}} to='/login'></Navigate>
    }


    return children;
};

export default PrivateRoute;