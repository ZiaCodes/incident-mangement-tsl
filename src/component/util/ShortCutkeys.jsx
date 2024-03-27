import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

const commonStyle = 'flex justify-between items-center p-1'

const ShortCutkeys = ({onclick}) => {
  return (
        <div>
        <div className='setting-wrapper'>
        <div className="setting-header">
            <div className='setting-logo'>
                <h1 className='flex justify-center items-start flex-col font-bold'>
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
            <li className={commonStyle}>Serach      <code >Ctrl + k</code></li>
            <li className={commonStyle}>Home        <code >Alt + h</code></li>
            <li className={commonStyle}>Report      <code >Alt + r</code></li>
            <li className={commonStyle}>WatchList   <code >Alt + w</code></li>
            <li className={commonStyle}>Setting     <code >Alt + s</code></li>
            <li className={commonStyle}>Profile     <code >Alt + p</code></li>
        </ul>
        <br />
        <p className=' font-bold'>Advanced keys</p>
        <hr className='pb-1'/>
        <ul>
            <li className={commonStyle}>
            Reset Data  <code >Alt + Ctrl + d</code>
            </li>
            <li className={commonStyle}>
            Change Nav Style  <code > Ctrl + . </code> 
            </li>
            <li className={commonStyle}>
            Refresh/Reload page  <code > Ctrl + R </code> 
            </li>
        </ul>
        </div>
        </div>
        </div>
  )
}

export default ShortCutkeys