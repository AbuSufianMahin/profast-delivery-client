import React from 'react';

import background1 from '../../../../../assets/pictures/be-a-merchant-bg.png'
import background2 from '../../../../../assets/pictures/location-merchant.png'

const BeMerchantCard = () => {
    return (
        <div className='w-11/12 md:w-9/12 mx-auto border p-8 md:p-20 rounded-4xl bg-secondary mb-8 md:mb-20'
            style={{
                backgroundImage: `url(${background1}), url(${background2})`,
                backgroundPosition: 'top left, right',
                backgroundRepeat: 'no-repeat, no-repeat',
                height: "60%"
            }}>
            <div className='xl:w-7/12 space-y-4 text-neutral'>
                <h1 className='text-2xl md:text-[40px] font-bold'>Merchant and Customer Satisfaction is Our First Priority</h1>
                <p className='text-sm md:text-base'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className='mt-8 flex flex-col md:flex-row gap-2'>
                    <button className='btn btn-sm md:btn-md btn-primary rounded-full text-neutral-content hover:bg-transparent hover:text-primary'>Become a Merchant</button>
                    <button className='btn btn-sm md:btn-md btn-primary btn-outline rounded-full hover:text-neutral-content'>Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchantCard;