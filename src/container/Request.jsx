import React from 'react'
import MainContainer from '../component/MainContainer'
import { useState } from 'react';
import TableContainer from '../component/Table/TableContainer';
import { useEffect } from 'react';
import Pagination from '../component/Pagination';
import FloatingBtn from '../component/FloatingBtn';
import TableHead from '../component/Table/TableHead'

const Request = () => {
  const [pendingData , setPendingData] = useState([]);
  const [page,setPage] = useState(10);
  const pageSet = [10,50,100,300,500];

  const pendingTicket = (data) =>{
    const pendingTickets = [];
    for(let i=0;i<data?.length;i++){
      if(data[i] !=0){
        if((data[i][10]) === 'Convert to SR'){
          pendingTickets?.push(data[i])
        }
      }
    }

    setPendingData(pendingTickets);
  }

  const getpendingData = () =>{
    const PendingTable = [];
    const localData = JSON.parse(localStorage?.getItem('XLDATA'));
    if(localData){
      PendingTable.push(localData?.Incident)
    }
    
    pendingTicket(PendingTable[0]);
  }

  useEffect(()=>{
    getpendingData();
  },[])


  // console.log(theadData)
  return (
    <>
    <MainContainer>
      <div className='flex justify-around items-center gap-10 font-bold uppercase text-white '>
        <p className='p-2 bg-yellow-600'>All Service Request Calls</p>
        <p className='p-2 bg-yellow-600'>Total : {pendingData.length}</p>
        <p className='p-2 bg-green-600'>Below 3(total) : {pendingData.length}</p>
        <p className='p-2 bg-red-600'>Above 3(Total): {0}</p>
      </div>
      <TableContainer>
        <TableHead/>
      <tbody>
          {
            pendingData?.slice(1,page)?.map((value,i)=>{
              return(
                <tr key={i} className="">
                {
                  value?.map((val,j)=>{
                    return(
                      <td key={j} className="whitespace-nowrap px-6 py-4">
                      { !isNaN(val) ? Math.round(val) : val}
                    </td>
                    )
                  })
                }
                </tr>
              )
            })
          }
      </tbody>
      </TableContainer>
    </MainContainer>

  {
    pendingData?.length ? 
    <Pagination
      handlePage={(e)=> 
      setPage(e.target.value)}
    >
      {
        pageSet.map((pageNumber,i) =>{
          return(
            <option key={i} value={pageNumber}>
              {pageNumber}
            </option>
          )
        })
      }
      </Pagination> : null
    }

  {
    (page > 10 && pendingData?.length ) && <FloatingBtn/> 
  }
</>
  
)}

export default Request