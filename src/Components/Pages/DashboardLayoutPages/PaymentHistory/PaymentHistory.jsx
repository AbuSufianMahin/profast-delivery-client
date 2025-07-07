import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingBars from '../../../Shared/Loading/LoadingBars';

const PaymentHistory = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { isPending, data: paymentData = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })


    return (
        <div className='px-4 md:px-6 lg:px-14 md:py-8'>
            <h1 className='mb-5 text-4xl text-secondary font-extrabold'>Your Payment History</h1>
            {
                isPending ?
                    <div className='w-12 mx-auto'>
                        <LoadingBars></LoadingBars>
                    </div>
                    :
                    <div className="overflow-x-auto rounded-xl shadow-xl border border-base-200">
                        <table className="table w-full table-zebra">
                            <thead className="bg-base-200 text-base-content">
                                <tr className='bg-secondary text-neutral'>
                                    <th>#</th>
                                    {/* <th>Parcel Name</th> //You can populate this later */}
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Payer</th>
                                    <th>Paid At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4 text-gray-500">
                                            No Payment Data found.
                                        </td>
                                    </tr>
                                ) : (
                                    paymentData.map((payment, index) => (
                                        <tr key={payment._id}>
                                            <td>{index + 1}</td>
                                            <td className="break-all">{payment.transactionId}</td>
                                            <td>৳{payment.amount}</td>
                                            <td>{payment.payerName}</td>
                                            <td>{payment.paidAt}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default PaymentHistory;