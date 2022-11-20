import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const { data : users =[], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })
    // console.log(users)
    const handelMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
            // console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Make Admin Successfully')
                    refetch();
                }
        })
    }

    return (
        <div className="overflow-x-auto my-5">
            <table className="table w-full">
                
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        users.map((user, index) => <tr
                        key={user._id}>
                            <th>{ index + 1}</th>
                            <td>{ user?.name}</td>
                            <td>{ user?.email}</td>
                            <td>{user?.role !== 'admin' && <button onClick={() => handelMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button> }</td>
                            <td><button className='btn btn-xs bg-red-600'>Delete</button></td>
                        </tr>)
               }
                    
                 
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;