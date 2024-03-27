import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

const ShortCutkeys = ({onclick}) => {
  return (
        <div>
        <div className='setting-wrapper'>
        <div className="setting-header">
            <div className='setting-logo'>
                <h1 className='flex flex-col justify-center items-start font-bold'>
                List of Shortcut keys
                <p className=' opacity-75 font-extralight text-xs relative'>Useful Key combination </p>
                </h1>
            </div>
            <IoCloseCircle onClick={onclick} className='text-3xl cursor-pointer '/>
        </div>
        <div className="setting-body">
        <p className='font-bold'>General keys</p>
        <hr className='pb-1'/>
        <ul>
            <li className='flex justify-between items-center p-1'>Serach : <code >Ctrl + k</code></li>
            <li className='flex justify-between items-center p-1'>Home :   <code >Alt + h</code></li>
            <li className='flex justify-between items-center p-1'>Report : <code >Alt + r</code></li>
            <li className='flex justify-between items-center p-1'>WatchList : <code >Alt + w</code></li>
            <li className='flex justify-between items-center p-1'>Setting : <code >Alt + s</code></li>
            <li className='flex justify-between items-center p-1'>Profile : <code >Alt + p</code></li>
        </ul>
        <br />
        <p className=' font-bold'>Advanced keys</p>
        <hr className='pb-1'/>
        <ul>
            <li className='flex justify-between items-center p-1'>
            Reset Data : <code >Alt + Ctrl + d</code>
            </li>
            <li className='flex justify-between items-center p-1'>
            Change Nav Style : <code > Ctrl + . </code> 
            </li>
            <li className='flex justify-between items-center p-1'>
            Refresh/Reload page : <code > Ctrl + R </code> 
            </li>
        </ul>
        </div>
        </div>
        </div>
  )
}

export default ShortCutkeys