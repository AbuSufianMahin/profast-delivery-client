import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingBars from '../../../Shared/Loading/LoadingBars';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: completedDeliveries = [], isLoading } = useQuery({
        queryKey: ["completedDeliveries", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/completed-deliveries', {
                params: { email: user.email }
            });

            return res.data
        }
    })

    return (
        <div className='min-h-screen p-4 md:p-6 lg:p-14'>
            <h1 className='mb-5 text-2xl md:text-4xl text-secondary font-extrabold'>Completed Deliveries</h1>

            <div className="overflow-x-auto shadow-md rounded-lg border border-base-300 bg-white">
                <table className="table table-zebra w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Tracking ID</th>
                            <th>Parcel Name</th>
                            <th>Weight (kg)</th>
                            <th>Delivery Charge (৳)</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ?
                                <tr>
                                    <td colSpan={9} className="text-center text-gray-500"><div className='w-10 md:mx-auto'><LoadingBars></LoadingBars></div></td>
                                </tr>
                                :
                                completedDeliveries.length === 0 ?
                                    <tr>
                                        <td colSpan={8} className="text-center p-4 text-gray-500">No completed deliveries found.</td>
                                    </tr>
                                    :
                                    completedDeliveries.map((parcel, index) => {
                                        const { parcelDetails, senderDetails, receiverDetails } = parcel;
                                        return (
                                            <tr key={parcel._id}>
                                                <td>{index + 1}</td>
                                                <td>{parcelDetails.trackingId}</td>
                                                <td>{parcelDetails.name}</td>
                                                <td>{parcelDetails.weight}</td>
                                                <td>৳{parcelDetails.deliveryCharge}</td>
                                                <td>
                                                    <div>
                                                        <div className="font-semibold">{senderDetails.name}</div>
                                                        <div className="text-xs">{senderDetails.contact}</div>
                                                        <div className="text-xs opacity-70">{`${senderDetails.area}, ${senderDetails.city}`}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="font-semibold">{receiverDetails.name}</div>
                                                        <div className="text-xs">{receiverDetails.contact}</div>
                                                        <div className="text-xs opacity-70">{`${receiverDetails.area}, ${receiverDetails.city}`}</div>
                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    }
                                    )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default CompletedDeliveries;