import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { errorAlert } from '../../../../Utilities/sweetAlerts';

const LoginPage = () => {
    const { loginEmailUser, logInWithGoogle } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const navigate = useNavigate();
    const formSubmit = (data) => {
        loginEmailUser(data.email, data.password)
            .then((result) => {
                console.log(result);
                // navigate('/')
            })
            .catch((err) => {
                errorAlert("Login failed", err.message);
            })
    }

    return (
        <section className=" flex items-center justify-center">
            <div className="rounded-2xl md:py-8 w-full">
                <h1 className="text-4xl font-extrabold">Welcome Back</h1>
                <p className="text-secondary font-semibold mt-2">Login with Profast</p>

                {/* Login Form */}
                <form className='mt-5' onSubmit={handleSubmit(formSubmit)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg text-bold">Email</legend>
                        <input type="email" className="input w-full" {...register('email')} placeholder="Enter Your Email" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg text-bold">Password</legend>
                        <input type="text" className="input w-full" {...register('password')} placeholder="Enter Password" />
                    </fieldset>

                    <Link to={'/forgot-password'} className='text-secondary font-semibold hover:underline'>Forgot Password?</Link>

                    <div className='mt-5'>
                        <button type="submit" className="btn btn-primary w-full text-neutral-content">
                            Login
                        </button>
                        <p className='mt-2'>Don't have an account? <Link to={'/register'} className='text-secondary font-semibold hover:underline'>Register</Link></p>

                        <div className="divider">OR</div>

                        <button type="button" className="btn btn-block">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Continue with Google
                        </button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default LoginPage;