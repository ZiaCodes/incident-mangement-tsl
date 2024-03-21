import { FaCircleUser } from "react-icons/fa6";

import { BiSolidReport } from "react-icons/bi";
import { ImHome } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiNginxproxymanager } from "react-icons/si";
const BottomNav = () => {

    const [user,setUser] = useState({});

    useEffect(()=>{
        let localUser = JSON?.parse(localStorage?.getItem('userProfile'));
        setUser(localUser?.user);
    },[])
  return (
  <>
    <div 
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
        /> <b className="text-red-600">Incident</b>Mangement
        </p>

        {
            user ? 
                <Link className="p-0 shadow-none mr-4 text-black" to={`/settings/${user?.id}`} >
                    <img 
                        className="w-10 h-10 shadow-sm rounded-full"
                        src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt={user.name} />
                </Link> : null
        }
    </div>
    {user ? <div 
        className='fixed w-full bottom-0 p-2
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

    <Link title="fav" className="shadow-none flex justify-center items-center " to='/watchlist'>
        <FaHeart 
        className=" text-xl text-center text-red-600"
        />
    </Link>

    <Link title="setting" className="shadow-none flex justify-center items-center " to='/settings'>
        <IoSettings 
        className=" text-xl text-center  "
        />
    </Link>

    </div> : null}
    </>
  )
}

export default BottomNav

