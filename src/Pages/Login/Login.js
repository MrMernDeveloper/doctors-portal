import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/useToken';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [loginError, setLoginError] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    
    const { signIn, forgetPassword } = useContext(AuthContext)
    // const [data, setData] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('')

    const [ showPass , setShowPass] = useState(false)
    

    const from = location.state?.from?.pathname || '/';
    if (token) {
        navigate(from, { replace: true });
    }

    const handelLogin = data => {

    

        // console.log(data)
        // console.log(errors)
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                setLoginUserEmail(data.email)
                // navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message)
                setLoginError(error.message)
            });
    }

    const passwordHandler = () => {
        forgetPassword(userEmail)
            .then(() => {
                toast.success('password reset email sent, please check your email.')
            })
        .catch(error=>console.error(error))
    }
    const handelEmail = (e) => {
        // console.log(e.target.value)
        setUserEmail(e.target.value)
    }
   
    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-xl font-semibold text-center'> Login</h1>
                <form onSubmit={handleSubmit(handelLogin)}>
                    
                   
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" 
                            {...register("email",
                                {
                                    required: "Email Address is required"
                                })} className="input input-bordered w-full max-w-xs" onChange={handelEmail} /> 
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                {/* previous password field */}
                    <div className="form-control w-full max-w-xs relative">
                        <label className="label"> <span className="label-text">Password </span></label>
                        <input type={showPass ? 'text' : "password"}
                            {...register("password",
                                {
                                    // required: "Password is required",
                                    minLength:{value:6, message:'Password must be 6 character '}
                                
                                })} className="input input-bordered w-full max-w-xs" /> 
                        

                        <div className="absolute right-3 top-12" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <AiFillEyeInvisible className='h-6 w-6' /> : <AiFillEye className='h-6 w-6' />}
                        </div>

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                       
                    </div> 
                    <span className="bg-transparent mr-auto block py-5 cursor-pointer" onClick={passwordHandler}> <span className="label-text">Forget Password</span></span>


                    {/* end */}
                    

                    
                    {loginError && <p className='text-red-600'>{ loginError}</p>}
                    
                    <input type="submit" className='btn btn-accent w-full'/>
                </form>
                

                <p>New to Doctor's Portal? <Link to='/signup' className='text-primary'>Create a new account</Link></p>
                <div className='divider'>OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
           </div>
        </div>
    );
};

export default Login;