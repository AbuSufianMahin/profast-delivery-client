import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout';
import Home from '../Pages/Home/Home';
import Coverage from '../Pages/Coverage/Coverage';

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
        }
    ]
  },
]);