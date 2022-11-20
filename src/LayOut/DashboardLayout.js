import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <NavBar></NavBar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  ">
                    <Outlet></Outlet>
                  

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to='/dashBoard'>My Appointment</Link></li>
                       

                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashBoard/allUsers'>All Users </Link></li>
                                <li><Link to='/dashBoard/addDoctor'>Add Doctor</Link></li>
                                <li><Link to='/dashBoard/managedoctors'>Manage Doctors</Link></li>
                            </>
                           
                        }
                    </ul>

                </div>
            </div>
           
        </div>
    );
};

export default DashboardLayout;