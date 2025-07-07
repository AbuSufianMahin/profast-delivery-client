import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaCheck, FaTimes, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import { confirmWarningAlert, errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import LoadingBars from '../../../Shared/Loading/LoadingBars';

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { isPending, data: pendingRidersData = [], refetch } = useQuery({
        queryKey: ["pendingRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        }
    });

    const handleDecision = async (rider, decision) => {

        const alertTitle = decision === "Approved" ?
            "Confirm Approval"
            :
            "Confirm Rejection"

        const alertMessage = decision === "Approved" ?
            `Are you sure you want to approve this rider?`
            :
            `Are you sure you want to reject this rider?`

        confirmWarningAlert(alertTitle, alertMessage)
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axiosSecure.patch(`/rider/${rider._id}/status`, {
                            riderEmail: rider.riderEmail,
                            status: decision
                        });
                        refetch();
                        successAlert(`Rider ${decision}`, `The rider has been ${decision === "Approved" ? "approved and added to the active list." : "rejected and removed from the pending list."}`);
                    }
                    catch (err) {
                        errorAlert("Something went wrong", err.message);
                    }
                }
            })

    }

    return (
        <div className='min-h-screen p-4 md:p-6 lg:p-14'>
            <h1 className='mb-5 text-2xl md:text-4xl text-secondary font-extrabold'>Pending Rider Requests</h1>
            <div className="overflow-x-auto shadow-md rounded-lg border border-base-300">
                <table className="table table-zebra w-full bg-neutral">
                    {/* Table Head */}
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Contact</th>
                            <th>Vehicle</th>
                            <th>City</th>
                            <th>Warehouse</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {
                            isPending ?
                                <tr>
                                    <td colSpan={9} className='text-center'>
                                        <div className='w-10 mx-auto'><LoadingBars></LoadingBars></div>
                                    </td>
                                </tr>
                                :
                                pendingRidersData.length === 0 ?
                                    <tr>
                                        <td colSpan={9} className='md:text-center py-6 md:text-lg text-gray-600'>There are no pending Rider Requests</td>
                                    </tr>

                                    :

                                    pendingRidersData?.map((rider, index) => (

                                        <tr key={rider._id.$oid || index}>
                                            <td>{index + 1}</td>
                                            <td>{rider.riderName}</td>
                                            <td>{rider.riderAge}</td>
                                            <td>{rider.riderContact}</td>
                                            <td>{rider.vehicleType}</td>
                                            <td>{rider.riderCity}</td>
                                            <td>{rider.riderWarehouse}</td>
                                            <td>
                                                <span className="badge rounded-4xl badge-warning text-white">{rider.status}</span>
                                            </td>
                                            <td>
                                                <div className="flex gap-2 justify-center">
                                                    {/* View Details Button */}
                                                    <label
                                                        htmlFor="rider_modal"
                                                        className="btn btn-sm btn-info"
                                                        title="View Rider Details"
                                                    >
                                                        <FaEye />
                                                    </label>

                                                    {/* DaisyUI Modal */}
                                                    <input type="checkbox" id="rider_modal" className="modal-toggle" />
                                                    <div className="modal px-0" role="dialog">
                                                        <div className="modal-box max-w-3xl py-10 px-14">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h3 className="font-bold text-lg text-secondary">Rider Details</h3>
                                                                <label htmlFor="rider_modal" className="btn btn-sm btn-circle btn-ghost">
                                                                    ✕
                                                                </label>
                                                            </div>

                                                            {/* Modal Body: Rider Info */}
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
                                                                {/* Rider Name */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                    <p className="text-xs text-gray-500 font-medium">Name</p>
                                                                    <p className="font-semibold text-base">{rider.riderName}</p>
                                                                </div>

                                                                {/* Age */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                    <p className="text-xs text-gray-500 font-medium">Age</p>
                                                                    <p className="font-semibold text-base">{rider.riderAge}</p>
                                                                </div>

                                                                {/* Email */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                    <p className="text-xs text-gray-500 font-medium">Email</p>
                                                                    <p className="font-semibold text-base">{rider.riderEmail}</p>
                                                                </div>

                                                                {/* Contact */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                    <p className="text-xs text-gray-500 font-medium">Contact</p>
                                                                    <p className="font-semibold text-base">{rider.riderContact}</p>
                                                                </div>

                                                                {/* NID */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                    <p className="text-xs text-gray-500 font-medium">NID</p>
                                                                    <p className="font-semibold text-base">{rider.riderNID}</p>
                                                                </div>

                                                                {/* Vehicle Type */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm capitalize">
                                                                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                                                        Vehicle Type
                                                                    </p>
                                                                    <div className='flex items-center gap-2'>
                                                                        <p className="font-semibold text-base">{rider.vehicleType}</p>
                                                                    </div>
                                                                </div>

                                                                {/* Conditional fields for 'bike' */}
                                                                {rider.vehicleType === 'bike' && (
                                                                    <>
                                                                        <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                            <p className="text-xs text-gray-500 font-medium">Vehicle Reg No</p>
                                                                            <p className="font-semibold text-base">{rider.vehicleRegNo || 'N/A'}</p>
                                                                        </div>

                                                                        <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                            <p className="text-xs text-gray-500 font-medium">Driving License</p>
                                                                            <p className="font-semibold text-base">{rider.drivingLicenseNumber || 'N/A'}</p>
                                                                        </div>
                                                                    </>
                                                                )}

                                                                {/* City */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                    <p className="text-xs text-gray-500 font-medium">City</p>
                                                                    <p className="font-semibold text-base">{rider.riderCity}</p>
                                                                </div>

                                                                {/* Warehouse */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm">
                                                                    <p className="text-xs text-gray-500 font-medium">Warehouse</p>
                                                                    <p className="font-semibold text-base">{rider.riderWarehouse}</p>
                                                                </div>

                                                                {/* Status */}
                                                                <div className="bg-base-200 rounded-lg p-3 shadow-sm col-span-1 sm:col-span-2">
                                                                    <p className="text-xs text-gray-500 font-medium">Status</p>
                                                                    <p className="badge badge-warning text-white px-4 py-2">{rider.status}</p>
                                                                </div>
                                                            </div>


                                                            {/* Modal Footer: Actions */}
                                                            <div className="modal-action">
                                                                <button
                                                                    className="btn btn-error text-white"
                                                                    onClick={() => handleDecision(rider, "Rejected")}
                                                                >
                                                                    Reject
                                                                </button>
                                                                <button
                                                                    className="btn btn-success text-white"
                                                                    onClick={() => handleDecision(rider, "Approved")}
                                                                >
                                                                    Accept
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => handleDecision(rider, "Approved")}
                                                        title="Accept rider"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-error"
                                                        onClick={() => handleDecision(rider, "Rejected")}
                                                        title="Reject rider"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingRiders;