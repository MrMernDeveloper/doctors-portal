import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: ` bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                // console.log(data)
                return data
            }
            catch {

            }
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handelDeleteDoctor = doctor => {
        // console.log(doctor)

        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {

                    refetch();
                    toast.success(`Doctor ${doctor.name} delete successFully`)
                }
                console.log(data)
                
        })
    }

    const closeModal = () => {
        setDeletingDoctor(null)
    }



  
    return (
        <div>
            <h3 className='text-3xl'> Manage Doctors {doctors.length} </h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                  
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {
                            doctors.map((doctor, index) => <tr
                                key={doctor._id}
                            >
                                <th>{ index +1}</th>
                                <td> <div className="avatar">
                                    <div className="w-12 h-12 rounded-full">
                                        <img src={doctor.image} alt='' />
                                    </div>
                                </div> </td>
                                <td>{doctor?.name}</td>
                                <td>{doctor?.email}</td>
                                <td>{ doctor?.specialty}</td>
                                <td>
                                    <label onClick={()=> setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs bg-red-500">Delete</label>
                                    
                                </td>
                            </tr>)
                     }
                       
                    </tbody>
                </table>
            </div>

            {
                deletingDoctor && 
                <ConfirmationModal
                        title={`Are you sure you want to delete?`}
                        message={`If you delete ${deletingDoctor.name}, It can not be undone`}
                        successAction={handelDeleteDoctor}
                        successButtonName = "Delete"
                        modalData = {deletingDoctor}
                        closeModal={closeModal}
                    >
                        
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;