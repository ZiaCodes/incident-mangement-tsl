import React, { createContext, useEffect, useState } from 'react'
import { getIsAuth, signInUser } from '../apis/auth';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: ''
}

const AuthProvider = ({children}) => {

    const [authInfo, setAuthInfo] = useState({...defaultAuthInfo});

    const handleLogin =  async(email,password) => {

        setAuthInfo({...authInfo, isPending: true})
        const {error, user}= await signInUser({email,password});

        if(error){
            toast.error(error, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            return setAuthInfo({...authInfo, isPending: false, error})

        }
        
        setAuthInfo({
            profile: {...user}, 
            isPending: false,
            isLoggedIn: true, 
            error: ''
        });

        localStorage.setItem('auth-token', user.jwtToken);
    }

    const isAuth = async() =>{
        const token = localStorage.getItem("auth-token");
        if(!token) return;

        setAuthInfo({...authInfo, isPending: true})
        const {error, user} = await getIsAuth(token);

        if(error){
            toast.error(error, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return setAuthInfo({...authInfo, isPending: false, error})
        }

        setAuthInfo({
            profile: {...user}, 
            isPending: false,
            isLoggedIn: true,
            error: ''
        });
    };

    useEffect(()=>{
        isAuth()
    },[])


  return (
    <AuthContext.Provider value={{handleLogin,authInfo}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider