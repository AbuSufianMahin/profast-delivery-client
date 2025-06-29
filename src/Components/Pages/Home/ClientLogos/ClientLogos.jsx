import React from 'react';

import amazonLogo from "../../../../assets/pictures/brands/amazon.png"
import casioLogo from "../../../../assets/pictures/brands/casio.png"
import moonstarLogo from "../../../../assets/pictures/brands/moonstar.png"
import startPeopleLogo from "../../../../assets/pictures/brands/start-people 1.png"
import startLogo from "../../../../assets/pictures/brands/start.png"
import Marquee from 'react-fast-marquee';

const ClientLogos = () => {
    const logos = [amazonLogo, casioLogo, moonstarLogo, startPeopleLogo, startLogo]

    return (
        <section className='w-11/12 md:w-9/12 mx-auto mb-8'>
            <div className="pt-8 pb-14 md:py-20 md:rounded-4xl">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 md:mb-12">
                    We've helped thousands of sales teams
                </h2>

                <Marquee direction="right" speed={60} gradient={false} pauseOnHover={true}>
                    {
                        logos.map((logo, idx) => (
                            <div className='mx-5 md:mx-24'>
                                <img
                                key={idx}
                                src={logo}
                                alt={`logo-${idx}`}
                                className="h-4 md:h-8 w-auto"
                            />
                            </div>
                        ))
                    }
                </Marquee>
            </div>
        </section>
    );
};

export default ClientLogos;