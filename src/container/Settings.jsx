import React,{useEffect, useState} from 'react'
import MainContainer from '../component/Wrapper/MainContainer'
import { IoSettings } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { LuRefreshCcwDot } from "react-icons/lu";
import { MdDarkMode } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { MdOutlineResetTv } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [theme, setTheme] = useState('isLightMode');
    const [user, setUser] = useState("");

    const navigate = useNavigate();
    
    const handleDarkMode = () =>{
        if(theme === 'isLightMode'){
            setTheme('isDarkMode');
            localStorage.setItem('theme','isDarkMode');
            document.documentElement.classList.remove('isLightMode')
            document.documentElement.classList.add('isDarkMode');
        }else{
            setTheme('isLightMode');
            localStorage.setItem('theme','isLightMode');
            document.documentElement.classList.remove('isDarkMode')
            document.documentElement.classList.add('isLightMode');
        }

        toast.success('Theme changed!', {
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

    const handleResetDashBoard = () =>{
        localStorage.removeItem('XLDATA');
        localStorage.removeItem('formateIncidentData');
        toast.success('Data Formated!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    

    useEffect(()=>{
        let Jwt = JSON.parse(localStorage.getItem('userProfile'));
        if(Jwt?.user){
            setUser(Jwt?.user?.name);
        }
    },[])

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
    <MainContainer>

        <div className='h-full w-full flex flex-wrap justify-center gap-4 mt-56'>
            <div className='h-auto flex flex-wrap bg-green-700 text-white rounded-sm w-auto shadow-md p-4'>
                <ul>
                    <li className='p-4 flex items-center gap-2'>Welcome <span>{user}</span></li>
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3'>
                        <IoSettings/>
                        General Setting
                    </li>
                    <hr  className='mt-2 opacity-25'/>
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3'>
                       <IoIosColorPalette/> App theme 
                    </li>
                    <hr  className='mt-2 opacity-25'/>
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3'>
                        <MdOutlineRoomPreferences/> Your Prefrences
                    </li>
                    <hr className='mt-2 opacity-25' />
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3'>
                       <MdOutlineResetTv/> Reset Data
                    </li>
                    <hr className='mt-2 opacity-25' />
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3'>
                       <TbLogout/> Logout
                    </li>
                </ul>

            </div>
                <div className='h-auto bg-green-700 text-white  rounded-sm w-auto shadow-md p-4'>
                <div className='flex justify-center flex-wrap mt-4 items-start  gap-2 '>
                        
                        {
                            theme === 'isLightMode' ? (<MdOutlineLightMode onClick={handleDarkMode} 
                            className='bg-white cursor-pointer text-black h-10 w-10 shadow-md rounded-full p-2
                             border border-blue-500 text-3xl'/>) : (
                                <MdDarkMode onClick={handleDarkMode} 
                            className='bg-white cursor-pointer text-black h-10 w-10 shadow-md rounded-full p-2
                             border border-blue-500 text-3xl'/>
                             )
                        }
                    <LuRefreshCcwDot
                        onClick={handleResetDashBoard}
                        className='bg-white text-black cursor-pointer h-10 w-10 shadow-md rounded-full p-2 border border-blue-500 text-3xl'/>

                    <TbLogout
                    onClick={()=>{
                        localStorage.removeItem('userProfile');
                        window.location.reload();
                        navigate('/login');
                    }}
                    className='bg-white text-black cursor-pointer h-10 w-10 shadow-md rounded-full p-2 border border-blue-500 text-3xl'
                    />
                </div>
            </div>
        </div>

    </MainContainer>
        <p className=' mt-8 flex-wrap p-4 text-center flex justify-center items-center'>Incident management © 2023 from<a className='text-center shadow-none' href="https://syed.vercel.app">Syed Ziauddin</a></p>
    </>
  )
}

export default Settings




            