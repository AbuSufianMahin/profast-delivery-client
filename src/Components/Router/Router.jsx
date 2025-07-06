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
import PrivateRoute from '../../routes.jsx/PrivateRoute';
import Payment from '../Pages/DashboardLayoutPages/Payment/Payment';
import PaymentHistory from '../Pages/DashboardLayoutPages/PaymentHistory/PaymentHistory';
import BeARider from '../Pages/HomeLayoutPages/BeARider/BeARider';
import ActiveRiders from '../Pages/DashboardLayoutPages/ActiveRiders/ActiveRiders';
import PendingRiders from '../Pages/DashboardLayoutPages/PendingRiders/PendingRiders';
import RejectedRides from '../Pages/DashboardLayoutPages/RejectedRiders.jsx/RejectedRides';
import MakeAdmin from '../Pages/DashboardLayoutPages/MakeAdmin/MakeAdmin';
import TrackAPackage from '../Pages/DashboardLayoutPages/TrackAPackage/TrackAPackage';
import UpdateProfile from '../Pages/DashboardLayoutPages/UpdateProfile/UpdateUser';


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
        path: '/coverage',
        Component: Coverage
      },
      {
        path: '/send-parcel',
        element:
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
      },
      {
        path: "/be-a-rider",
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
        element: <ActiveRiders></ActiveRiders>
      },
      {
        path: "pending-riders",
        element: <PendingRiders></PendingRiders>
      },
      {
        path: "rejected-riders",
        element: <RejectedRides></RejectedRides>
      },
      {
        path: "make-admin",
        element: <MakeAdmin></MakeAdmin>
      }
    ]
  }
]);