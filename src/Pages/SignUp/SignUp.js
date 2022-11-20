import React, { useContext, useState } from 'react';
import {  useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [createdUserEmail, setCreatedUserEmail]= useState('')
    const [token] = useToken(createdUserEmail)
    if (token) {
        navigate('/')
    }

    // 


    const handelSignUp = data => {
        // console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                toast.success('user create successfully')

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                     })
                    .catch(err => console.log(err));
            
            })
            .catch(error => console.error(error))
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)    
        })
            .then(res => res.json())
            .then(data => {
                console.log('save-user', data)
                setCreatedUserEmail(email);
              
            })
    }

 
    return (
        <div>
            <div className='h-[600px] flex justify-center items-center'>
                <div className='w-96 p-7'>
                    <h1 className='text-xl font-semibold text-center'> Sign Up</h1>
                    <form onSubmit={handleSubmit(handelSignUp)} >


                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Name</span></label>
                            <input type="text"
                                {...register("name",
                                    {required: "name is required"})}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                           
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="email"
                                {...register("email",
                                {required: "email is required"})}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                            
                           
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Password </span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "password is required",
                                    minLength: { value: 6, message: 'Password must be 6 character ' },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                            
                        </div>


                        <input type="submit" className='btn btn-accent w-full' />
                    </form>
                    <p>Already Have an Account? <Link to='/login' className='text-primary'>Please Login</Link></p>
                    <div className='divider'>OR</div>
                    <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;