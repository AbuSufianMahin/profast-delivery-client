import React from 'react';

const OurServicesCard = ({ serviceData }) => {
    const { icon, title, description } = serviceData;
    return (
        <div className="bg-white hover:bg-[#CAEB66] transition-all duration-400 shadow-md rounded-2xl p-8 md:p-10 text-center hover:shadow-xl flex flex-col items-center">
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

export default OurServicesCard;