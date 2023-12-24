import React,{useState} from 'react'
import MainContainer from '../component/MainContainer'
import { IoSettings } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { LuRefreshCcwDot } from "react-icons/lu";
import { MdDarkMode } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { MdOutlineResetTv } from "react-icons/md";

const Settings = () => {
    const [theme, setTheme] = useState('isLightMode');
    const [isUniversalDashboardActive, setIsUniversalDashboardActive] = useState(true);

    const handleDarkMode = () =>{
        if(theme === 'isLightMode'){
            setTheme('isDarkMode');
            localStorage.setItem('theme','isDarkMode');
            document.documentElement.classList.remove('isLightMode')
            document.documentElement.classList.add('isDarkMode')
        }else{
            setTheme('isLightMode');
            localStorage.setItem('theme','isLightMode');
            document.documentElement.classList.remove('isDarkMode')
            document.documentElement.classList.add('isLightMode');
        }
        
    }

    const handleResetDashBoard = () =>{
        localStorage.removeItem('XLDATA');
        localStorage.removeItem('formateIncidentData');
    }
  return (
    <>
    <MainContainer>
        {/* <div className='flex justify-center items-center h-full w-full gap-4  text-xl font-bold uppercase flex-col'>
            <div className='flex gap-4'>
            <IoSettings className='text-3xl'/>
            <h1>My Setting</h1>
            </div>

                <ul className='flex flex-col justify-center items-start gap-10 bg-white shadow-md p-8 border border-blue-500'>
                    <li className='flex justify-between w-full items-center'>
                        Universal Dashboard
                        <input
                        value={isUniversalDashboardActive}
                        onChange={() => {
                            setIsUniversalDashboardActive(!isUniversalDashboardActive);
                            localStorage.setItem('isUniversalDashboardActive',isUniversalDashboardActive);
                        }}
                        className='bg-white w-6 h-6 cursor-pointer'
                        type="checkbox" 
                        name="universal-Dashboard"
                        />
                    </li>
                    <li className='flex justify-between w-full items-center '>
                        Dark Mode 
                        {
                            theme === 'isLightMode' ? (<MdOutlineLightMode onClick={handleDarkMode} 
                            className='bg-white h-10 w-10 shadow-md rounded-full p-2
                             border border-blue-500 text-3xl'/>) : (
                                <MdDarkMode onClick={handleDarkMode} 
                            className='bg-white h-10 w-10 shadow-md rounded-full p-2
                             border border-blue-500 text-3xl'/>
                             )
                        }
                    </li>
                    <li className='flex justify-between w-full items-center gap-8'>
                        Reset Dashboard
                        <LuRefreshCcwDot
                            onClick={handleResetDashBoard}
                         className='bg-white h-10 w-10 shadow-md rounded-full p-2 border border-blue-500 text-3xl'/>
                    </li>
                </ul>
        </div> */}

        <div className='h-full w-full flex flex-wrap justify-center gap-8 mt-56'>
            <div className='h-auto bg-green-700 text-white rounded-sm w-auto shadow-md p-4'>
                <ul>
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
                </ul>
            </div>
            <div className='h-72 bg-green-700 text-white  rounded-sm w-72 shadow-md p-4'>
                <h1 className='font-bold uppercase'>General Settings</h1>
                <div className='flex justify-between flex-wrap flex-col mt-4 items-start  gap-2 '>
                        <p>Universal Dash</p>
                        <input
                        value={isUniversalDashboardActive}
                        onChange={() => {
                            setIsUniversalDashboardActive(!isUniversalDashboardActive);
                            localStorage.setItem('isUniversalDashboardActive',isUniversalDashboardActive);
                        }}
                        className='bg-white w-6 h-6 cursor-pointer'
                        type="checkbox" 
                        name="universal-Dashboard"
                        />

                        <p>Switch Theme</p>
                        {
                            theme === 'isLightMode' ? (<MdOutlineLightMode onClick={handleDarkMode} 
                            className='bg-white cursor-pointer text-black h-10 w-10 shadow-md rounded-full p-2
                             border border-blue-500 text-3xl'/>) : (
                                <MdDarkMode onClick={handleDarkMode} 
                            className='bg-white cursor-pointer text-black h-10 w-10 shadow-md rounded-full p-2
                             border border-blue-500 text-3xl'/>
                             )
                        }
                        <p>Reset Data</p>
                    <LuRefreshCcwDot
                            onClick={handleResetDashBoard}
                         className='bg-white text-black cursor-pointer h-10 w-10 shadow-md rounded-full p-2 border border-blue-500 text-3xl'/>
                </div>
            </div>
        </div>

    </MainContainer>
        <p className=' mt-8 flex-wrap p-4 text-center flex justify-center items-center'>Incident management © 2023 from<a className='text-center shadow-none' href="https://syed.vercel.app">Syed Ziauddin</a></p>
    </>
  )
}

export default Settings