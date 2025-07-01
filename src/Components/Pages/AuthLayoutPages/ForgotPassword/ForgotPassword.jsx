import React from 'react';
import { Link } from 'react-router';

const ForgotPassword = () => {
    return (
        <section className=" flex items-center justify-center">
            <div className="rounded-2xl md:py-8 w-full">
                <h1 className="text-4xl font-extrabold">Forgot Password</h1>
                <p className="text-secondary font-semibold mt-2">Enter your email address and we'll send you a reset link.</p>

                {/* Login Form */}
                <form className='mt-5'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Email</legend>
                        <input type="text" className="input w-full" placeholder="Enter Your Email" />
                    </fieldset>

                    <div className='mt-5'>
                        <button type="submit" className="btn btn-primary w-full text-neutral-content">
                            Login
                        </button>
                    </div>
                </form>
                <p className='mt-5'>Remember Password? <Link to={'/login'} className='text-secondary hover:underline'>Login</Link></p>
            </div>
        </section>
    );
};

export default ForgotPassword;