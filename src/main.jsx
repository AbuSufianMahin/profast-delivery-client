import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Components/Router/Router.jsx'
import { RouterProvider } from 'react-router'

import 'leaflet/dist/leaflet.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <AuthProvider>
        <ToastContainer></ToastContainer>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
