import React from 'react';

import liveTrackingImg from '../../../../../assets/pictures/live-tracking.png'
import safeDeliveryImg from '../../../../../assets/pictures/safe-delivery.png'
import callCenterSupportImg from '../../../../../assets/pictures/call-center-support.png'
import BenefitCard from './BenefitCard';

const BenefitsSection = () => {
    const featuresData = [
        {
            id: 1,
            image: liveTrackingImg,
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        },
        {
            id: 2,
            image: safeDeliveryImg,
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        },
        {
            id: 3,
            image: callCenterSupportImg,
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        },
    ];


    return (
        <section className="mb-8 md:mb-20">
            <div className="w-11/12 md:w-9/12 mx-auto">
                <hr className='border-b border-dashed mb-10 md:mb-14 lg:mb-20' />
                <div className="grid gap-6">
                    {
                        featuresData.map((featureData, index) =>
                            <BenefitCard key={featureData.id} index={index} featureData={featureData}></BenefitCard>
                        )
                    }
                </div>
                <hr className='border-b border-dashed mt-10 md:mt-14 lg:mt-20' />
            </div>
        </section>
    );
};

export default BenefitsSection;