import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey)
    const navigate = useNavigate();

    const { data: specialties , isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })
    // console.log(specialties)

    const handelAddDoctor = data => {
        // console.log(data.image[0])
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }

                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization : `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body : JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashBoard/managedoctors')
                    })
                }
        
        })
      
        
    }

    if (isLoading) {
            return <Loading></Loading>
        }

    return (
        <div className='w-96 p-7'>
            <h1 className='text-2xl font-semibold'>Add A Doctor</h1>
            <form onSubmit={handleSubmit(handelAddDoctor)} >


                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text"
                        {...register("name",
                            { required: "name is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}

                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email"
                        {...register("email",
                            { required: "email is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}


                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text"> Specialty  </span></label>
                    <select 
                        {...register('specialty')}

                        className="select input-bordered w-full max-w-xs">

                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                        
                       
                    </select>


                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="file"
                            {...register("image",
                                { required: "Photo is required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-600'>{errors.img.message}</p>}

                    </div>
                 

                </div>


                <input type="submit" className='btn btn-accent w-full block my-6' value="Add Doctor" />
            </form>
        </div>
    );
};

/**
 * Three places to store images
 * 1. third party image hosting server
 * 2. File system of your server
 * 3.  mongodb
*/

export default AddDoctor;