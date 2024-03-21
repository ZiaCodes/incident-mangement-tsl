import React from 'react'
import MainContainer from '../Wrapper/MainContainer'
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { MdDelete } from "react-icons/md";
import { useEffect } from 'react';
import { useState } from 'react';
import { IoIosPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

import useDocumentTitle from '../../hooks/useDocumentTitle';
import { createNewUser, getAllUsers } from '../../apis/auth';
import { toast } from 'react-toastify';

const AdminPage = () => {
    const [allUserData, setAllUserData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [user,setUser] = useState({});
    useDocumentTitle('Admin Page')

    const [userInfo, setUserInfo] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        gender:"",
        age:"",
        company:"",
        password:""

    });

    const [AddUser,setAddUser] = useState(false);
    const [removeUser, setRemoveUser] = useState(false);

    const handleChange = ({target})=>{
        const {value,name} = target;
        setUserInfo({...userInfo,[name]:value});
      }

    

    const handleDeleteUser = () =>{
        toast.success("Feature coming soon.", {
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
        if(res.error) 
            return toast.error(`${response.error}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        
        let filterUser = res.filter((data) => data._id !== user.id);
        if(filterUser){
            setAllUserData(filterUser);
        }
        
    }

    const handleRegister = async(e) =>{
        e.preventDefault()

        setIsLoading(true);
        const response = await createNewUser(userInfo);
        if(response.error){
            setIsLoading(false);
            return toast.error(`${response.error}`, {
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
        
        setIsLoading(false);
        toast.success('User Added Successfully!', {
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

      const notifyUser = () =>{
        toast.loading('Notifying user', {
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
        getAllUsersData();
    },[isLoading,user])

    useEffect(()=>{
        let localuser = JSON?.parse(localStorage?.getItem('userProfile'));
        console.log(localuser)
        if(localuser){
            setUser(localuser.user);
        }

    },[])


  return (
    <>
    <MainContainer>
        <section className="lg:absolute top-20 right-5">
            <div className="box" id="box">
                <p className='text-center p-2'>Active Users</p>
                {
                    allUserData.length > 0 ? allUserData.map((userData) =>{
                        return(
                            <div key={userData._id} className="list">
                                <div className="imgbox">
                                    <img 
                                     src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${userData.name}`}
                                     alt="img"
                                    />
                                </div>
                                    <div className="content">
                                        <h2 
                                            onClick={notifyUser}
                                            className="rank">
                                            <small>
                                                <MdNotificationsActive/>
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

        { AddUser ?  <form 
                onSubmit={handleRegister}
            className='m-4 flex lg:flex-row flex-col justify-between items-left lg:w-1/2 shadow-md border border-gray-400'>
                <div className='flex flex-col w-full gap-2 p-4'>
                    <p className='text-center mb-4'>Create a New User</p>
                    <input 
                        value={userInfo.name}
                        onChange={handleChange}
                        className='p-2 outline-none bg-transparent border-b-2'
                        placeholder='Full Name'
                        name='name'
                        type="text"
                    />
                    <input 
                        value={userInfo.email}
                        onChange={handleChange}
                        className='p-2 outline-none bg-transparent border-b-2' 
                        placeholder='Email' 
                        name='email'
                        type="email"
                    />
                    <input
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                        className='p-2 text-left outline-none bg-transparent border-b-2'
                        placeholder='Phone Number'
                        name='phoneNumber'
                        type="text"
                    />
                    <input 
                        value={userInfo.company}
                        onChange={handleChange}
                        className='p-2 outline-none bg-transparent border-b-2' 
                        placeholder='Company' 
                        name='company'
                        type="text"
                    />
                    <input
                        value={userInfo.password}
                        onChange={handleChange}
                        className='p-2 outline-none bg-transparent border-b-2' 
                        placeholder='password' 
                        name='password'
                        type="text"
                        autoComplete='off'
                    />
                    <div className='flex justify-start items-center gap-2 mt-4'>
                        <button className='p-2 bg-green-600 text-white' >
                            {
                                isLoading ? <CgSpinnerTwoAlt className='text-center animate-spin text-2xl'/> : "Add Now"
                            }
                        </button>
                        <button 
                            onClick={() => setAddUser(!AddUser)}
                            type='button' className='p-2 bg-red-600 text-white'>
                            Close Now
                        </button>
                    </div>
                </div>
            </form> : 
            <div className='flex lg:flex-row flex-col m-4 gap-4'>
                <span 
                    onClick={() => setAddUser(!AddUser)}
                    className='cursor-pointer bg-green-600 p-2 rounded-sm text-white flex justify-center items-center gap-2'>
                    <IoIosPersonAdd className='text-2xl'/> Add User
                </span>
                <span onClick={() => setRemoveUser(!removeUser)} className='cursor-pointer bg-green-600 p-2 rounded-sm text-white flex justify-center items-center gap-2'>
                   <IoPersonRemoveSharp className='text-2xl'/> Remove User 
                </span>

                {
                  removeUser ?  
                  <div className='flex gap-2'>
                    <input 
                        className='p-2'
                        type="email" 
                        placeholder='user email' 
                    />
                    <button className='cursor-pointer bg-red-600 p-2 rounded-sm text-white flex justify-center items-center gap-2'>
                        Remove
                    </button>
                  </div> : null
                }
            </div>
            }
    </MainContainer>
    </>
  )
}

export default AdminPage