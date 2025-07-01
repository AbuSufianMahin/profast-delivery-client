import React from 'react';
import reviewQuote from '../../../../../assets/pictures/reviewQuote.png'
import { motion } from 'framer-motion';

const CustomerReviewCard = ({ index, userReview}) => {
    const { user_photoURL, userName, user_email, review: description } = userReview;
    return (
        <motion.div
            animate={
                {
                    y: index === 2 ? -25 : (index === 1 || index === 3) ? 0 : 25,
                }
            }
            className={`${index !== 2 ? "hidden lg:flex lg:opacity-30" : ""} shadow-md bg-neutral flex flex-col rounded-2xl p-8`}>
            <div>
                <img src={reviewQuote} />
            </div>
            <div className='flex flex-col gap-2 justify-between flex-1'>
                <p className='min-h-14'>{description}</p>
                <div className='md:flex md:items-center space-y-2 md:gap-4 pt-4 border-t border-secondary border-dashed'>
                    <img src={user_photoURL} alt={`${userName} photo`} className='w-14 rounded-full' />
                    <div>
                        <p className='text-secondary font-bold'>{userName}</p>
                        <p>{user_email}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CustomerReviewCard;