import { FaCircleUser } from "react-icons/fa6";

import { BiSolidReport } from "react-icons/bi";
import { ImHome } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BottomNav = () => {

    const [user,setUser] = useState({});

    useEffect(()=>{
        let localUser = JSON?.parse(localStorage?.getItem('userProfile'));
        setUser(localUser.user);
    },[])
  return (
    <div 
    className='fixed w-full bottom-0
    grid grid-cols-4  divide-x
    light:bg-white dark:bg-black text-white backdrop-blur-3xl shadow-md z-50'
    >
    

    <Link title="Home" className="shadow-none flex justify-center items-center " to='/'>
        <ImHome 
        className=" text-xl text-center  "
        />
    </Link>

    <Link title="Report" className="shadow-none flex justify-center items-center " to='/report'>
        <BiSolidReport 
        className=" text-xl text-center  "
        />
    </Link>

    <Link title="fav" className="shadow-none flex justify-center items-center " to='/settings'>
        <FaHeart 
        className=" text-xl text-center text-red-600"
        />
    </Link>

    <Link title="setting" className="shadow-none flex justify-center items-center " to='/settings'>
        <IoSettings 
        className=" text-xl text-center  "
        />
    </Link>

    </div>
  )
}

export default BottomNav

