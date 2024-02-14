import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdReportProblem } from "react-icons/md";
import MainContainer from '../Wrapper/MainContainer';
import { MdVerified } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { ImOffice } from "react-icons/im";
import { FaUserSecret } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { TiUserDelete } from "react-icons/ti";

const UserProfile = () => {
    const [user,setUser] = useState({});

    const handleDeleteUser = () =>{
        console.log("handle user is pending")
    }

    const handleAddUser = () =>{
        console.log("handle User is pending")
    }

    useEffect(()=>{
        let localuser = JSON?.parse(localStorage?.getItem('userProfile'));
        if(localuser){
            setUser(localuser.user);
        }
        console.log(localuser)
    },[])
  return (
    <MainContainer>
        <div className='flex justify-start items-left m-4 gap-8'>
            <div className='w-40 h-40 overflow-hidden shadow-md p-2 hover:p-4 transition-all'>
                <img src="https://avatars.githubusercontent.com/u/56580229?s=400&u=f40607e876c993708ddbb8616c25e166023c246b&v=4" alt="avatar" />
            </div>
            <div className='flex flex-col justify-start items-start'>
                <div className='flex justify-center items-center gap-2'>
                    <p className='text-2xl font-bold'>{user.name}</p>
                    {
                        user.isVerified ? 
                        <MdVerified className='text-xl text-blue-600'/> : 
                        <MdReportProblem className='text-xl text-red-600'/>
                    }
                </div>
                <p className='font-thin text-gray-500'>{user.gender}, {user.age}</p>
            </div>
        </div>

        <hr className='bg-black opacity-50'/>
        <div className='flex flex-col m-4'>
            <p className='font-thin mb-4'>Basic Details</p>
            <div className='flex items-center gap-4'>
                <label htmlFor="name"><MdAttachEmail/> </label>
                <p>{user.email}</p>
            </div>

            <div className='flex items-center gap-4'>
                <label htmlFor="name"><BiSolidContact/></label>
                <p className='capitalize'>{user.phoneNumber}</p>
            </div>

            <div className='flex items-center gap-4'>
                <label htmlFor="name"><ImOffice/> </label>
                <p>{user.company}</p>
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="name">
                    <FaUserSecret/>
                </label>
                <p className='capitalize'>{user.role} (Role)</p>
            </div>
        </div>

        <hr className='bg-black opacity-50'/>

        {
            user.role === 'admin' ? <div className='flex m-4 gap-4'>
            <span 
            onClick={handleAddUser}
            className='flex items-center gap-2 bg-green-600 p-2 text-white rounded-sm cursor-pointer'>
                <IoMdPersonAdd/> Add a new user
            </span>
            <span 
            onClick={handleDeleteUser}
            className='flex items-center gap-2 bg-red-600 p-2 text-white rounded-sm cursor-pointer'>
                <TiUserDelete/> Delete a user
            </span>
            </div> : null
        }
        
        

    </MainContainer>
  )
}

export default UserProfile