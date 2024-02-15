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
import { createNewUser, getAllUsers } from '../../apis/auth';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { MdDelete } from "react-icons/md";
import { ToastContainer,toast } from 'react-toastify';

const UserProfile = () => {
    const [user,setUser] = useState({});
    const [allUserData, setAllUserData] = useState([]);
    const [isDeleteActive,setIsDeleteActive] = useState(false);

    const handleDeleteUser = () =>{
        setIsDeleteActive(!isDeleteActive);
        toast.success(`Delete Action is ${isDeleteActive ? "Off" : "On"}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }

    const handleAddUser = () =>{
        toast.error("Feature coming soon!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }

    const getAllUsersData = async() =>{
        let res = await getAllUsers();
        if(res.error) return console.log(res.error);

        let filterUser = res.filter((data) => data._id !== user.id);
        if(filterUser){
            setAllUserData(filterUser);
        }
        
    }

    const handleRegister = async(e) =>{
        e.preventDefault()
    
        const response = await createNewUser(userInfo);
        if(response.error) return console.log(response.error);

        console.log(response);
    
      }

    useEffect(()=>{
        let localuser = JSON?.parse(localStorage?.getItem('userProfile'));
        if(localuser){
            setUser(localuser.user);
        }

    },[])

    useEffect(()=>{
        getAllUsersData();
    },[user])
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
                <IoMdPersonAdd/> Create
            </span>
            <span 
            onClick={handleDeleteUser}
            className='flex items-center gap-2 bg-red-600 p-2 text-white rounded-sm cursor-pointer'>
                <TiUserDelete/> {isDeleteActive ? "Delete - Off" : "Delete - On"}
            </span>
            </div> : null
        }

    </MainContainer>

        <section className="lg:absolute top-20 right-5">
            <div class="box" id="box">
                <p className='text-center p-2'>Active Users</p>
                {
                    allUserData.length > 0 ? allUserData.map((userData) =>{
                        return(
                            <div key={userData._id} className="list">
                                <div className="imgbox">
                                    <img 
                                     src="https://avatars.githubusercontent.com/u/56580229?s=400&u=f40607e876c993708ddbb8616c25e166023c246b&v=4"
                                     alt="img"
                                    />
                                </div>
                                    <div className="content">
                                        <h2  className="rank">
                                            <small>
                                                {isDeleteActive ? <MdDelete/> : null}
                                            </small>
                                        </h2>
                                        <h4>{userData.name}</h4>
                                        <p className='supporting-text'>{userData.email}</p>
                                        <p className='supporting-text'>{userData.company}</p>
                                        <p className='supporting-text'>{userData.role}</p>
                                    </div>
                            </div>
                        )
                    }) : <div  className='flex justify-center items-center gap-2 mt-10'>
                        <CgSpinnerTwoAlt className='animate-spin text-4xl'/> Please wait ..
                        </div>
                }
            </div>
        </section>

            <form className='m-4 hidden flex lg:flex-row flex-col justify-between items-center lg:w-1/2 shadow-md border border-gray-400' onSubmit={handleRegister}>
                <div className='flex w-1/2 flex-col gap-2 p-4'>
                    <p className='text-center mb-4'>Create a New User</p>
                    <input className='p-2 outline-none bg-transparent border-b-2' placeholder='Full Name' type="text"/>
                    <input className='p-2 outline-none bg-transparent border-b-2' placeholder='Email' type="text"/>
                    <input className='p-2 outline-none bg-transparent border-b-2' placeholder='Phone Number' type="text"/>
                    <input className='p-2 outline-none bg-transparent border-b-2' placeholder='Company' type="text"/>
                    <input className='p-2 outline-none bg-transparent border-b-2' placeholder='password' type="text"/>
                    <button className='p-2 bg-green-600 text-white' type='submit'>Create</button>
                </div>
                <div className='w-1/2'>
                    <img 
                    src="https://avatars.githubusercontent.com/u/56580229?s=400&u=f40607e876c993708ddbb8616c25e166023c246b&v=4" alt="avatar" />
                </div>
            </form>
    </>


  )
}

export default UserProfile