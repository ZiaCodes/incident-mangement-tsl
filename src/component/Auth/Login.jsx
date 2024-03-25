import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../apis/auth';
import { CgSpinner } from "react-icons/cg";

import { ToastContainer, toast } from 'react-toastify';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Login = () => {

  const navigate = useNavigate();

  useDocumentTitle("Login Page | Incident Management")
  
  const [userInfo,setUserinfo] = useState({
    email:"",
    password:""
  })

  const [isPending , setIsPending] = useState(null);


  const handleChange = ({target})=>{
    const {value,name} = target;
    setUserinfo({...userInfo,[name]:value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setIsPending(true);
    const res = await signInUser(userInfo);

    console.log(res)

    if(res?.error){
      setIsPending(false);
      return toast.error(res.error, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
    }
    
    if(res?.user){
      localStorage.setItem('userProfile',JSON.stringify(res));
      toast.success("Login Successful", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setIsPending(false);
    navigate('/');
    window.location.reload();

  }

  const showPassword = () =>{
    let passType = document.querySelector('#passField');
    if(passType.type === 'password'){
      passType.type = 'text'
    }else{
      passType.type = 'password'
    }
  }

  useEffect(()=>{
    let Jwt = JSON.parse(localStorage?.getItem('userProfile'));
    if(Jwt){
        navigate('/');
    }
  },[])

  useEffect(()=>{

  },[])


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
        className="relative flex justify-center items-center h-screen flex-col">

          <div className="wallpaper">
          <header className="top-header">
          </header>
          <div>
            <div className="starsec"></div>
            <div className="starthird"></div>
            <div className="starfourth"></div>
            <div className="starfifth"></div>
          </div>
          </div>

            <div 
              className='absolute flex rounded-md shadow-xl flex-col gap-8 mt-6 p-12 bg-transparent backdrop-blur-sm'>
            <h3 className='text-xl text-center font-bold text-white'>
                Sign In
            </h3>
                <input 
                value={email}
                onChange={handleChange}
                name="email"
                placeholder='Email'
                autoComplete="off"
                className='p-2 bg-transparent outline-none border border-green-600 rounded-sm text-white'
                />

                <input 
                value={password}
                onChange={handleChange}
                name="password"
                placeholder='Password'
                type="password"
                id='passField'
                autoComplete="off"
                className='p-2 bg-transparent outline-none border border-green-600 rounded-sm text-white'
                />

                <div className='text-white font-thin text-xs flex gap-1 -mt-5'>
                <input onClick={showPassword} type='checkbox'/>
                <p>Show password.</p>
                </div>
            <button disabled={isPending} className='bg-green-600 flex justify-center items-center text-white text-center p-2 rounded-sm'>
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