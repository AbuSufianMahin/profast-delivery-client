import React from 'react';
import { FaBoxOpen, FaGlobeAsia, FaHandshake } from 'react-icons/fa';
import { MdLocalShipping, MdPayment, MdSupportAgent } from 'react-icons/md';

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
            icon: <MdPayment className="text-4xl text-green-600" />
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
        <div className="w-11/12 md:w-10/12 mx-auto border py-10 md:py-20 rounded-4xl mb-8 md:mb-20">
            <div className='text-center text-sm md:text-md mb-6 px-5 md:w-1/2 mx-auto'>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Our Services</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='w-8/10 md:w-9/10 mx-auto'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        servicesData.map((service, index) =>
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-2xl p-8 md:p-10 text-center hover:shadow-xl transition-all flex flex-col items-center"
                            >
                                <div className="mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default OurServices;