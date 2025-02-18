import { useState } from 'react'
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
import ForgotPassword from './pages/student/ForgotPassword'


function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Errorpage/>,
    children: [
      {
        path: '/',
        element: <Homepage />
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
        element: <ForgotPassword/>
      },
      {
        path: '/login/college',
        element:<CollegeLogin/>
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
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
