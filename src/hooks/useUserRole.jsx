import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user, isAuthLoading } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: userRole = "user", isLoading: roleLoading, refetch } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !isAuthLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data.role;
        }
    })

    return { userRole, isRoleLoading: isAuthLoading || roleLoading, roleRefetch: refetch }
};

export default useUserRole;