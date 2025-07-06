import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUserTimes } from 'react-icons/fa';
import LoadingBars from '../../../Shared/Loading/LoadingBars';
import { confirmWarningAlert, errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import useUserRole from '../../../../hooks/useUserRole';
// import useDebounce from '../../../../hooks/useDebounce';
const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const [emailQuery, setEmailQuery] = useState("");

    const { roleRefetch } = useUserRole();

    // const debouncedEmailQuery = useDebounce(emailQuery, 500);

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ["userSearch", emailQuery],

        // !!debouncedEmailQuery && 
        enabled: !!emailQuery,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
            return res.data;
        }
    })

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ userId, role }) =>
            await axiosSecure.patch(`/users/${userId}/role`, { role }),

        onSuccess: () => {
            refetch();
        },
    });

    const handleRoleChange = async (userId, newRole) => {

        const alertTitle = newRole === "admin" ?
            "Confirm Admin Assignment"
            :
            "Confirm Admin Removal"

        const alertMessage = newRole === "admin" ?
            "Are you sure you want to assign admin privileges to this user? This will grant them elevated access."
            :
            "Are you sure you want to remove this user's admin privileges? This action will restrict their access.";

        confirmWarningAlert(alertTitle, alertMessage)
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await updateRole({ userId, role: newRole });
                        successAlert("Role Updated", `User role changed to ${newRole}`);
                        roleRefetch();
                    } catch (err) {
                        errorAlert("Failed to update role", err.message);
                    }
                }
            })
    }


    return (
        <div className='min-h-screen px-4 md:px-6 lg:px-14 md:py-8'>
            <h1 className='mb-5 text-4xl text-secondary font-extrabold'>Search User to make admin</h1>


            <label className="input md:w-1/2 lg:w-1/3">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" placeholder="Search with User Email" onChange={(e) => setEmailQuery(e.target.value)} />
            </label>
            {/* <button className='btn btn-primary text-secondary'>Search</button> */}

            <div className="mt-5 overflow-x-auto shadow-md rounded-lg border border-base-300">
                <table className="table table-zebra w-full bg-white">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Current Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            isLoading ?
                                <tr>
                                    <td colSpan={6} className='text-center'>
                                        <div className='w-10 mx-auto'><LoadingBars></LoadingBars></div>
                                    </td>
                                </tr>
                                :
                                users.length === 0 ?
                                    !emailQuery ?
                                        <tr>
                                            <td colSpan={6}>Searched users will appear here</td>
                                        </tr>
                                        :
                                        <tr >
                                            <td colSpan={6}>No Users found with this Email</td>
                                        </tr>

                                    :
                                    users.map((user, index) => {
                                        const isAdmin = user.role === 'admin';

                                        return (
                                            <tr key={user._id.$oid || index}>
                                                <td>{index + 1}</td>
                                                <td>{user.email}</td>
                                                <td>{user.displayName || 'N/A'}</td>
                                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                                <td className={`${isAdmin ? "text-green-600 font-semibold" : ""} capitalize`}>{user.role}</td>
                                                <td className="text-center">
                                                    {
                                                        !isAdmin ?
                                                            <button
                                                                className="btn btn-sm btn-primary text-secondary"
                                                                title="Make Admin"
                                                                onClick={() => handleRoleChange(user._id, "admin")}
                                                            >
                                                                <FaUserShield size={18} className="mr-1" />
                                                                Make Admin
                                                            </button>

                                                            :

                                                            <button
                                                                className="btn btn-sm btn-error text-secondary"
                                                                title="Remove Admin"
                                                                onClick={() => handleRoleChange(user._id, "user")}
                                                            >
                                                                <FaUserTimes size={18} className="mr-1" />
                                                                Remove Admin
                                                            </button>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MakeAdmin;