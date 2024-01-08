import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CgSpinner } from "react-icons/cg";

import { ToastContainer, toast } from 'react-toastify';
import { isValidEmail } from '../../utils/helper';

import {useAuth} from '../../hooks'

const validateUserInfo = ({email,password}) =>{

  if(!email.trim()) return {ok:false, error:'Email is missing!'}
  if(!isValidEmail(email)) return {ok:false, error:'Invalid Email'}

  if(!password.trim()) return {ok:false, error:'Password is missing!'}
  if(password.length < 8) return {ok:false, error:'Password must be 8 character long!'}

  return {ok:true}
}

const Login = () => {

  const navigate = useNavigate();
  
  const [userInfo,setUserinfo] = useState({
    email:"",
    password:""
  })

  const {handleLogin, authInfo} = useAuth();
  const {isPending,isLoggedIn} = authInfo;

  const handleChange = ({target})=>{
    const {value,name} = target;
    setUserinfo({...userInfo,[name]:value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const {ok, error} = validateUserInfo(userInfo)

    if(!ok) return console.log("error",error);
    
    handleLogin(userInfo.email, userInfo.password);
  }

  useEffect(()=>{
    if(isLoggedIn) navigate('/');
  },[isLoggedIn])

  const {email, password} = userInfo;


  return (
    <>
    <ToastContainer 
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{width:'250px',margin:'10px'}}

    />

    <form onSubmit={handleSubmit} 
        className="flex justify-center items-center h-screen flex-col">
            <h3 className='text-xl font-bold'>
                Please login to Continue
            </h3>

            <div className='flex rounded-sm shadow-md flex-col gap-8 mt-6 p-12 bg-slate-700'>
                <input 
                autoComplete='off'
                value={email}
                onChange={handleChange}
                name="email"
                placeholder='john@gmail.com'
                className='p-2 outline-none border border-green-600 rounded-sm text-black'
                />

                <input 
                autoComplete='off'
                value={password}
                onChange={handleChange}
                name="password"
                placeholder='********'
                type="password"
                id='password'
                className='p-2 outline-none border border-green-600 rounded-sm text-black'
                />
                <div className='-mt-5 flex justify-start items-center gap-1 text-gray-400'>
                <input 
                type="checkbox" 
                name="password"
                onChange={()=>{
                  let passType = document.querySelector('#password');
                  if(passType.type === 'password'){
                    passType.setAttribute('type','text');
                  }else{
                    passType.setAttribute('type','password')
                  }
                }}
                />
                <p className='text-xs font-thin'> Show Password.</p>
                </div>
            <button type='submit' disabled={isPending} className='bg-green-600 flex justify-center items-center text-white text-center p-2 rounded-sm'>
                {
                    isPending ? <CgSpinner className='animate-spin text-xl'/> : "Log In"
                }
            </button>
            </div>
    </form>

    </>
        
  )
}

export default Login