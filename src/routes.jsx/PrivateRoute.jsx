import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingRing from '../Components/Shared/Loading/LoadingRing';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return (
            <div className='flex justify-center border '>
                <div className='w-20 pt-12 min-h-[50vh]'>
                    <LoadingRing></LoadingRing>
                </div>
            </div>
        )
    }

    if (!user){ 
        return <Navigate to='/login'></Navigate>
    }


    return children;
};

export default PrivateRoute;