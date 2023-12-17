import React from 'react'
import { tableHead } from '../../utils/Table'

const TableHead = () => {
  return (
    <thead 
      className="border-b text-sm
      dark:border-neutral-500
      bg-blue-800 text-white capitalize"
      >
        <tr>
            {
            tableHead.map((headName) =>{
                return(
                    <th key={headName.id} 
                    scope="col" 
                    className="whitespace-nowrap
                     text-center uppercase font-bold
                     py-1 px-2 h-8 tracking-wider"
                     >
                        {headName.name}
                    </th>
                )
            })
            }
        </tr>
      </thead>
  )
}

export default TableHead