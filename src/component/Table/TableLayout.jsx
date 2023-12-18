import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import FloatingBtn from '../FloatingBtn'
import TableContainer from './TableContainer'
import TableHead from './TableHead'
import TableBody from './TableBody'
import Loader from '../Loader'
import { FcInfo } from "react-icons/fc";
const TableLayout = () => {
  const [tableData , setTableData] = useState([]);
  const [page,setPage] = useState(10);
  const pageSet = [10,50,100,150,300,500];
  const [isloading, setIsLoading] = useState(true)

  const getTableData = () =>{

    setIsLoading(true);
    const tableSet = [];
    const localData = JSON.parse(localStorage?.getItem('XLDATA'));

    if(localData){
      const IncidentTable = localData.Incident
      for(let i=1;i<IncidentTable?.length;i++){
        var tempObj = {
          sl: IncidentTable[i][0],
          ticketNo: IncidentTable[i][1],
          Date: ExcelDateToJSDate(IncidentTable[i][2])?.toISOString()?.split('T')[0],
          age: Math.round(IncidentTable[i][3]),
          slab: IncidentTable[i][4],
          type: IncidentTable[i][5],
          name: IncidentTable[i][6],
          location: IncidentTable[i][7],
          subLocation: IncidentTable[i][8],
          vendor: IncidentTable[i][9],
          status: IncidentTable[i][10],
          remarks: IncidentTable[i][11],
          update: IncidentTable[i][12],
          serviceNow: IncidentTable[i][13]
        }
        tableSet.push(tempObj);
      }
      setTableData(tableSet)
      localStorage.setItem('formateIncidentData',JSON.stringify(tableSet))
    }
    setIsLoading(false)
    
  }


  useEffect(()=>{
    const oldtable = JSON.parse(localStorage?.getItem('formateIncidentData'));
    if(oldtable){
      setTableData(oldtable);
    }else{
      getTableData();
    }
  },[])
  

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569)*86400*1000));
  }


  return(
    <>
    {
      !tableData?.length > 0 ? 
      <p className='flex  justify-center items-center gap-2 mt-40 text-xl font-bold '>
        <FcInfo className='text-2xl'/>
        Upload an Excel Data to get insight and visualization.
      </p>: 
      <TableContainer>
      <TableHead/>

          {
            isloading ? tableData.slice(0,page).map((dataField,index)=>{
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
            }) : <Loader/>
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
    </>
  )
}

export default TableLayout