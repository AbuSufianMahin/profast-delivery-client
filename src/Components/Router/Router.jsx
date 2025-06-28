import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout';
import Home from '../Pages/Home/Home';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children : [
        {
            index: true,
            path: '/',
            Component: Home
        }
    ]
  },
]);