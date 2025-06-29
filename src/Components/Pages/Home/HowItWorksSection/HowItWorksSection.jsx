import React from 'react';
import { BiStoreAlt } from 'react-icons/bi';
import { HiOfficeBuilding } from 'react-icons/hi';
import { MdAttachMoney, MdLocalShipping } from 'react-icons/md';


const HowItWorksSection = () => {

    const cardData = [
        {
            title: "Booking Pick & Drop",
            description: "Easily schedule parcel pick-up and drop-off at your convenience.",
            icon: <MdLocalShipping className="text-4xl text-blue-600" />
        },
        {
            title: "Cash On Delivery",
            description: "Let your customers pay at the door with our cash-on-delivery option.",
            icon: <MdAttachMoney className="text-4xl text-green-600" />
        },
        {
            title: "Delivery Hub",
            description: "Connect with our network of strategically located delivery hubs.",
            icon: <BiStoreAlt className="text-4xl text-orange-500" />
        },
        {
            title: "Booking SME & Corporate",
            description: "Tailored logistics services for businesses and corporate clients.",
            icon: <HiOfficeBuilding className="text-4xl text-purple-600" />
        }
    ];
    return (
        <div className='w-11/12 md:w-9/12 mx-auto mb-8 md:mb-20'>
            <h1 className='text-2xl md:text-3xl font-extrabold'>How it Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 md:mt-6">
                {
                    cardData.map((card, index) =>
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl p-6 space-y-4 hover:shadow-xl transition"
                        >
                            <div>{card.icon}</div>
                            <h3 className="text-xl font-semibold">{card.title}</h3>
                            <p className="text-sm">{card.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default HowItWorksSection;