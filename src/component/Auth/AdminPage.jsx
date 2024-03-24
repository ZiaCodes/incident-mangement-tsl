import React from 'react'
import MainContainer from '../Wrapper/MainContainer'

import { useEffect } from 'react';
import { useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";


import useDocumentTitle from '../../hooks/useDocumentTitle';
import { createNewUser, getAllUsers } from '../../apis/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import UserList from './UserList';

const AdminPage =() =>{

    const [allUserData, setAllUserData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [user,setUser] = useState({});

    const navigate = useNavigate();
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
        // console.log(localuser)
        if(localuser){
            setUser(localuser.user);
            
            let role = localuser?.user?.role;
            if(role === 'admin'){
                return console.log("welcome to admin page")
            }else{

                toast.warning('You are not authorized!', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                return navigate('/settings',{replace:true})
            }
        }

    },[])


    return(
        <div className='flex justify-around flex-wrap gap-4 items-center'>
        <MainContainer>
        <div className='admin-page-wrapper'>
         <div className="setting-header">
          <div className="setting-logo">
            <span className="avatar-circle">
                <img src={`https://api.dicebear.com/8.x/adventurer/svg?seed=Syed`} alt="avatar" />
            </span>
                <h1 className='flex flex-col justify-center items-start'>
                <Link className='p-0 capitalize font-thin shadow-none' to={`/settings/`}>Syed Ziauddoin</Link>
                <p className=' opacity-75 font-extralight text-xs relative'>Application access : User</p>
                </h1>
            </div>
            <button className='setting-theme-btn '>
                <IoMdPersonAdd/>
            </button>
        </div> 
        <div className="setting-body">
          <div className="setting-title">
                <IoMdPersonAdd/>
                User Registration
            </div>
        <p className="setting-description">
            Fill the basic form to add a new user
        </p>
        <form className='mt-5 flex flex-col flex-wrap gap-4' onSubmit={handleRegister}>
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
            </form>
        </div>
        <div className="setting-footer">
            <button 
                className="btn-addUser-secondary"
                // onClick={handleResetDashBoard}
            >Think Again</button>
            <button 
            className="btn-addUser-primary"
            >Register</button>
        </div> 
    </div>
        </MainContainer>
        <UserList allUserData={allUserData} onClick={notifyUser}/>
        </div>

    )
}

export default AdminPage