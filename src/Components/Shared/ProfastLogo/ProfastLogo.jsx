import React from 'react';
import logo from '../../../assets/pictures/logo.png'
import { Link } from 'react-router';

const ProfastLogo = () => {
    return (
        <Link to="/">
            <div className='flex items-end'>
                <img src={logo} alt="" className='md:mb-1' />
                <p className='text-2xl md:text-3xl -ml-4 font-extrabold'>Profast</p>
            </div>
        </Link>
    );
};

export default ProfastLogo;