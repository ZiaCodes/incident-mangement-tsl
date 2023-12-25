import React, { useEffect, useState } from 'react'
import Pagination from '../util/Pagination'
import FloatingBtn from '../util/FloatingBtn'
import TableContainer from './TableContainer'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { FcInfo } from "react-icons/fc"
import Upload from '../util/Upload'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TableLayout = () => {
  const [tableData , setTableData] = useState([]);
  const [page,setPage] = useState(10);
  const pageSet = [10,50,100,150,300,500];
  const [isloading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleSearch = ({target}) =>{
    const {value} = target;
    setSearch(value);
  }

  const getTableData = () =>{
    setIsLoading(true);
    const tableSet = [];
    const localData = JSON.parse(localStorage?.getItem('XLDATA'));

    if(localData){
      const IncidentTable = localData.Incident
      for(let i=1;i<IncidentTable?.length;i++){
        var tempObj = {
          sl: i,
          ticketNo: IncidentTable[i][0],
          Date: ExcelDateToJSDate(IncidentTable[i][1]).toDateString().split('T'),
          age: Math.round(IncidentTable[i][2]),
          slab: IncidentTable[i][3],
          serviceNowStatus: IncidentTable[i][4],
          type: IncidentTable[i][5],
          name: IncidentTable[i][6],
          ticketDetails: IncidentTable[i][7],
          ticketSummary: IncidentTable[i][8],
          workNote: IncidentTable[i][9],
          comment: IncidentTable[i][10],
          location: IncidentTable[i][11],
          subLocation: IncidentTable[i][12],
          vendor: IncidentTable[i][13],
          status: IncidentTable[i][14],
          remarks: IncidentTable[i][15],
          update: IncidentTable[i][16],
          serviceNow: IncidentTable[i][17]
        }
        tableSet.push(tempObj);
      }
      setTableData(tableSet)
      localStorage.setItem('formateIncidentData',JSON.stringify(tableSet));
      setIsClicked(!isClicked);
    }
    setIsLoading(false);
    
  }

  const countingStatus =  Object.groupBy(tableData, filter => filter.status);
  const statusArr = Object.keys(countingStatus)
  

  useEffect(()=>{
    const oldtable = JSON.parse(localStorage?.getItem('formateIncidentData'));
    if(oldtable){
      setTableData(oldtable);
    }else{
      getTableData();
    }

  },[isClicked])
  

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569)*86400*1000));
  }

  const deleteRowItem = (sl)=>{
    let newTableData = [];
    let storeData = JSON.parse(localStorage.getItem("formateIncidentData"));
    newTableData = storeData.filter(item => item.sl !== sl)
    localStorage.setItem("formateIncidentData",JSON.stringify(newTableData));
    setIsClicked(!isClicked);
    toast.success('Item removed!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const editRowItem = (data) =>{
    toast.error('Feature coming soon!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  return(
    <>
    <ToastContainer 
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{width:'250px',margin:'10px'}}

    />
    <Upload searchValue={search} method={handleSearch}/>
    <div className='flex flex-wrap justify-left items-center gap-4 font-bold uppercase ml-4'>
        <p className='p-2 bg-purple-500 text-white rounded-sm'>Total : {tableData?.length} </p>
        {
          statusArr.map((name,i) =>{
            return (
              <button key={i}
              onClick={() => {
                setSearch(name);
              }}
              id='statusType'
              className={name ==='Pending' || name==='Reopened' ? "p-2 bg-red-600 text-white cursor-pointer rounded-sm ": " rounded-sm p-2 bg-green-600 text-white cursor-pointer"}>
                {name}
              </button>
            )
          })
        }
        </div>
    {
      !tableData?.length > 0 ? 
      <div className='flex flex-wrap p-4 flex-col justify-center mt-8 items-center gap-8'>
        <p className='flex  justify-center items-center gap-2 '>
        <FcInfo className='text-xl'/>
        Upload an Excel Data to get insight and visualization.
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
      </div>: 
      <TableContainer>
      <TableHead/>

          {
             tableData.filter((dataField)=>{
              if(search === ""){
                return dataField;
              }else if(dataField.status.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.vendor.toLowerCase().trim().includes(search.toLowerCase().trim())){
                return dataField
              }else if(dataField.location.toLowerCase().trim().includes(search.toLowerCase().trim())){
                return dataField
              }else if(dataField.name.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.slab.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }
            }).slice(0,page).map((dataField,index)=>{
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
                handleDelete={() =>deleteRowItem(dataField.sl)}
                handleEdit={() =>editRowItem(dataField)} 
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
    </>
  )
}

export default TableLayout