import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import LoadingInfinite from '../../../Shared/Loading/LoadingInfinite';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();

    const { data: parcelsToAssign = [], refetch: refetchParcelsToAssign } = useQuery({
        queryKey: ['notCollectedPaidParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?delivery_status=not_collected&payment_status=paid');
            return res.data;
        }
    })


    const [senderDetails, setSenderDetails] = useState(null);

    const { data: availableRiders = [], refetch: refetchAvailableRiders } = useQuery({
        queryKey: ["availableRiders", senderDetails],
        // enabled: !!senderDetails,
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


    const [openParcelId, setOpenParcelId] = useState(null);
    const closeModal = () => setOpenParcelId(null);

    const handleShowRiderList = (parcel) => {

        setOpenParcelId(parcel._id);
        setSenderDetails(parcel.senderDetails);
    }

    const [isAssigning, setIsAssigning] = useState(false);

    const handleAssignRider = async (parcel, rider) => {
        setIsAssigning(true);
        try {
            console.log(parcel._id);
            const res = await axiosSecure.patch(`/parcels/${parcel.trackingId}/assign-rider`, { rider });
            if (res.data.modifiedCount) {
                successAlert("Rider Assigned", "The rider has been successfully assigned to the parcel.")
            }
            setIsAssigning(false);

            refetchParcelsToAssign();
            refetchAvailableRiders();
            closeModal();
        }
        catch (error) {
            setIsAssigning(false);
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
                                            {/* <td>{parcel._id}</td> */}
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
                                                    htmlFor={`rider_modal_${parcel._id}`}
                                                    className="btn h-fit py-1 btn-sm btn-primary text-secondary w-full sm:w-auto text-sm"
                                                    onClick={() => handleShowRiderList(parcel)}
                                                >
                                                    Available Riders
                                                </label>

                                                {/* DaisyUI Modal */}
                                                <input
                                                    type="checkbox"
                                                    id={`rider_modal_${parcel._id}`}
                                                    className="modal-toggle"
                                                    checked={openParcelId === parcel._id}
                                                    readOnly
                                                />
                                                <div className="modal bg-transparent" role="dialog">
                                                    <div className="modal-box max-w-7xl relative">
                                                        {/* Header */}
                                                        <div className="flex justify-between items-center mb-4">
                                                            <h3 className="font-bold text-2xl text-secondary">Available Riders</h3>
                                                            <p>Parcel ID: {parcel._id}</p>
                                                            <label
                                                                htmlFor={`rider_modal_${parcel._id}`}
                                                                className="btn btn-sm btn-circle btn-ghost"
                                                                onClick={closeModal}
                                                            >
                                                                ✕
                                                            </label>
                                                        </div>

                                                        {/* Rider List Table */}
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
                                                                        <th className='text-center'>Parcel Assigned</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {availableRiders.length === 0 ? (
                                                                        <tr>
                                                                            <td colSpan={8} className="text-center">No rider is available</td>
                                                                        </tr>
                                                                    ) : (
                                                                        availableRiders.map((rider, i) => (
                                                                            <tr key={rider._id}>
                                                                                <td>{i + 1}</td>
                                                                                <td>{rider.riderName}</td>
                                                                                <td>{rider.riderEmail}</td>
                                                                                <td>{rider.riderContact}</td>
                                                                                <td>{rider.riderCity}</td>
                                                                                <td>{rider.riderWarehouse}</td>
                                                                                <td className='text-center'>{rider.assignedParcels ? rider.assignedParcels.length : 0}</td>
                                                                                <td>
                                                                                    <button
                                                                                        className="btn btn-sm btn-success text-white"
                                                                                        onClick={() => handleAssignRider(parcelDetails, rider)}
                                                                                    >
                                                                                        Assign {isAssigning && <span className='w-6'><LoadingInfinite></LoadingInfinite></span>}
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    )}
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