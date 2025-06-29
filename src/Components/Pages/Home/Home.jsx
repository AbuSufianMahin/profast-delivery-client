import Lottie from 'lottie-react';
import React from 'react';
import Banner from './Banner/Banner';
import HowItWorksSection from './HowItWorksSection/HowItWorksSection';
import OurServices from './OurServices.jsx/OurServices';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorksSection></HowItWorksSection>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;