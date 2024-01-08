import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { FcInfo } from "react-icons/fc"

const Instruction = (props) => {
  return (
    <div className='flex flex-wrap p-4 flex-col justify-center mt-8 items-center gap-8'>
        <p className='flex  justify-center items-center gap-2 '>
        <FcInfo className='text-xl'/>
        Upload an Excel sheet to get insight and visualization.
      </p>
      <div className='flex p-2 gap-2 flex-col flex-wrap justify-center items-left'>
        <h1 className='font-bold'>Instruction:</h1>
        <p className='flex flex-wrap gap-2'>Step-1 : Download the  
          <a 
          className='text-red-600 shadow-none m-0 p-0 lowercase' 
          href="./sample-excel-data.xlsx"
          download
          >sample Excel sheet</a>.</p>
        <p>Step-2 : Fill your own data</p>
        <p>step-3 : Upload the same Excel sheet</p>
        <p><b>Note:</b> Please keep same sheetName i.e-Incident</p>
      </div>
      <p className='text-slate-500'>--------- OR ---------</p>
      <button
      onClick={props.handleAddManually}
      className='bg-green-600 gap-2 flex justify-around items-center p-2 rounded-sm text-white hover:bg-blue-600'>
        <FaPlus className='text-xl'/> Add Manually</button>
      </div>
  )
}

export default Instruction