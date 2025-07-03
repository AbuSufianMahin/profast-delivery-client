import React from 'react';

const FAQSection = () => {

    const queries = [
        {
            question: "How do I place an order?",
            answer: "Browse the menu, add items to your cart, and proceed to checkout to place your order."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept credit/debit cards, mobile payments, and cash on delivery."
        },
        {
            question: "Can I track my order?",
            answer: "Yes, you can track your order status in real-time from the 'My Orders' section."
        },
        {
            question: "What is the delivery time?",
            answer: "Delivery usually takes between 30 to 60 minutes depending on your location."
        },
        {
            question: "Can I cancel or modify my order?",
            answer: "You can cancel or modify your order within 5 minutes of placing it by contacting customer support."
        }
    ]

    return (
        <section className='w-11/12 md:w-3/5 mx-auto space-y-4 md:space-y-6 py-8'>
            <div className='text-center md:w-2/3 mx-auto space-y-4 md:space-y-6'>
                <h1 className='text-2xl md:text-3xl font-extrabold'>Frequently Asked Question (FAQ)</h1>
                <p>Find answers to the most common questions about our online delivery service, including ordering, payment, delivery times, and more.</p>
            </div>

            <div className='space-y-2'>
                {
                    queries.map((query, index) =>
                        <div key={index} className="collapse collapse-arrow bg-neutral border border-base-300">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title font-semibold">{query.question}</div>
                            <div className="collapse-content text-sm">{query.answer}</div>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default FAQSection;