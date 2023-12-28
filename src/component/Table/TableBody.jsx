import React from 'react'
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const TableBody = (props) => {
  return (
    <tbody>
        <tr className={props.style}>
            <td className="whitespace-nowrap px-2 " >
              {props.serialNumber}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.ticketNo}
            </td>
            <td className="whitespace-nowrap px-2 " >
                {props.reportedDate}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.age}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.ageSlab}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.type}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.userName}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.location}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.subLocation}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.vendor}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.status}
            </td>
            <td className="whitespace-nowrap px-2 " >
              {props.remarks}
            </td>
            <td className="whitespace-nowrap px-2  cursor-pointer" >
              <a className='shadow-none' target='_blank'
              href={`https://tatasteel.service-now.com/now/nav/ui/search/0f8b85d0c7922010099a308dc7c2606a/params/search-term/${props.ticketNo}/global-search-data-config-id/c861cea2c7022010099a308dc7c26041/back-button-label/Incident%20-%2005750836/search-context/now%2Fnav%2Fui`}>
                <FaEye className='text-orange-300 text-xl'/>
              </a>
            </td>
            <td className="whitespace-nowrap px-2  cursor-pointer" >
              <MdModeEdit 
              onClick={props.handleEdit}
              className='text-xl'/>
            </td>
            <td className="whitespace-nowrap px-2  cursor-pointer" >
              <MdDelete 
              onClick={props.handleDelete}
              className='text-xl'/>
            </td>
          </tr>
    </tbody>
  )
}

export default TableBody