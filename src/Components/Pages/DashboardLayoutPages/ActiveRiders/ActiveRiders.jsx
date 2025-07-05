import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: activeRiders } = useQuery({
        queryKey: ["active-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/active');
            return res.data;
        }
    })
    return (
        <div className='min-h-screen px-4 md:px-6 lg:px-14 md:py-8'>
            <h1 className='mb-5 text-4xl text-secondary font-extrabold'>Active Riders</h1>

            <div className="overflow-x-auto shadow-md rounded-lg border border-base-300">
                <table className="table table-zebra w-full bg-neutral">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Contact</th>
                            <th>Vehicle</th>
                            <th>City</th>
                            <th>Warehouse</th>
                            <th>Assigned On</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activeRiders?.map((rider, index) => (
                                <tr key={rider._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{rider.riderName}</td>
                                    <td>{rider.riderAge}</td>
                                    <td>{rider.riderContact}</td>
                                    <td>{rider.vehicleType}</td>
                                    <td>{rider.riderCity}</td>
                                    <td>{rider.riderWarehouse}</td>
                                    <td>{new Date(rider.updated_at).toLocaleString()}</td>
                                    <td>
                                        <span className="badge badge-success rounded-4xl text-white">{rider.status}</span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {activeRiders?.length === 0 && (
                    <div className="text-center p-6">
                        <p className="text-gray-500">No active riders found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveRiders;