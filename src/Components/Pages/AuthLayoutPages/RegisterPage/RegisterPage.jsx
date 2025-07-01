import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import profileImage from "../../../../assets/pictures/image-upload-icon.png"
import { useForm } from 'react-hook-form';
import { warningToast } from '../../../../Utilities/toastify';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import useAuth from '../../../../hooks/useAuth';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';


const RegisterPage = () => {
    const { createEmailUser, updateDisplayName } = useAuth();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const navigate = useNavigate();
    const formSubmit = (data) => {
        if (pass !== confirmPass) {
            warningToast("Your Passwords does not match. Enter same passwords!");
            return;
        }
        const email = data.email;
        const password = data.password;
        const displayName = data.userName;


        createEmailUser(email, password)
            .then(() => {

                updateDisplayName({ displayName })
                    .then(() => { })
                    .catch(err => {
                        errorAlert("", err.message);
                        return;
                    })

                const displayNameParts = displayName.split(' ');
                successAlert("Registration Complete", `Thank you, ${displayNameParts[displayNameParts.length - 1]}. Your Profast account has been successfully created.`)
                    .then(() => navigate('/'));
                reset();
            })
            .catch((err) => {
                errorAlert("Register Failed", err.message);
            })

    }

    return (
        <section className=" flex items-center justify-center">
            <div className="rounded-2xl md:py-8 w-full">
                <h1 className="text-4xl font-extrabold">Create an Account</h1>
                <p className="text-secondary font-semibold mt-2">Register with Profast</p>

                <img src={profileImage} alt="" className='mt-4' />
                {/* Login Form */}
                <form className='mt-2' onSubmit={handleSubmit(formSubmit)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Name</legend>
                        <input type="text" className="input w-full" {...register("userName")} placeholder="Enter Your Name" required />

                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Email</legend>
                        <input type="email" className="input w-full" {...register('email')} placeholder="Enter Your Email" required />

                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Password</legend>
                        <label className={`input validator px-0 overflow-hidden w-full`}>
                            <input
                                type={`${showPass ? "text" : "password"}`}
                                required
                                {...register('password')}
                                placeholder="Password"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                onChange={(e) => setPass(e.target.value)}
                                className='px-3'
                            />

                            <button type='button' className='btn btn-sm btn-circle mr-3' onClick={() => setShowPass(!showPass)}>
                                {
                                    showPass ?
                                        <FaEyeSlash />
                                        :
                                        <FaRegEye />
                                }
                            </button>

                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Confirm Password</legend>
                        <label className="input px-0 overflow-hidden w-full">
                            <input
                                type={`${showConfirmPass ? "text" : "password"}`}
                                placeholder="Re-enter password"
                                className='px-3'
                                onChange={(e) => setConfirmPass(e.target.value)} />

                            <button type='button' className='btn btn-sm btn-circle mr-3' onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                {
                                    showConfirmPass ?
                                        <FaEyeSlash />
                                        :
                                        <FaRegEye />
                                }
                            </button>
                        </label>
                    </fieldset>
                    {
                        confirmPass !== pass && pass.length > 8 && <p className='text-sm text-error'>Your passwords doesn't match</p>
                    }

                    <div className='mt-5'>
                        <button type="submit" className="btn btn-primary w-full text-neutral-content">
                            Register
                        </button>
                        <p className='mt-2'>Already have an account? <Link to={'/login'} className='text-secondary font-semibold hover:underline'>Login</Link></p>

                        <div className="divider">OR</div>

                        <button type="button" className="btn btn-block">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Continue with Google
                        </button>
                    </div>
                </form>

            </div>
        </section >
    );
};

export default RegisterPage;