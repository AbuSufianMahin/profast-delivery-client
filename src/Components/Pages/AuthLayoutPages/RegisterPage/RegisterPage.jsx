import React from 'react';
import { Link } from 'react-router';

const RegisterPage = () => {
    return (
        <section className=" flex items-center justify-center">
            <div className="rounded-2xl p-8 w-full">
                <h1 className="text-4xl font-extrabold">Create an Account</h1>
                <p className="text-secondary font-semibold mt-2">Register with Profast</p>

                {/* Login Form */}
                <form className='mt-5'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Name</legend>
                        <input type="text" className="input w-full" placeholder="Enter Your Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Email</legend>
                        <input type="text" className="input w-full" placeholder="Enter Your Email" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Password</legend>
                        <input type="text" className="input w-full" placeholder="Enter Password" />
                    </fieldset>

                    <div className='mt-5'>
                        <button type="submit" className="btn btn-primary w-full text-neutral-content">
                            Login
                        </button>
                        <p className='mt-2'>Already have an account? <Link to={'/login'} className='text-secondary hover:underline'>Login</Link></p>

                        <div className="divider">or</div>

                        <button className="btn btn-block">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Continue with Google
                        </button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default RegisterPage;