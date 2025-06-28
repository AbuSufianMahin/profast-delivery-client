import React from 'react';
import logo from '../../../assets/pictures/logo.png'

const ProfastLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" className='md:mb-1'/>
            <p className='text-2xl md:text-3xl -ml-4 font-extrabold'>Profast</p>
        </div>
    );
};

export default ProfastLogo;