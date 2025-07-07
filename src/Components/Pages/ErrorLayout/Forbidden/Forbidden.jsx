
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router';

import forbiddenAnimation from "../../../../assets/animations/forbidden.json"

const Forbidden = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-red-200">
            <div className='mb-5'>
                <Lottie animationData={forbiddenAnimation} loop={false}></Lottie>
            </div>
            <div className='space-y-2'>
                <h1 className="text-4xl font-bold text-gray-800">403 - Forbidden</h1>
                <p className="text-lg max-w-lg">
                    You don't have permission to access this page. <br />Please contact support if you believe this is an error.
                </p>
                <button className="btn btn-secondary text-white" onClick={() => navigate('/')}>
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default Forbidden;