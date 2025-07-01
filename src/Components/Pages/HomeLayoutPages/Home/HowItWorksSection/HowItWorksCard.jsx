import React from 'react';

const HowItWorksCard = ({ card }) => {
    const { icon, title, description } = card;
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 hover:shadow-xl transition">
            <div>{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
    );
};

export default HowItWorksCard;