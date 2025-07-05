import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import profileImage from "../../../../assets/pictures/image-upload-icon.png"
import { useForm } from 'react-hook-form';
import { successToast, warningToast } from '../../../../Utilities/toastify';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import useAuth from '../../../../hooks/useAuth';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import axios from 'axios';
import LoadingInfinite from '../../../Shared/Loading/LoadingInfinite';
import useAxios from '../../../../hooks/useAxios';


const RegisterPage = () => {
    const { createEmailUser, logInWithGoogle, updateUserInfo } = useAuth();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const location = useLocation();
    const from = location.state?.from || "/";

    const navigate = useNavigate();
    const axiosPublic = useAxios();

    const [userImage, setUserImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    console.log(userImage);
    const handleImageUpload = async (e) => {
        let image = e.target.files[0];
        console.log(e);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("image", image);

        const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_upload_key}`;
        console.log(image);

        const res = await axios.post(imageUploadURL, formData);
        // console.log(res.data);
        if (res.data.data.url) {
            setIsUploading(false);
            setUserImage(res.data.data.url);
            image = "";
        }
    

    }

    const formSubmit = (data) => {
        if (pass !== confirmPass) {
            warningToast("Your Passwords does not match. Enter same passwords!");
            return;
        }
        const email = data.email;
        const password = data.password;
        const displayName = data.userName;


        createEmailUser(email, password)
            .then(async () => {

                const userInfo = {
                    email,
                    displayName,
                    role: "user", //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosPublic.post('/users', userInfo);
                console.log(userRes.data);

                updateUserInfo({ displayName, photoURL: userImage })
                    .then(() => { })
                    .catch(err => {
                        errorAlert("", err.message);
                        return;
                    })

                const displayNameParts = displayName.split(' ');
                successAlert("Registration Complete", `Thank you, ${displayNameParts[displayNameParts.length - 1]}. Your Profast account has been successfully created.`)
                    .then(() => navigate(from));
                reset();
            })
            .catch((err) => {
                errorAlert("Register Failed", err.message);
            })

    }

    const handleContinueWithGoogle = () => {
        logInWithGoogle()
            .then(async (result) => {

                const user = result.user;

                const userInfo = {
                    email : user.email,
                    displayName: user.displayName,
                    role: "user", //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userResponse = await axiosPublic.post("/users", userInfo);
                console.log(userResponse.data);

                navigate(from);
                const displayNameParts = result.user.displayName.split(' ');
                successToast(`Welcome, ${displayNameParts[displayNameParts.length - 1] || "User"}!`);
            })
            .catch((err) => {
                errorAlert("", err.message);
            })
    }

    return (
        <section className=" flex items-center justify-center">
            <div className="rounded-2xl md:py-8 w-full">
                <h1 className="text-4xl font-extrabold">Create an Account</h1>
                <p className="text-secondary font-semibold mt-2">Register with Profast</p>

                <div className='flex flex-col items-center w-fit mt-5'>
                    <div className="relative">
                        <input
                            id="profile-upload"
                            type="file"
                            onChange={handleImageUpload}
                            className="hidden border-4 rounded-full border-primary"
                            accept="image/*"
                        />
                        <label htmlFor="profile-upload" className="cursor-pointer">
                            {
                                isUploading ?
                                    <div className='w-20 border-4 rounded-full border-primary object-cover'>
                                        <LoadingInfinite></LoadingInfinite>
                                    </div>
                                    :

                                    <img
                                        src={userImage || profileImage}
                                        alt="Upload"
                                        className={`border-4 rounded-full border-primary w-20 h-20 object-cover  hover:opacity-90 transition ${userImage ? "mr-6" : ""} `}
                                    />
                            }
                        </label>
                    </div>

                    {
                        userImage ?
                            <div className='flex items-center gap-3'>
                                <p className="text-green-600 text-sm">Image selected</p>
                                <button className='btn btn-sm btn-circle' onClick={() => setUserImage('')}>X</button>
                            </div>
                            :
                            <p className='text-gray-600 text-sm'>Upload Your Picture</p>
                    }
                </div>

                {/* Login Form */}
                <form className='mt-2' onSubmit={handleSubmit(formSubmit)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Name<span className='text-error text-sm -ml-2'>*</span></legend>
                        <input type="text" className="input w-full" {...register("userName", { required: true })} placeholder="Enter Your Name" />
                        {errors.userName && <p className='text-error'>Name is Required</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Email<span className='text-error text-sm -ml-2'>*</span></legend>
                        <input type="email" className="input w-full" {...register('email', { required: true })} placeholder="Enter Your Email" />
                        {errors.email && <p className='text-error'>Email is Required</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Password<span className='text-error text-sm -ml-2'>*</span></legend>
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
                        <legend className="fieldset-legend text-lg">Confirm Password<span className='text-error text-sm -ml-2'>*</span></legend>
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

                        <button type="button" className="btn btn-block" onClick={handleContinueWithGoogle}>
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