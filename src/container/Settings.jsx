import React,{useEffect, useState} from 'react'
import MainContainer from '../component/Wrapper/MainContainer'
import { IoSettings } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoIosNavigate } from "react-icons/io";
import { FaDiceTwo } from "react-icons/fa6";
import { MdDeveloperMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

import {  toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useTheme } from '../context';

const Settings = () => {

    const [theme, setTheme] = useState(localStorage?.getItem('theme'));
    const [user, setUser] = useState("");
    const [isClicked , setIsClicked] = useState(false);
    const [mode,setMode] = useState(localStorage?.getItem('m_mode'));
    const [navStyle, setNavStyle] = useState(localStorage?.getItem('navigationStyle'));
    const [devMode, setDevMode] = useState('Off');

    const navigate = useNavigate();
    const {toggleTheme} = useTheme();

    useDocumentTitle(`Setting Page | ${user?.name}`)
    

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

    
    return(
        <MainContainer>
        <div className='setting-wrapper'>
         <div className="setting-header">
          <div className="setting-logo">
            <span className="avatar-circle">
                <img src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt="avatar" />
            </span>
                <h1 className='flex flex-col justify-center items-center'>
                <Link className='p-0 capitalize font-thin shadow-none' to={`/settings/${user?.id}`}>{user?.name}</Link>
                <p className='-left-8 opacity-75 font-extralight text-xs relative'>{user.role}</p>
                </h1>
            </div>
            <button className='setting-theme-btn '
             onClick={() =>{
                toggleTheme();
                setTheme(localStorage?.getItem('theme'));
            }} >
                {
                    theme !== 'lightMode' ? 
                    <MdOutlineLightMode/> : <MdDarkMode/>
                }
            </button>
        </div> 
        <div className="setting-body">
          <div className="setting-title">
                <IoSettings/>
                General Setting
            </div>
        <p className="setting-description">
            Change your setting according to your prefernce.
        </p>
        <ul className="flex justify-self-end gap-2 mt-7 flex-col">
            <li className='flex justify-start items-center gap-2  cursor-pointer'>
                <FaUserCircle/>
                <Link className='p-0 shadow-none capitalize font-normal' to={`/settings/${user?.id}`}>
                    My profile
                </Link>
            </li>
            <hr className='opacity-25' />
            <li className='flex justify-start items-center gap-2 cursor-pointer'>
                <IoMdPersonAdd/>
                <Link className='p-0 shadow-none capitalize font-normal' to={`/settings/admin-page`}>
                    Add User
                </Link>
            </li> 
            <hr className='opacity-25' />
            <li 
                onClick={handleNavStyle}
                className='flex justify-start items-center gap-1 cursor-pointer'>
                    <IoIosNavigate/> Navigation style : {navStyle}
            </li>
            <hr className='opacity-25'/>
                <li className='flex justify-start items-center gap-1 cursor-pointer' onClick={changeMMode}>
                    <FaDiceTwo/>Application mode : {mode}
                </li>
                <hr className='opacity-25' />
                <li className='flex justify-start items-center gap-1 cursor-pointer' onClick={handleDevMode}>
                    <MdDeveloperMode/>Developer mode - {devMode}
                </li>

        </ul>
        </div>
        <div className="setting-footer">
            <button 
                className="btn-secondary"
                onClick={handleResetDashBoard}
            >Reset Data</button>
            <button 
                onClick={()=>{
                    localStorage.removeItem('userProfile');
                    window.location.reload();
                    navigate('/auth/login');
                }}
            className="btn-primary"
            >Logout</button>
        </div> 
    </div>
    </MainContainer>
    )

}

export default Settings



            