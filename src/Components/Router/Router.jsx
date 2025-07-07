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
import DashboardLayout from '../Layouts/DashboardLayout';
import MyParcels from '../Pages/DashboardLayoutPages/MyParcels/MyParcels';
import PrivateRoute from '../../routes/PrivateRoute';
import Payment from '../Pages/DashboardLayoutPages/Payment/Payment';
import PaymentHistory from '../Pages/DashboardLayoutPages/PaymentHistory/PaymentHistory';
import BeARider from '../Pages/HomeLayoutPages/BeARider/BeARider';
import ActiveRiders from '../Pages/DashboardLayoutPages/ActiveRiders/ActiveRiders';
import PendingRiders from '../Pages/DashboardLayoutPages/PendingRiders/PendingRiders';
import RejectedRides from '../Pages/DashboardLayoutPages/RejectedRiders.jsx/RejectedRides';
import MakeAdmin from '../Pages/DashboardLayoutPages/MakeAdmin/MakeAdmin';
import TrackAPackage from '../Pages/DashboardLayoutPages/TrackAPackage/TrackAPackage';
import UpdateProfile from '../Pages/DashboardLayoutPages/UpdateProfile/UpdateUser';

import AdminRoute from '../../routes/AdminRoute';
import ErrorLayout from '../Layouts/ErrorLayout';
import Forbidden from '../Pages/ErrorLayout/Forbidden/Forbidden';
import AssignRider from '../Pages/DashboardLayoutPages/AssignRider/AssignRider';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'coverage',
        Component: Coverage
      },
      {
        path: 'send-parcel',
        element:
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
      },
      {
        path: "be-a-rider",
        element:
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage
      },
      {
        path: "register",
        Component: RegisterPage
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword
      }
    ]
  },
  {
    path: "/dashboard",
    element:
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>,
    children: [
      {
        index: true,
        Component: MyParcels
      },
      {
        path: "my-parcels",
        Component: MyParcels
      },
      {
        path: "payment/:parcelId",
        Component: Payment
      },
      {
        path: "payment-history",
        Component: PaymentHistory
      },
      {
        path: "track-package",
        Component: TrackAPackage
      },
      {
        path: "update-profile",
        Component: UpdateProfile
      },
      {
        path: "active-riders",
        element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },
      {
        path: "pending-riders",
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path: "rejected-riders",
        element: <AdminRoute><RejectedRides></RejectedRides></AdminRoute>
      },
      {
        path: "make-admin",
        element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      },
      {
        path: "assign-rider",
        element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
      }
      
    ]
  },
  {
    path: '/error',
    Component : ErrorLayout,
    children: [
      {
        path: "forbidden",
        Component: Forbidden
      }
    ]
  }
]);