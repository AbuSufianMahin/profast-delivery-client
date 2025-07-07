import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();

    const navigate = useNavigate();
    
    axiosSecure.interceptors.request.use(config => {

        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;

    }, (error) => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }), (error) => {
        const status = error.status;

        if (status === 403){
            navigate('/error/forbidden')
        }
        else if (status === 401){
            logOutUser().then(() => navigate('/login'))
        }
    }

    return axiosSecure;
};

export default useAxiosSecure;