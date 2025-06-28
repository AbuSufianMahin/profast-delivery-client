import React from 'react';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import NavbarLinks from '../Navbar/NavbarLinks';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';

const Footer = () => {
    return (
        <section className=''>
            <footer className="w-11/12 md:w-10/12 mx-auto footer footer-horizontal footer-center px-5 py-10 md:py-20   shadow rounded-4xl">
                <aside className='md:w-9/10 lg:w-2/5'>
                    <ProfastLogo></ProfastLogo>
                    <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                </aside>
                <nav className='border-y-2 border-dashed w-7/10 md:w-9/10 lg:w-7/10'>
                    <ul className="menu md:menu-horizontal py-8">
                        <NavbarLinks></NavbarLinks>
                    </ul>
                </nav>
                <div className='flex gap-2'>
                    <Link to='https://www.facebook.com/' target='_blank'><FaFacebook size={36} className='hover:text-accent' /></Link>
                    <Link to='https://www.instagram.com/' target='_blank'><FaInstagram size={36} className='hover:text-accent' /></Link>
                    <Link to='https://www.threads.com/' target='_blank'><FaSquareThreads size={36} className='hover:text-accent' /></Link>
                </div>

            </footer>
        </section>
    );
};

export default Footer;