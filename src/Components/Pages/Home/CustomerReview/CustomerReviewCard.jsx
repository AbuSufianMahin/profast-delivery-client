import React, { useState } from 'react';
import reviewQuote from '../../../../assets/pictures/reviewQuote.png'
import { motion } from 'framer-motion';

const CustomerReviewCard = ({ index, userReview }) => {
    const { user_photoURL, userName, user_email, review: description } = userReview;
    return (
        <motion.div
            animate={
                {
                    y: index === 2 ? -25 : (index === 1 || index === 3) ? 0 : 25,
                }
            }
            className={`${index !== 2 ? "opacity-50" : ""} shadow-md bg-neutral flex flex-col rounded-2xl p-8 transition-transform duration-500`}>
            <div>
                <img src={reviewQuote} />
            </div>
            <div className='flex flex-col gap-2 justify-between flex-1'>
                <p className='min-h-14'>{description}</p>
                <div className='flex items-center gap-4 pt-2 border-t border-secondary border-dashed'>
                    <img src={user_photoURL} alt={`${userName} photo`} className='w-14 rounded-full' />
                    <div className=''>
                        <p className='text-secondary font-bold'>{userName}</p>
                        <p>{user_email}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CustomerReviewCard;