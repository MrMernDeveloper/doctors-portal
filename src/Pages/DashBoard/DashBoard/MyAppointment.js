import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyAppointment = () => {

    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`

    const {data : bookings = [],isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }

    })
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(bookings)
    return (
        <div>
            <h3 className='text-3xl my-5 text-center '>My Appointment</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
       
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {
                            bookings?.map((book, index) => <tr className="hover"
                                key={book._id}>
                                <th>{index + 1}</th>
                                <td>{book.patient ? book.patient : 'No Name'}</td>
                                <td>{book.treatment}</td>
                                <td>{book.appointmentDate}</td>
                                <td>{book.slot}</td>
                                <td>
                                    {
                                        book?.price && !book?.paid && <Link
                                        
                                            to={`/dashBoard/payment/${book._id}`}
                                        >
                                            <button className='btn btn-sm btn-primary'>Pay</button>
                                            
                                        </Link>
                                    }

                                    {
                                        book?.price && book.paid && <span className='text-primary'>Paid</span>
                                    }


                                </td>
                               
                            </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;