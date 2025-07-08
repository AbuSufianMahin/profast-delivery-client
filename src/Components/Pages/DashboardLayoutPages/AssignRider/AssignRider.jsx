import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();

    const { data: parcelsToAssign = [] } = useQuery({
        queryKey: ['notCollectedPaidParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?delivery_status=not_collected&payment_status=paid');
            return res.data;
        }
    })


    const [senderDetails, setSenderDetails] = useState(null);

    const { data: availableRiders = [], refetch } = useQuery({
        queryKey: ["availableRiders", senderDetails],
        enabled: !!senderDetails,
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/available', {
                params: {
                    city: senderDetails.city,
                    area: senderDetails.area,
                }
            })
            return res.data;
        }
    })

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowRiderList = (parcel) => {
        setIsModalOpen(true);
        setSenderDetails(parcel.senderDetails);
    }

    const handleAssignRider = async (parcel, rider) => {
        try {
            const res = await axiosSecure.patch(`/parcels/${parcel._id}/assign-rider`, { rider });
            if (res.data.modifiedCount) {
                successAlert("Rider Assigned", "The rider has been successfully assigned to the parcel.")
            }
            refetch();
            setIsModalOpen(false);

        }
        catch (error) {
            errorAlert("Something went wrong", error.message);
        }
    }


    return (
        <div className='min-h-screen p-4 md:p-6 lg:p-14'>
            <h1 className='mb-5 text-2xl md:text-4xl text-secondary font-extrabold'>Assign Rider For Parcels</h1>

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
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcelsToAssign.length === 0 ?
                                <tr className='lg:text-center'>
                                    <td colSpan={10}>There are no Unassigned Parcels</td>
                                </tr>
                                :
                                parcelsToAssign.map((parcel, index) => {
                                    const { parcelDetails, senderDetails, receiverDetails } = parcel;

                                    return (
                                        <tr key={parcel._id}>
                                            <td>{index + 1}</td>
                                            <td>{parcelDetails.trackingId}</td>
                                            <td>
                                                <div>
                                                    <div className="font-bold">{senderDetails.name}</div>
                                                    <div className="text-sm opacity-70">{senderDetails.contact}</div>
                                                    <div className="text-xs">{`${senderDetails.area}, ${senderDetails.city}`}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="font-bold">{receiverDetails.name}</div>
                                                    <div className="text-sm opacity-70">{receiverDetails.contact}</div>
                                                    <div className="text-xs">{`${receiverDetails.area}, ${receiverDetails.city}`}</div>
                                                </div>
                                            </td>
                                            <td>{parcelDetails.weight}</td>
                                            <td>৳{parcelDetails.deliveryCharge}</td>
                                            <td>
                                                <div className="text-center w-fit rounded-2xl lg:rounded-4xl bg-warning px-3 py-2 text-xs capitalize">
                                                    {parcelDetails.delivery_status.replace('_', ' ')}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center w-fit rounded-2xl lg:rounded-4xl bg-success px-3 py-2 text-xs capitalize">
                                                    {parcelDetails.payment_status}
                                                </div>
                                            </td>
                                            <td>
                                                {new Date(parcelDetails.createdAt).toLocaleString()}
                                            </td>
                                            <td>
                                                {/* Trigger button */}
                                                <label
                                                    htmlFor="available_rider_modal"
                                                    className="btn h-fit py-1 btn-sm btn-primary text-secondary w-full sm:w-auto text-sm"
                                                    onClick={() => handleShowRiderList(parcel)}
                                                >
                                                    Available Riders
                                                </label>

                                                {/* Modal */}
                                                <input type="checkbox" id="available_rider_modal" className="modal-toggle" checked={isModalOpen} />
                                                <div className="modal" role='dialog'>
                                                    <div className="modal-box max-w-5xl relative">

                                                        {/* Close Button (Top Right) */}
                                                        <div className="flex justify-between items-center mb-4">
                                                            <h3 className="font-bold text-2xl text-secondary">Rider Details</h3>
                                                            <label htmlFor="available_rider_modal" className="btn btn-sm btn-circle btn-ghost" onClick={() => setIsModalOpen(false)}>
                                                                ✕
                                                            </label>
                                                        </div>

                                                        <div className="overflow-x-auto shadow rounded-lg">
                                                            <table className="table">
                                                                <thead className="bg-secondary text-white">
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Name</th>
                                                                        <th>Email</th>
                                                                        <th>Contact</th>
                                                                        <th>City</th>
                                                                        <th>Warehouse</th>
                                                                        <th>Vehicle</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        availableRiders.length === 0 ?
                                                                            <tr>
                                                                                <td className='md:text-center' colSpan={8}>No rider is available</td>
                                                                            </tr>
                                                                            :

                                                                            availableRiders?.map((rider, index) => (
                                                                                <tr key={rider._id}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{rider.riderName}</td>
                                                                                    <td>{rider.riderEmail}</td>
                                                                                    <td>{rider.riderContact}</td>
                                                                                    <td>{rider.riderCity}</td>
                                                                                    <td>{rider.riderWarehouse}</td>
                                                                                    <td>{rider.vehicleType}</td>
                                                                                    <td>
                                                                                        <button
                                                                                            className="btn btn-sm btn-success text-white"
                                                                                            onClick={() => handleAssignRider(parcel, rider)}
                                                                                        >
                                                                                            Assign
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
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

export default AssignRider;