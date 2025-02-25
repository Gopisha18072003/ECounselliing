import React, { useState } from 'react'
import StudentRegistration from './pages/student/Registration'
import StudentLogin from './pages/student/Login'
import CollegeLogin from './pages/college/Login'
import CollegeRegistration from './pages/college/Registration'
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/administration/Dashboard'
import RootLayout from './components/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Errorpage from './pages/Errorpage';
import DashboardPage from './pages/Dashboard';
import AdminLogin from './pages/administration/Login'
import ForgotPasswordStudent from './pages/student/ForgotPassword'
import ForgotPasswordCollege from './pages/college/ForgotPassword'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { queryClient } from './utils/queryClient';
import { fetchNotices } from './utils/http'
import AboutUs from './pages/utility/Aboutus'
import ContactUs from './pages/utility/Contactus'
import AllNotices, { noticesLoader } from './pages/utility/Notices'

function App() {

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Errorpage/>,
    children: [
      {
        path: '/',
        element: <Homepage />,
        loader: noticesLoader
      },
      {
        path: '/aboutus',
        element: <AboutUs/>
      },
      {
        path: "/notices",
        element: <AllNotices/>,
        loader: noticesLoader
      },
      {
        path: '/contactus',
        element: <ContactUs/>
      },
      {
        path: '/register/college',
        element: <CollegeRegistration />
      },
      {
        path: '/register/student',
        element: <StudentRegistration />
      },
      {
        path: '/student/forgot-password',
        element: <ForgotPasswordStudent/>
      },
      {
        path: '/login/college',
        element:<CollegeLogin/>
      },
      {
        path: '/college/forgot-password',
        element: <ForgotPasswordCollege/>
      },
      {
        path: '/login/student',
        element:<StudentLogin/>
      },
      {
        path: '/dashboard',
        element: <DashboardPage/>
      },
      {
        path: '/login/admin',
        element: <AdminLogin />
      }
    ]
  }
])
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
    </Provider>
  )
}

export default App
