import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Components/Router/Router.jsx'
import { RouterProvider } from 'react-router'

import 'leaflet/dist/leaflet.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// import Query

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider >
          <ToastContainer></ToastContainer>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
