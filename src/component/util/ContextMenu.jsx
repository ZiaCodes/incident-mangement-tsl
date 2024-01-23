import { IoReload } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { MdBugReport } from "react-icons/md";
import { Link } from "react-router-dom";

const ContextMenu = ({x,y,closeContextMenu,serviceNowLink,ticketNumber,openEditWindow,deleteContextTicket}) => {
  return (
    <div 
    onContextMenu={(e)=> e.preventDefault()}
    onClick={()=>closeContextMenu()}
    style={{
        top:`${y}px`,left:`${x}px`,
        position:'absolute',
        zIndex:'9999999999999'}}
    >
        <ul className='contextMenuContainer'>
        <li className='contextMenu'> 
        <span className="text-xl">#</span> {ticketNumber} 
        </li>
        <a href={serviceNowLink} target="_blank" className='contextMenu'>
                <FaEye/> Service now
        </a>
            <li onClick={openEditWindow} className='contextMenu'>
                <MdModeEdit/> Edit 
            </li>
            <li onClick={deleteContextTicket} className='contextMenu'>
                <MdDelete/> Delete
            </li>
            <hr />
            
            <Link to='/report' className='contextMenu'> 
            <MdBugReport/> Report
            </Link>
            <Link to='/settings' className='contextMenu'>
                <IoSettings/> Setting
            </Link>
            <li 
            onClick={() => window.location.reload()}
            className='contextMenu'>
                <IoReload/> Refresh
            </li>
        </ul>
    </div>
  )
}

export default ContextMenu