import { MdBugReport } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa6";
import { MdOutlineWatchOff } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";


const NavLinks = () => {
  return (
    <ul 
        className="flex flex-col 
        bg-white text-red  
        right-0 top-16 shadow-lg p-8
        w-60 gap-4 flex-wrap
        fixed
        "
    >
        <li className="bg-purple-600 text-white">
            <Link to='/'>
            <ImHome/>
             Home
            </Link>
        </li>
        <li className="bg-sky-600 text-white">
            <Link to='/incident'>
            <MdOutlinePendingActions/>
            Incident
            </Link>
        </li>
        <li  className="bg-yellow-600 text-white">
            <Link to='/alert'>
            <MdOutlineWatchOff/>
            Alert
            </Link>
        </li>
        <li className="bg-red-500 text-white">
            <Link to='/request'>
            <FaNetworkWired/>
             Request
            </Link>
        </li>
        <li className="bg-yellow-300 text-white">
            <Link to='/report'>
            <MdBugReport/>
             Report
            </Link>
        </li>
        <li className="bg-slate-600 text-white">
            <Link to='/settings'>
            <IoSettings/>
            Setting
            </Link>
        </li>
        
    </ul>
  )
}

export default NavLinks