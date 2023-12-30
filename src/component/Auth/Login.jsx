import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../apis/auth';
import { CgSpinner } from "react-icons/cg";

const Login = () => {

  const navigate = useNavigate();
  
  const [userInfo,setUserinfo] = useState({
    email:"",
    password:""
  })

  const [err, setErr] = useState("")
  const [isPending , setIsPending] = useState(false)


  const handleChange = ({target})=>{
    const {value,name} = target;
    setUserinfo({...userInfo,[name]:value});
  }

  const handleSubmit = async(e) =>{
    setErr(null)
    setIsPending(true);
    e.preventDefault()
    const res = await signInUser(userInfo);
    if(res.error){
        setIsPending(false);
        return setErr(res.error);
    }
    
    localStorage.setItem('userProfile',JSON.stringify(res));

    setIsPending(false);

  }

  useEffect(()=>{
    let Jwt = JSON.parse(localStorage.getItem('userProfile'));
    if(Jwt){
        navigate('/');
    }
  },[])


  const {email, password} = userInfo;
  return (
    

    <form onSubmit={handleSubmit} 
        className="flex justify-center items-center h-screen flex-col">
            <h3 className='text-xl font-bold'>
                Please login to Continue
            </h3>

            <div className='flex rounded-sm shadow-md flex-col gap-8 mt-6 p-12 bg-slate-700'>
                <input 
                value={email}
                onChange={handleChange}
                name="email"
                placeholder='john@gmail.com'
                className='p-2 outline-none border border-green-600 rounded-sm text-black'
                />

                <input 
                value={password}
                onChange={handleChange}
                name="password"
                placeholder='********'
                type="password"
                className='p-2 outline-none border border-green-600 rounded-sm text-black'
                />
            <button disabled={isPending} className='bg-green-600 flex justify-center items-center text-white text-center p-2 rounded-sm'>
                {
                    isPending ? <CgSpinner className='animate-spin text-xl'/> : "Log In"
                }
            </button>

            <h3 className='text-red-600 text-xl text-center'>
                {
                    err ? err : null
                }
            </h3>
            </div>


    </form>

        
  )
}

export default Login