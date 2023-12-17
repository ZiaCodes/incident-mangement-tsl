import React from 'react'
import { CgSpinnerTwoAlt } from "react-icons/cg";
const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <CgSpinnerTwoAlt className='w-20 h-20 animate-spin '/>
    </div>
  )
}

export default Loader