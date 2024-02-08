import { SiNginxproxymanager } from "react-icons/si";
import { MdMenuOpen } from "react-icons/md";
import { MdMenu } from "react-icons/md";


import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuth,setIsAuth] = useState(false);
    const [mode,setMode] = useState('Incident');

    const handlMenu = () =>{
        setIsOpen(!isOpen);
    }


    useEffect(()=>{
        let Jwt = JSON.parse(localStorage.getItem('userProfile'));
        if(Jwt){
            setIsAuth(true);
        }
      },[isAuth])

      useEffect(()=>{
        setMode(localStorage.getItem('m_mode'));
      },[])

  return (
    <>
    <nav 
    className='fixed w-full top-0 
    flex justify-between items-center
    bg-white shadow-md z-50'
    >
    <p className="m-4 flex justify-center 
    items-center gap-2 uppercase
    text-blue-800 font-bold"
    >

    <SiNginxproxymanager 
    className="text-red-600 text-3xl"
    />
    <b className="text-red-600">
        {
            mode === 'Incident' ? "Incident" : "Request"
        }</b>Mangement
    </p>

    {
        isAuth ? 
        <>
        {
        !isOpen ? 
        <MdMenu 
            className="text-4xl mr-4
            text-red-600 cursor-pointer"
            onClick={handlMenu}
        /> :
        <MdMenuOpen 
            className="text-4xl mr-4 
            text-red-600 cursor-pointer"
            onClick={handlMenu}
        />
    }
        </> : null
    }

    </nav>
    {
        isOpen ? <NavLinks/> : null
    }
    </>
  )
}

export default Navigation