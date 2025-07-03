import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { deleteWarningAlert, errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import { NavLink } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcelsData = [], refetch } = useQuery({
        queryKey: ['my-percels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })


    const onView = (parcel) => {
        console.log("Viewing:", parcel);

    };

    const handleDelete = (parcel) => {
        deleteWarningAlert()
            .then((result) => {
                if (result.isConfirmed) {

                    axiosSecure.delete(`/parcels/${parcel._id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                successAlert("", "Parcel has been deleted!");
                            }
                            else {
                                errorAlert();
                            }
                        })
                    refetch();
                }
            });
    };

    return (
        <div className='p-5'>
            <div className="w-full px-2 md:px-4 py-4">
                <div className="overflow-x-auto rounded-xl border border-base-200 shadow-md">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200 text-base-content text-xs md:text-sm uppercase">
                            <tr className='bg-secondary text-white'>
                                <th>#</th>
                                <th>Parcel Name</th>
                                <th>Parcel Type</th>
                                <th>Created At</th>
                                <th>Total Cost (৳)</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcelsData.length === 0 ?

                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500">
                                        No parcels found.
                                    </td>
                                </tr>
                                :

                                parcelsData.map((parcel, index) => {
                                    const { _id, parcelDetails } = parcel;
                                    const { name, type, createdAt, deliveryCharge, payment_status } = parcelDetails;
                                    return (
                                        <tr key={_id} className="text-xs md:text-sm">
                                            <th>{index + 1}</th>
                                            <td className="capitalize">{name}</td>
                                            <td className="capitalize">{type}</td>
                                            <td>{new Date(createdAt).toLocaleString()}</td>
                                            <td className="font-semibold">{deliveryCharge}</td>
                                            <td>
                                                <span
                                                    className={`badge rounded-2xl text-xs ${payment_status === "paid"
                                                        ? "badge-success"
                                                        : "badge-error"
                                                        }`}
                                                >
                                                    {payment_status}
                                                </span>
                                            </td>
                                            <td className="flex flex-col gap-1 md:gap-2">
                                                <button
                                                    onClick={() => onView(parcel)}
                                                    className="btn btn-sm btn-info px-4"
                                                >
                                                    View
                                                </button>

                                                {
                                                    payment_status !== "paid" && (
                                                        <NavLink to={`/dashboard/payment/${_id}`}>
                                                            <button
                                                                className="btn btn-sm btn-warning px-4 w-full">
                                                                Pay
                                                            </button>
                                                        </NavLink>
                                                    )
                                                }

                                                <button
                                                    onClick={() => handleDelete(parcel)}
                                                    className="btn btn-sm btn-error px-4"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyParcels;