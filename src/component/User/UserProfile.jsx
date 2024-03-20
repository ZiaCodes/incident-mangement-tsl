import React, { useEffect, useState } from 'react'
import { MdReportProblem } from "react-icons/md";
import MainContainer from '../Wrapper/MainContainer';
import { MdVerified } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { ImOffice } from "react-icons/im";
import { FaUserSecret } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdSyncProblem } from "react-icons/md";
import { MdDangerous } from "react-icons/md";

import { ToastContainer,toast } from 'react-toastify';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { forgetPassword } from '../../apis/auth';

const findEmailByADID = (email) =>{
    let isADEmail = email.startsWith('8');
    if(isADEmail)
        return "ADID Email is not supported."
    
    return email;
}

const UserProfile = () => {
    const [user,setUser] = useState({});

    useDocumentTitle(`Profile | ${user?.name}`);

    const forgetPasswordHandle = async() =>{
        let targetEmail = findEmailByADID(user.email);
        if(targetEmail != user.email){
            return toast.error(`${targetEmail}`, {
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
        let res = await forgetPassword(targetEmail);
        if(res.error){
            return toast.error(`${res.error}`, {
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
        
        toast.success(`${res.message}`, {
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

    const changePasswordHandle = () =>{

        toast.error("Feature coming soon.", {
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


    useEffect(()=>{
        let localuser = JSON?.parse(localStorage?.getItem('userProfile'));
        if(localuser){
            setUser(localuser.user);
        }

    },[])
  return (
    <>
    <ToastContainer 
      position="bottom-right"
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
        <div className='flex justify-start items-left m-4 gap-8'>
            <div className='w-40 h-40 overflow-hidden shadow-md p-2 hover:p-4 transition-all'>
                <img src="https://avatars.githubusercontent.com/u/56580229?s=400&u=f40607e876c993708ddbb8616c25e166023c246b&v=4" alt="avatar" />
            </div>
            <div className='flex flex-col justify-start items-start'>
                <div className='flex justify-center items-center gap-2'>
                    <p className='text-2xl font-bold'>{user?.name}</p>
                    {
                        user.isVerified ? 
                        <MdVerified className='text-xl text-blue-600'/> : 
                        <MdReportProblem className='text-xl text-red-600'/>
                    }
                </div>
                <p className='font-thin text-gray-500'>{user?.gender}, {user?.age}</p>
            </div>
        </div>

        <hr className='bg-black opacity-50'/>
        <div className='flex flex-col m-4'>
            <p className='font-thin mb-4'>Basic Details</p>
            <div className='flex items-center gap-4'>
                <label htmlFor="name"><MdAttachEmail/> </label>
                <p>{user?.email}</p>
            </div>

            <div className='flex items-center gap-4'>
                <label htmlFor="name"><BiSolidContact/></label>
                <p className='capitalize'>{user?.phoneNumber}</p>
            </div>

            <div className='flex items-center gap-4'>
                <label htmlFor="name"><ImOffice/> </label>
                <p>{user?.company}</p>
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="name">
                    <FaUserSecret/>
                </label>
                <p className='capitalize'>{user?.role} (Role)</p>
            </div>
        </div>

        <hr className='bg-black opacity-50'/>

        <div className='flex flex-col m-4 gap-1'>
            <p className='font-thin mb-4'>Access Control</p>
            <div 
                onClick={changePasswordHandle}
                className='flex justify-start items-center gap-4'>
                <label htmlFor="name"><RiLockPasswordFill/> </label>
                <a className='capitalize p-0 shadow-none transition-all font-light text-xs  hover:underline hover:text-red-600 cursor-pointer' href='#'>
                    Change Password
                </a>
            </div>
            <div 
            onClick={forgetPasswordHandle}
                className='flex justify-start items-center gap-4'>
                <label htmlFor="name"><MdSyncProblem/> </label>
                <p className='p-0 shadow-none transition-all font-light text-xs  hover:underline hover:text-red-600 cursor-pointer'>
                    Forget Password
                </p>
            </div>
            <div className='flex justify-start items-center gap-4'>
                <label htmlFor="name"><MdDangerous className='text-red-600'/> </label>
                <p className='p-0 shadow-none transition-all font-light text-xs  hover:underline hover:text-red-600 cursor-pointer'>
                    Delete Account
                </p>
            </div>
        </div>

    </MainContainer> 
    </>
  )
}

export default UserProfile