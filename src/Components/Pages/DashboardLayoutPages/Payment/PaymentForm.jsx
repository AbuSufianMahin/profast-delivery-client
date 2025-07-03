import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingBars from '../../../Shared/Loading/LoadingBars';
import LoadingInfinite from '../../../Shared/Loading/LoadingInfinite';
import { successAlert } from '../../../../Utilities/sweetAlerts';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();

    const { parcelId } = useParams();

    const [error, setError] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);



    const { isPending, data: parcelData = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    const { parcelDetails, senderDetails, receiverDetails } = parcelData;

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        const amount = parcelDetails.deliveryCharge;
        const amountInCents = amount * 100
        if (error) {
            setError(error.message);
            setPaymentLoading(false);
            return;
        }
        else {
            setError('');
            const res = await axiosSecure.post("/create-payment-intent", {
                amountInCents,
                parcelId
            })

            const clientSecret = res.data.clientSecret;

            // confirming payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        // Add billing details here
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setPaymentLoading(false);
            }
            else if (result.paymentIntent.status === 'succeeded') {
                setError('');
                setPaymentLoading(false);

                const paymentData = {
                    parcelId,
                    transactionId: result.paymentIntent.id,
                    amount,
                    payerName: senderDetails.name,
                    payerEmail: senderDetails.email,
                    payerContact: senderDetails.contact,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    paidAt: new Date().toISOString(),
                }

                const paymentResult = await axiosSecure.post('/payments', paymentData);
                if (paymentResult.data.insertedId) {
                    successAlert('Payment successful!', 'Your payment has been recorded.')
                        .then(() => navigate('/dashboard/my-parcels'))
                }
            }
        }
    }

    return (
        <div className='py-5 md:py-10'>

            <div className="w-11/12 md:max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-6">
                <div className='space-y-6'>
                    <h2 className="text-2xl font-extrabold text-center text-secondary">
                        Confirm Your Parcel Payment
                    </h2>
                    {
                        isPending ?
                            <div className='w-12 mx-auto flex '>
                                <LoadingBars></LoadingBars>
                            </div>
                            :
                            <div className='space-y-6'>
                                {/* Parcel Info */}
                                <div>
                                    <p className="md:text-lg font-semibold">Parcel Name</p>
                                    <p className="capitalize font-medium">{parcelDetails.name}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="md:text-lg font-semibold">Parcel Type</p>
                                        <p className="capitalize font-medium">{parcelDetails.type}</p>
                                    </div>
                                    <div>
                                        <p className="md:text-lg font-semibold">Tracking ID</p>
                                        <p className="text-xs font-mono break-all">{parcelDetails.trackingId}</p>
                                    </div>
                                    <div>
                                        <p className="md:text-lg font-semibold">Weight</p>
                                        <p>{parcelDetails.weight} kg</p>
                                    </div>
                                    <div>
                                        <p className="md:text-lg font-semibold">Delivery Charge</p>
                                        <p className="font-semibold text-accent">৳{parcelDetails.deliveryCharge}</p>
                                    </div>
                                    <div>
                                        <p className="md:text-lg font-semibold">Payment Status</p>
                                        <span
                                            className={`badge rounded-xl ${parcelDetails.payment_status === 'paid' ? 'badge-success' : 'badge-error'}`}
                                        >
                                            {parcelDetails.payment_status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="md:text-lg font-semibold">Delivery Status</p>
                                        <span className="badge badge-info rounded-xl capitalize">
                                            {parcelDetails.delivery_status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                {/* Sender and Receiver */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="md:text-lg font-semibold mb-1">Sender</h3>
                                        <p>{senderDetails.name}</p>
                                        <p className="text-sm">
                                            {senderDetails.area}, {senderDetails.city}
                                        </p>
                                        <p className="text-sm">{senderDetails.email}</p>
                                        <p className="text-sm">{senderDetails.contact}</p>
                                    </div>
                                    <div>
                                        <h3 className="md:text-lg font-semibold mb-1">Receiver</h3>
                                        <p>{receiverDetails.name}</p>
                                        <p className="text-sm">
                                            {receiverDetails.area}, {receiverDetails.city}
                                        </p>
                                        <p className="text-sm">{receiverDetails.email}</p>
                                        <p className="text-sm">{receiverDetails.contact}</p>
                                    </div>
                                </div>

                                <form onSubmit={handlePaymentSubmit} className="space-y-5">
                                    <CardElement
                                        className="bg-transparent border border-dashed p-3 rounded-md focus:outline-none"
                                    ></CardElement>
                                    <button
                                        type="submit"
                                        disabled={!stripe}
                                        className="btn btn-primary w-full font-semibold text-secondary"
                                    >
                                        Pay ৳{parcelDetails.deliveryCharge}
                                        {
                                            paymentLoading &&
                                            <div className='w-8'>
                                                <LoadingInfinite></LoadingInfinite>
                                            </div>
                                        }
                                        <div className='text-secondary'>

                                        </div>
                                    </button>

                                    {
                                        error && <p className='text-sm text-error font-bold'>{error}</p>
                                    }



                                </form>
                            </div>

                    }
                </div>
            </div>
        </div >
    );
};

export default PaymentForm;