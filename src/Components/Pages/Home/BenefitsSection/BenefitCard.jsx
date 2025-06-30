import React from 'react';

const BenefitCard = ({featureData}) => {
    const {image, title, description} = featureData;

    return (
        <div className="flex flex-col md:flex-row items-center rounded-2xl shadow-md p-8 gap-8 lg:pr-24 hover:shadow-lg transition bg-neutral">
            <img
                src={image}
                alt={title}
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
            <div className='hidden md:flex border border-dashed h-full'></div>
            <div className='text-center md:text-start'>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm md:text-base">{description}</p>
            </div>
        </div>
    );
};

export default BenefitCard;