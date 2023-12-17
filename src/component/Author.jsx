import React from 'react'
import { IoHeart } from "react-icons/io5";

const Author = () => {
  return (
    <div className='bottom-0 text-center w-full flex justify-center items-center gap-2 m-2'>
    Made with 
    <IoHeart className='text-red-600'/> 
    by <b>Syed Ziauddin</b>
    </div>
  )
}

export default Author