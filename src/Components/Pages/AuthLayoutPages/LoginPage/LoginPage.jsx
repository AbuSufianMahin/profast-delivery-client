import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { errorAlert } from '../../../../Utilities/sweetAlerts';
import { successToast } from '../../../../Utilities/toastify';

const LoginPage = () => {
    const { loginEmailUser, logInWithGoogle } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const formSubmit = (data) => {
        loginEmailUser(data.email, data.password)
            .then((result) => {
                navigate('/');
                console.log(result)
                successToast(`Welcome back, ${result.user.displayName || "User"}!`);
            })
            .catch((err) => {
                errorAlert("Login failed", err.message);
            })
    }

    const handleGoogleLogin = () => {
        logInWithGoogle()
            .then((result) => {
                navigate('/');

                const displayNameParts = result.user.displayName.split(' ');
                successToast(`Welcome back, ${displayNameParts[displayNameParts.length - 1] || "User"}!`);
            })
            .catch((err) => {
                errorAlert("", err.message);
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
                        <input type="email" className="input w-full" {...register('email', { required: true })} placeholder="Enter Your Email" />
                    </fieldset>
                    {errors.email && <p className='text-error text-sm'>Email is required.</p>}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg text-bold">Password</legend>
                        <input type="text" className="input w-full" {...register('password', { required: true })} placeholder="Enter Password" />
                    </fieldset>
                    {errors.password && <p className='text-error text-sm'>Password is required.</p>}

                    <Link to={'/forgot-password'}><p className='text-secondary font-semibold hover:underline mt-2'>Forgot Password?</p></Link>

                    <div className='mt-5'>
                        <button type="submit" className="btn btn-primary w-full text-neutral-content">
                            Login
                        </button>
                        <p className='mt-2'>Don't have an account? <Link to={'/register'} className='text-secondary font-semibold hover:underline'>Register</Link></p>

                        <div className="divider">OR</div>

                        <button type="button" className="btn btn-block" onClick={handleGoogleLogin}>
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