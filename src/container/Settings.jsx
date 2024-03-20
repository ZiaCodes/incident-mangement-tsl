import React,{useEffect, useState} from 'react'
import MainContainer from '../component/Wrapper/MainContainer'
import { IoSettings } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoIosNavigate } from "react-icons/io";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { MdOutlineResetTv } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { FaDiceTwo } from "react-icons/fa6";
import { MdDeveloperMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Settings = () => {
    const [theme, setTheme] = useState('isLightMode');
    const [user, setUser] = useState("");
    const [isClicked , setIsClicked] = useState(false);
    const [mode,setMode] = useState(localStorage?.getItem('m_mode'));
    const [navStyle, setNavStyle] = useState(localStorage?.getItem('navigationStyle'));
    const [devMode, setDevMode] = useState('Off');
    const [isgeneralSetting, setIsgeneralSetting] = useState(false)

    const navigate = useNavigate();

    useDocumentTitle(`Setting Page | ${user?.name}`)
    
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

    const changeMMode = () =>{
        const localMode = localStorage?.getItem('m_mode');

        if(localMode === 'Incident'){
            setMode('Request');
            localStorage.setItem('m_mode','Request');
            toast.success('Mode changed to Request!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }else{
            setMode('Incident');
            localStorage.setItem('m_mode','Incident');
            toast.success('Mode changed to Incident!', {
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


    const handleNavStyle = () =>{
        
        if(navStyle === 'Menu'){
            setNavStyle('Simple');
            localStorage?.setItem('navigationStyle','Simple')
        }else{
            setNavStyle('Menu');
            localStorage?.setItem('navigationStyle','Menu')
        }
        toast.success('Navigation changed!', {
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

    const handleDevMode = () =>{
        toast.error('Feature coming soon!', {
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
        let Jwt = JSON?.parse(localStorage?.getItem('userProfile'));
        if(Jwt?.user){
            setUser(Jwt?.user);
        }
    },[]);  

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

    <div className='flex justify-center flex-col items-center gap-4'>
        <div className='w-20 h-20 overflow-hidden shadow-md rounded-full'>
            <img src="https://avatars.githubusercontent.com/u/56580229?s=400&u=f40607e876c993708ddbb8616c25e166023c246b&v=4" alt="avatar" />
        </div>
        <h1 className='flex flex-col justify-center items-center'>
        <Link className='p-0 shadow-none' to={`/settings/${user?.id}`}>{user?.name}</Link>
        </h1>
    </div>


        <div className=' select-none h-full w-full flex flex-wrap justify-center gap-4 mt-8'>
            <div className='h-auto flex flex-wrap rounded-sm shadow-md p-4 border border-slate-300'>
                
                <ul>
                    <li 
                     onClick={() => setIsgeneralSetting(!isgeneralSetting)}
                    className='p-2 rounded-md cursor-pointer flex items-center gap-3'>
                        <IoSettings/>
                        General Setting
                    </li>
                    {
                         isgeneralSetting ? 
                         <>
                            <li className='flex justify-start items-center gap-2 p-2 ml-6 rounded-md cursor-pointer'>
                                <FaUserCircle/>
                                <Link className='p-0 shadow-none capitalize font-normal' to={`/settings/${user?.id}`}>
                                    My profile
                                </Link>
                            </li>
                            {
                                user.role === 'admin' ? <li className='flex justify-start items-center gap-2 p-2 ml-6 rounded-md cursor-pointer'>
                                <IoMdPersonAdd/>
                                <Link className='p-0 shadow-none capitalize font-normal' to={`/settings/admin-page`}>
                                    Add User
                                </Link>
                            </li> : null
                            }
                         </>
                          : null
                    }
                    <hr  className='mt-2 opacity-25'/>
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3' onClick={handleDarkMode}>
                    {
                            theme === 'isLightMode' ? (<MdOutlineLightMode/>) : (
                                <MdDarkMode/>
                             )
                        }
                        App theme 
                    </li>
                    <hr  className='mt-2 opacity-25'/>
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3'
                        onClick={()=> setIsClicked(!isClicked)}>
                        <MdOutlineRoomPreferences/> Your Prefrences
                    </li>

                    {
                        isClicked ? 
                        <>
                        <li 
                            onClick={handleNavStyle}
                            className='flex justify-start items-center gap-1 p-2 ml-6 rounded-md cursor-pointer'>
                                <IoIosNavigate/> Navigation - {navStyle}
                        </li>
                        <hr className='mt-2 opacity-25'/>
                            <li className='flex justify-start items-center gap-1 p-2 ml-6 rounded-md cursor-pointer' onClick={changeMMode}>
                              <FaDiceTwo/> Mode - {mode}
                            </li>
                            <hr className='mt-2 opacity-25' />
                            <li className='flex justify-start items-center gap-1 p-2 ml-6 rounded-md cursor-pointer' onClick={handleDevMode}>
                              <MdDeveloperMode/> Dev Mode - {devMode}
                            </li>
                        </> : null
                    }
                    <hr className='mt-2 opacity-25' />
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3' onClick={handleResetDashBoard}>
                       <MdOutlineResetTv/> Reset Data
                    </li>
                    <hr className='mt-2 opacity-25' />
                    <li className='p-2 rounded-md cursor-pointer flex items-center gap-3' 
                    onClick={()=>{
                        localStorage.removeItem('userProfile');
                        window.location.reload();
                        navigate('/login');
                    }}>
                       <TbLogout/> Logout
                    </li>
                </ul>

            </div>      
        </div>

    </MainContainer>
        <p className=' mt-8 flex-wrap p-4 text-center flex justify-center items-center'>
            Incident management © 2023 from
            <a className='text-center shadow-none' target='_blank' href="https://syed.vercel.app">
                ZiaCodes
            </a>
        </p>
    </>
  )
}

export default Settings



            