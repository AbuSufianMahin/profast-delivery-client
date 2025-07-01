import Lottie from 'lottie-react';
import React from 'react';
import Banner from './Banner/Banner';
import HowItWorksSection from './HowItWorksSection/HowItWorksSection';
import OurServices from './OurServices.jsx/OurServices';
import ClientLogos from './ClientLogos/ClientLogos';
import BenefitsSection from './BenefitsSection/BenefitsSection';
import BeMerchantCard from './BeMerchant/BeMerchantCard';
import CustomerReviewSection from './CustomerReview/CustomerReviewSection';
import FAQSection from './FAQSection/FAQSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorksSection></HowItWorksSection>
            <OurServices></OurServices>
            <ClientLogos></ClientLogos>
            <BenefitsSection></BenefitsSection>
            <BeMerchantCard></BeMerchantCard>
            <CustomerReviewSection></CustomerReviewSection>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;