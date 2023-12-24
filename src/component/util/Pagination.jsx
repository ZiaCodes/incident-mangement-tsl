import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleLine } from "react-icons/ri";


const Pagination = ({children,handlePage}) => {
  return (
    <div className='flex justify-center items-center gap-2 m-8'>
        <RiArrowLeftDoubleFill className='cursor-pointer opacity-30'/>
        <select 
        className='outline-none border
         border-blue-800 border-opacity-30 w-10 h-4'
         onChange={handlePage}
        >
           {children}
        </select>
        <RiArrowRightDoubleLine className='cursor-pointer opacity-30'/>
    </div>
  )
}

export default Pagination

