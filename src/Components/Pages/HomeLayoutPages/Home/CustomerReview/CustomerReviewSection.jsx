import React, { useEffect, useState } from 'react';
import customerTop from '../../../../../assets/pictures/customer-top.png'
import customerReviews from '../../../../../assets/data/reviews.json'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CustomerReviewCard from './CustomerReviewCard';
import { motion } from 'framer-motion';

const CustomerReviewSection = () => {
    const totalReviews = customerReviews.length;
    const [centerIndex, setCenterIndex] = useState(2);

    const handleVisibleCards = () => {
        const cards = [];
        for (let i = -2; i <= 2; i++) {
            const index = (centerIndex + i + totalReviews) % totalReviews;
            cards.push(customerReviews[index]);
        }
        return cards;
    }
    const [visibleCards, setVisibleCards] = useState(handleVisibleCards);

    const prev = () => {
        setCenterIndex((centerIndex - 1) % totalReviews);

    }
    const next = () => {
        setCenterIndex((centerIndex + 1) % totalReviews);

    }

    useEffect(() => {
        setVisibleCards(handleVisibleCards(centerIndex));
    }, [centerIndex]);

    return (
        <section className='py-8'>
            <div className='w-11/12 md:w-4/10 mx-auto text-center space-y-4'>
                <img src={customerTop} alt="" className='mx-auto' />
                <h1 className='text-2xl md:text-3xl font-extrabold'>What our customers are sayings</h1>
                <p>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            {/* cards container */}

            <div className='py-10 my-4 w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4'>
                {
                    visibleCards.map((userReview, index) => <CustomerReviewCard key={index} index={index} centerIndex={centerIndex} userReview={userReview}></CustomerReviewCard>)
                }
            </div>


            {/* pagination buttons */}
            <motion.div
                animate={{ y: -45 }}
                className="flex items-center justify-center gap-5">
                <button onClick={prev} className="btn btn-circle btn-primary text-neutral">
                    <FaArrowLeft />
                </button>
                <div className='flex justify-center gap-2'>
                    {
                        customerReviews.map((_, idx) =>
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full hover:cursor-pointer ${centerIndex === idx ? 'bg-secondary' : 'bg-gray-300'}`}
                                onClick={() => setCenterIndex(idx)}
                            ></div>
                        )
                    }
                </div>
                <button onClick={next} className="btn btn-circle btn-primary text-neutral">
                    <FaArrowRight />
                </button>
            </motion.div>


        </section >
    );
};

export default CustomerReviewSection;