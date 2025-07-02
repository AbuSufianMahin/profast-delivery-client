import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout';
import Home from '../Pages/HomeLayoutPages/Home/Home';
import Coverage from '../Pages/HomeLayoutPages/Coverage/Coverage';
import AuthLayout from '../Layouts/AuthLayout';
import LoginPage from '../Pages/AuthLayoutPages/LoginPage/LoginPage';
import RegisterPage from '../Pages/AuthLayoutPages/RegisterPage/RegisterPage';
import ForgotPassword from '../Pages/AuthLayoutPages/ForgotPassword/ForgotPassword';
import SendParcel from '../Pages/HomeLayoutPages/SendParcel/SendParcel';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children : [
        {
            index: true,
            Component: Home
        },
        {
          path: '/coverage',
          Component: Coverage
        },
        {
          path: '/send-parcel',
          Component : SendParcel
        }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path:"login",
        Component: LoginPage
      },
      {
        path:"register",
        Component: RegisterPage
      },
      {
        path:"/forgot-password",
        Component: ForgotPassword
      }
    ]
  }
]);