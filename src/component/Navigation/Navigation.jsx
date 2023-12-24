import { SiNginxproxymanager } from "react-icons/si";
import { MdMenuOpen } from "react-icons/md";
import { MdMenu } from "react-icons/md";


import { useState } from "react";
import NavLinks from "./NavLinks";
const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handlMenu = () =>{
        setIsOpen(!isOpen);
    }
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
        Incident</b>Mangement
    </p>

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

    </nav>
    {
        isOpen ? <NavLinks/> : null
    }
    </>
  )
}

export default Navigation