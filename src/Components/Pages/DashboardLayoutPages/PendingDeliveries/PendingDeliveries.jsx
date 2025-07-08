import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import LoadingInfinite from '../../../Shared/Loading/LoadingInfinite';
import { FaCheckCircle } from 'react-icons/fa';
import LoadingBars from '../../../Shared/Loading/LoadingBars';

const PendingDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: pendingParcelDetails = [], isLoading, refetch } = useQuery({
        queryKey: ["pendingDelivery", user.email],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/assigned-parcel?email=${user.email}`);
            return res.data;
        }
    })

    const [statusChangingFor, setStatusChangingFor] = useState(false);

    const handleDeliveryStatusChange = async (trackingId, newStatus, riderEmail) => {
        setStatusChangingFor(trackingId);
        try {
            // this will update the status in parcelCollection
            const res = await axiosSecure.patch(`/parcels/status/${trackingId}`, { status: newStatus, riderEmail });

            // if the delivery status is "delivered" 
            // The parcel TrackingId will be added to completed parcel attribute
            // also the tracking id will be deleted from assignedparcel
            // this all will happen in the backend

            if (res.data.modifiedCount) {
                successAlert("Status Updated", `Parcel marked as ${newStatus.replace('_', ' ')}`);
                refetch();
            }
        }
        catch (err) {
            errorAlert("Failed to update", err.message);
        }
        finally {
            setStatusChangingFor(false);
        }

    }

    return (
        <div className='min-h-screen p-4 md:p-6 lg:p-14'>
            <h1 className='mb-5 text-2xl md:text-4xl text-secondary font-extrabold'>Pending Deliveries</h1>

            <div className="mt-5 overflow-x-auto shadow-md rounded-lg border border-base-300">
                <table className="table table-zebra w-full bg-white">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Tracking ID</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Weight (kg)</th>
                            <th>Charge (৳)</th>
                            <th>Payment</th>
                            <th>Created At</th>
                            <th className='text-center'>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ?
                                <tr>
                                    <td colSpan={9} className="text-center text-gray-500"><div className='w-10 md:mx-auto'><LoadingBars></LoadingBars></div></td>
                                </tr>
                                :

                                pendingParcelDetails.length === 0 ?
                                    <tr>
                                        <td colSpan={9} className="text-center text-gray-500">
                                            <span className="text-lg font-semibold">No Pending Parcels Found!</span>
                                        </td>
                                    </tr>
                                    :
                                    pendingParcelDetails.map((parcel, index) => {
                                        const { parcelDetails, senderDetails, receiverDetails } = parcel;

                                        return (
                                            <tr key={parcel._id}>
                                                <td>{index + 1}</td>
                                                <td>{parcelDetails.trackingId}</td>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{senderDetails.name}</div>
                                                        <div className="text-sm text-gray-600">{senderDetails.contact}</div>
                                                        <div className="text-xs">{`${senderDetails.area}, ${senderDetails.city}`}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{receiverDetails.name}</div>
                                                        <div className="text-sm text-gray-600">{receiverDetails.contact}</div>
                                                        <div className="text-xs">{`${receiverDetails.area}, ${receiverDetails.city}`}</div>
                                                    </div>
                                                </td>
                                                <td>{parcelDetails.weight}</td>
                                                <td>৳{parcelDetails.deliveryCharge}</td>

                                                <td>
                                                    <div className="text-center w-fit rounded-xl bg-success text-white px-3 py-1 text-xs capitalize">
                                                        {parcelDetails.payment_status}
                                                    </div>
                                                </td>
                                                <td>{new Date(parcelDetails.createdAt).toLocaleString()}</td>
                                                <td>
                                                    <div>
                                                        {
                                                            parcelDetails.delivery_status === 'rider_assigned' && (
                                                                <button className="btn btn-block btn-sm btn-warning text-secondary"
                                                                    onClick={() => handleDeliveryStatusChange(parcelDetails.trackingId, "in_transit")}>
                                                                    Mark as In Transit

                                                                </button>

                                                            )
                                                        }

                                                        {
                                                            parcelDetails.delivery_status === 'in_transit' && (
                                                                <button className="btn btn-block btn-sm btn-success text-white"
                                                                    onClick={() => handleDeliveryStatusChange(parcelDetails.trackingId, "delivered", user.email)}>
                                                                    Mark as Delivered
                                                                </button>
                                                            )
                                                        }
                                                        {parcelDetails.trackingId === statusChangingFor && <div className='w-8 mt-2 mx-auto'><LoadingInfinite></LoadingInfinite></div>}
                                                    </div>

                                                </td>

                                            </tr>
                                        );
                                    })

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingDeliveries;