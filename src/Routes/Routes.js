
import DashboardLayout from "../LayOut/DashboardLayout";
import Main from "../LayOut/Main";
import About from "../Pages/About/About";
import Appointment from "../Pages/Appointment/Appointment";
import AddDoctor from "../Pages/DashBoard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/DashBoard/DashBoard/AllUsers/AllUsers";
import DashBoard from "../Pages/DashBoard/DashBoard/DashBoard";
import MyAppointment from "../Pages/DashBoard/DashBoard/MyAppointment";
import ManageDoctors from "../Pages/DashBoard/ManageDoctors/ManageDoctors";

import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h1>404 nOT FOUND</h1>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>

            },
            {
                path: '/appointment',
                element: <PrivateRoute> <Appointment></Appointment></PrivateRoute>
            },
            {
                path: '/about',
                element:<About></About>
            }
           
        ]
        
    },
    {
        path: '/dashBoard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashBoard',
                element:<MyAppointment></MyAppointment>
            },
            {
                path: '/dashBoard/allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashBoard/addDoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashBoard/managedoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            }
        ]
    },
    

])

export default router