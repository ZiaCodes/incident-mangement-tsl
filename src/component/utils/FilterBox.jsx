import React from 'react'

const FilterBox = () => {
  return (
    <ul className='flex flex-col 
    bg-white text-red  
     top-16 shadow-lg p-2 left-96
    flex-wrap
    capitalize
    fixed'>
        <li className="p-2">All Incident</li>
        <li>Open Incident</li>
        <li>Resolved Incident</li>
    </ul>
  )
}

export default FilterBox