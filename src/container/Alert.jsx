import React, { useEffect, useState } from 'react'

import { FaFilter } from "react-icons/fa6";
import { FcInfo } from "react-icons/fc";
import TableContainer from '../component/Table/TableContainer';
import TableHead from '../component/Table/TableHead';
import TableBody from '../component/Table/TableBody';
import Pagination from '../component/Pagination';
import FloatingBtn from '../component/FloatingBtn';
import MainContainer from '../component/MainContainer';

const Alert = () => {
  const [tableData , setTableData] = useState([]);
  const [page,setPage] = useState(10);
  const pageSet = [10,50,100,150,300,500];
  const [filterOption, setFilterOpion] = useState([]);

  const getTableData = () =>{
    const localData = JSON.parse(localStorage?.getItem('formateIncidentData'));

    if(localData){
      const incidentCalls = Object.groupBy(localData, place => place.type);
      setTableData(incidentCalls.Alert)
    }
    
  }

  let openCalls = 0;
  let closeCalls = 0
  const getInsigntNumbers = () =>{
    tableData.forEach((item)=>{
      if(item.status !== 'Resolved'){
        openCalls++;
      }
    })

    tableData.forEach((item)=>{
      if(item.status === 'Resolved'){
        closeCalls++;
      }
    })
    // console.log("Fixed UI update 4 times")
  }

  getInsigntNumbers();

  const filterDropDownMenu = () =>{
    const filterValue = Object.groupBy(tableData, filter =>  filter.status);
    setFilterOpion(Object.keys(filterValue));
    console.log("Options", filterOption)
  }

  const handleFilterChange = (e)=>{
    const filter = e.target.value;
    console.log(filter)
    const filterValue = Object.groupBy(tableData, newData =>  newData.status);
    setTableData(filterValue[filter])
    // console.log(filterValue[filter])
  }

  useEffect(()=>{
    getTableData();
  },[])

  
  useEffect(()=>{
    filterDropDownMenu();
    },[])
    
    return(
    <MainContainer>
      <div className='flex justify-left items-center gap-4 font-bold uppercase bg-white overflow-hidden shadow-md'>
        <p className='p-2 '>All Alert Calls</p>
        <p className='p-2 bg-yellow-600 text-white'>Total : {tableData?.length} </p>
        <p className='p-2 bg-red-600 text-white'>Open : {openCalls}</p>
        <p className='p-2 bg-green-600 text-white'>Closed: {closeCalls}</p>
        <select name="filter"
        onChange={(e) => handleFilterChange(e)}
         className='outline-none border border-red-600 cursor-grabbing text-left w-36 p-1 rounded-sm text-sm' >
          {
            filterOption.map((opt,i) =>{
              return(
                <option key={i} value={opt}>
                  {opt}
                </option>
              )
            })
          }
        </select>
      </div>
    {
      !tableData?.length > 0 ? 
      <p className='flex  justify-center items-center gap-2 mt-40 text-xl font-bold '>
        <FcInfo className='text-2xl'/>
        Upload an Excel Data to get insight and visualization.
      </p>: 
      <TableContainer>
      <TableHead/>

          {
            tableData.slice(0,page).map((dataField,index)=>{
              return(
                <TableBody
                style={ (dataField.age > 3 && dataField.status !=="Resolved" ? "bg-red-600 text-white" : ( dataField.status === "Resolved" ? "bg-green-600 text-white" : null)) }
                key={index}
                serialNumber={dataField.sl}
                ticketNo={dataField.ticketNo}
                reportedDate={dataField.Date}
                age={dataField.age}
                ageSlab={dataField.slab}
                type={dataField.type}
                userName={dataField.name}
                location={dataField.location}
                subLocation={dataField.subLocation}
                vendor={dataField.vendor}
                status={dataField.status}
                remarks={dataField.remarks}
              />
              )
            })
          }
      </TableContainer>
    }

        {
          tableData?.length ? <Pagination
          handlePage={(e)=> setPage(e.target.value)}
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
          (page > 10 && tableData?.length ) && <FloatingBtn/> 
        }
    </MainContainer>
  )
}

export default Alert