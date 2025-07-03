import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';

// stripe promise with test key
const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_key);

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;