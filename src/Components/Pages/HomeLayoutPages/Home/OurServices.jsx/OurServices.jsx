import React from 'react';
import { FaBoxOpen, FaGlobeAsia, FaHandHoldingUsd, FaHandshake } from 'react-icons/fa';
import { MdLocalShipping, MdSupportAgent } from 'react-icons/md';
import OurServicesCard from './OurServicesCard';

const OurServices = () => {
    const servicesData = [
        {
            title: "Nationwide Delivery",
            description: "We deliver your packages to every corner of the country quickly and safely.",
            icon: <MdLocalShipping className="text-4xl text-blue-600" />
        },
        {
            title: "Cash On Delivery",
            description: "Receive payments easily through our secure cash-on-delivery service.",
            icon: <FaHandHoldingUsd className="text-4xl text-green-600" />
        },
        {
            title: "Parcel Packaging",
            description: "We provide reliable packaging services to ensure your products remain intact.",
            icon: <FaBoxOpen className="text-4xl text-orange-500" />
        },
        {
            title: "Global Shipping",
            description: "Expand beyond borders with our affordable international shipping options.",
            icon: <FaGlobeAsia className="text-4xl text-teal-600" />
        },
        {
            title: "Customer Support",
            description: "Our 24/7 support team is here to assist you at any stage of the delivery.",
            icon: <MdSupportAgent className="text-4xl text-red-500" />
        },
        {
            title: "Corporate Solutions",
            description: "Customized logistics services for corporate clients and SMEs.",
            icon: <FaHandshake className="text-4xl text-purple-600" />
        }
    ];


    return (
        <div className="w-11/12 md:w-10/12 mx-auto border py-10 md:py-20 rounded-4xl mb-8 md:mb-20 bg-secondary">
            <div className='text-center text-sm md:text-md mb-6 px-5 md:w-1/2 mx-auto text-neutral'>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Our Services</h2>
                <p className='text-xs md:text-sm'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='w-8/10 md:w-9/10 mx-auto'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        servicesData.map((serviceData, index) =>
                            <OurServicesCard key={index} serviceData={serviceData}></OurServicesCard>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default OurServices;