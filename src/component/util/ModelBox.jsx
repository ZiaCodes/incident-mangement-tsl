import React from 'react'
import { IoCloseCircle } from "react-icons/io5";
export default function ModelBox(props) {
  return (
    <div className='fixed z-50 grid grid-cols-1 place-items-center mt-20 content-center w-screen'>
    <div 
    className=' border border-slate-400 h-auto lg:w-1/2 sm:w-96 sm:mx-8 bg-white shadow-lg rounded-sm '>
      <div className='px-2 text-white uppercase flex justify-between items-center bg-green-500 w-full h-14'>
        <p className='font-bold'><b>{props.ticketNo}</b></p>
        <IoCloseCircle 
        onClick={props.handleCancel}
        className='text-3xl cursor-pointer'/>
      </div>

      <div className=' p-4 flex flex-wrap justify-center lg:justify-start gap-2 mb-8 mt-8 '>
        <input 
        className='text-gray-400 border-red-500 mx-1 border p-2 outline-none rounded-sm w-20'
         type="number" 
         name="ticketNo" 
         onChange={props.handleChange}
         value={props.tn}
         readOnly
         placeholder='Ticekt No.'
         
         />
        <input 
        className='border-red-500 text-gray-400 mx-1 border p-2 outline-none rounded-sm w-40'
         type="text" 
         name="reportedDate"
         onChange={props.handleChange}
         value={props.date}
         readOnly
        placeholder='Reported Date'
          />
        <input 
        className='border-red-500 text-gray-400 mx-1 border p-2 outline-none rounded-sm w-12'
         type="number" 
         name="age"
          placeholder='Ticket Age'
          onChange={props.handleChange}
          readOnly
          value={props.age}
          />
        <input 
        className='border-red-500 text-gray-400 mx-1 border p-2 outline-none rounded-sm w-20'
         type="text" 
         name="ageSlab"
          placeholder='Age Slab'
          onChange={props.handleChange}
          value={props.slab}
          readOnly
          />
        <input 
        className='text-gray-400 border-red-500 mx-1 border p-2 outline-none rounded-sm w-20'
         type="text" 
         name="type"
         placeholder='Incident type' 
         onChange={props.handleChange}
         value={props.type}
         readOnly
         />
        <input 
        className='border-red-500 text-gray-400 mx-1 border p-2 outline-none rounded-sm w-40'
         type="text" 
         name="user" 
         placeholder='Affected user' 
         readOnly
         onChange={props.handleChange}
         value={props.user}
         />
        <input 
        className='border-red-500 text-gray-400 mx-1 border p-2 outline-none rounded-sm w-40'
         type="text" 
         name="location " 
         placeholder='User Location' 
         onChange={props.handleChange}
         value={props.loc}
         readOnly
         />
         <input 
        className='border-red-500 text-gray-400 mx-1 border p-2 outline-none rounded-sm w-12'
         type="text" 
         name="sub-location " 
         placeholder='User Sub-Location' 
         onChange={props.handleChange}
         value={props.subloc}
         readOnly
         />
        <input 
        className='border-red-500 text-gray-400 mx-1 border p-2 outline-none rounded-sm w-20'
         type="text" 
         name="team" 
         placeholder='Team' 
         onChange={props.handleChange}
         value={props.team}
         readOnly
         />
        <input 
       className='border-green-500 mx-1 border text-left p-2 outline-none rounded-sm w-72'
         type="text" 
         name="status" 
         placeholder='status' 
         onChange={props.handleChange}
         value={props.status}
         />
        <input 
        className='border-green-500 mx-1 border p-2 outline-none rounded-sm w-80'
         type="text" 
         name="remarks" 
         placeholder='Remarks' 
         onChange={props.handleChange}
         value={props.remarks}
         />
      </div>

      <div className='flex justify-end items-center p-4 gap-4'>
        <button
          onClick={props.handleSave}
         className='bg-green-500 p-2 text-white font-bold rounded-sm w-24'>Update</button>
        <button
          onClick={props.handleCancel}
         className='bg-red-500 p-2 text-white font-bold rounded-sm w-24'>Cancel</button>
      </div>
    </div>
    </div>
  )
}
