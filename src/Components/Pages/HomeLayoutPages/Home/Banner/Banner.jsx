import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../../../assets/pictures/banner/banner1.png'
import bannerImg2 from '../../../../../assets/pictures/banner/banner2.png'
import bannerImg3 from '../../../../../assets/pictures/banner/banner3.png'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-8 md:my-14 shadow-md rounded-4xl overflow-hidden'>
            <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false}
                interval={4000}
            >
                <div>
                    <img src={bannerImg1}/>
                </div>
                <div>
                    <img src={bannerImg2}/>
                </div>
                <div>
                    <img src={bannerImg3}/>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;