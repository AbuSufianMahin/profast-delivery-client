import Lottie from 'lottie-react';
import React from 'react';
import Banner from './Banner/Banner';
import HowItWorksSection from './HowItWorksSection/HowItWorksSection';
import OurServices from './OurServices.jsx/OurServices';
import ClientLogos from './ClientLogos/ClientLogos';
import BenefitsSection from './BenefitsSection/BenefitsSection';
import BeMerchantCard from './BeMerchant/BeMerchantCard';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorksSection></HowItWorksSection>
            <OurServices></OurServices>
            <ClientLogos></ClientLogos>
            <BenefitsSection></BenefitsSection>
            <BeMerchantCard></BeMerchantCard>
        </div>
    );
};

export default Home;