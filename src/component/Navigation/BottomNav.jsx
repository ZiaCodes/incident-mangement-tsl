import { MdOutlineElectricBolt } from "react-icons/md";

import { BiSolidReport } from "react-icons/bi";
import { ImHome } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiNginxproxymanager } from "react-icons/si";
import { getAllUsers } from "../../apis/auth";
const BottomNav = () => {

    const [user,setUser] = useState({});
    const [allUserData , setAllUserData] = useState([]);
    const [activeUser, setActiveUser] = useState(new Set());


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
        
        setAllUserData(res)
        setActiveUser(new Set(res));
        console.log(activeUser)
        console.log(allUserData)
        
    }

    useEffect(()=>{
        getAllUsersData();
    },[allUserData.length])



    useEffect(()=>{
        let localUser = JSON?.parse(localStorage?.getItem('userProfile'));
        setUser(localUser?.user);
    },[])
  return (
  <>
    <div 
    className='fixed w-full top-0 
    flex justify-between items-center bg-transparent backdrop-blur-3xl
    shadow-md z-50'
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
                <Link className="activeUserDashBoard" to={`/settings/${user?.id}`} >
                    {
                        allUserData.length > 0 ? 
                        allUserData?.map((usr,i) => {
                            return !activeUser?.has(usr.isOnline) ? (
                                <>
                                <div key={i} className="tooltip">
                                    <img 
                                    className="w-10 h-10 shadow-md border bg-white border-red-600 rounded-full"
                                    src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${usr.name}`} alt={user.name} 
                                    />
                                    <span className="tooltiptext">{usr.name}</span>
                                </div>
                                </>
                            ) : <></>
                        }) : <MdOutlineElectricBolt title="Loading active users" className="animate-spin text-xl text-green-600 mr-4"/>
                    }
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

