import React, { useEffect, useState,useRef } from 'react'
import Pagination from '../util/Pagination'
import FloatingBtn from '../util/FloatingBtn'
import TableContainer from './TableContainer'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { FcInfo } from "react-icons/fc"
import Upload from '../util/Upload'

import { ToastContainer, toast } from 'react-toastify';
import ModelBox from '../util/ModelBox'
import { FaFilePdf } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";

import { Margin, usePDF } from "react-to-pdf";
import * as XLSX from 'xlsx';
import ContextMenu from '../util/ContextMenu';

import { useClickAway } from 'react-hook-click-away';

const TableLayout = () => {

  const [isVerified, setIsVerified] = useState(false);
  const [tableData , setTableData] = useState([]);
  const [page,setPage] = useState(10);
  const pageSet = [10,50,100,150,300,500];
  const [isloading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [EditObject, setEditObject] = useState({
    tn: "",
    date:"",
    age:"" , 
    slab:"",
    type:"" , 
    user:"",    
    loc:"",
    team:"",
    status:"",
    remarks:"",
  });

  const [contextTicket, setContextTicket] = useState("");
  const [ContextEditTicket, setContextEditTicket] = useState(EditObject);

  const initialContextMenu = {
    show: false,
    x:0,
    y:0
  }

  const [contextMenu,setContextMenu] = useState(initialContextMenu);

  const contextMenuClose = () => setContextMenu(initialContextMenu);


  const contextRef = useRef(null);

  useClickAway(contextRef, () => {
    setContextMenu(initialContextMenu);
  });

  const handleSearch = ({target}) =>{
    const {value} = target;
    setSearch(value);
  }

  const getTableData = () =>{
    setIsLoading(true);
    const tableSet = [];
    const localData = JSON.parse(localStorage?.getItem('XLDATA'));

    if(localData){
      const IncidentTable = localData;
      for(let i=1;i<IncidentTable?.length;i++){
        var tempObj = {
          ticketNo: IncidentTable[i][0],
          Date: ExcelDateToJSDate(IncidentTable[i][1]).toDateString(),
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

  const deleteRowItem = (ticketNo)=>{
    if(isVerified){
      let newTableData = [];
      let storeData = JSON.parse(localStorage.getItem("formateIncidentData"));
      newTableData = storeData.filter(item => item.ticketNo !== ticketNo)
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
    }else{
      toast.error('You do not have permission to delete', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  const editRowItem = (data) =>{
    if(isVerified){
      setIsOpen(true);

    setEditObject({
      tn: data.ticketNo,
      date:data.Date,
      age:data.age,
      slab:data.slab,
      type:data.type,
      user:data.name,
      loc:data.location,
      team:data.vendor,
      status:data.status,
      remarks:data.remarks,
      subloc:data.subLocation

    })
    toast.info(`Edit user ${data.name}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }else{
      toast.error('You do not have permission to edit', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
      
  }

  const { toPDF, targetRef } = usePDF({
    filename: "im-sheet.pdf",
    page: { margin: Margin.MEDIUM },
  });


  // json to excel
  const downloadExcel = (data) => {
    if(isVerified){
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "im-datasheet.xlsx");
      toast.success('Downloaded Success!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }else{
      toast.error("You don't have permission to downlaod as excel sheet", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  const handleAddManually = () =>{
    toast.info("This feature is coming soon.", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  }


  useEffect(()=>{
    const userInfo = JSON.parse(localStorage?.getItem('userProfile'))
    if(userInfo){
      setIsVerified(userInfo.user.isVerified);
    }
  },[isVerified])



  return(
    <>

    {contextMenu.show && 
    <ContextMenu 
      contextRef={contextRef} 
      x={contextMenu.x} 
      y={contextMenu.y} 
      closeContextMenu={contextMenuClose}
      ticketNumber={contextTicket}
      serviceNowLink={`https://tatasteel.service-now.com/now/nav/ui/search/0f8b85d0c7922010099a308dc7c2606a/params/search-term/${contextTicket}/global-search-data-config-id/c861cea2c7022010099a308dc7c26041/back-button-label/Incident%20-%2005750836/search-context/now%2Fnav%2Fui`}
      openEditWindow={()=>editRowItem(ContextEditTicket)}
      deleteContextTicket={()=>deleteRowItem(contextTicket)}
    />}
    {
      isOpen ? 
      <ModelBox 
      ticketNo="Edit mode"
      tn={EditObject.tn}
      date={EditObject.date}
      age={EditObject.age}
      slab={EditObject.slab}
      type={EditObject.type}
      user={EditObject.user}
      loc={EditObject.loc}
      team={EditObject.team}
      status={EditObject.status}
      remarks={EditObject.remarks}
      subloc={EditObject.subloc}
      handleChange={({target}) => {
        const {value, name} = target;
        setEditObject({...EditObject, [name]:value});
        // console.log(EditObject)
      }}
      handleCancel={()=> setIsOpen(!isOpen)}
      handleSave={()=>{
        const targetTicket = tableData.filter(val => val.ticketNo === EditObject.tn);

        for(let i=0;i<tableData.length;i++){
          if(tableData[i].ticketNo === targetTicket[0].ticketNo){
            // console.log(tableData[i].ticketNo, targetTicket[0].ticketNo);
              tableData[i].status = EditObject.status;
              tableData[i].remarks = EditObject.remarks;
          }
        }
        localStorage.setItem('formateIncidentData',JSON.stringify(tableData));
        toast.success('Updated Successfully!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

          setIsOpen(false)

      }}
       /> : null
    }
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
  <div className='fixed_top_bar'>
    <Upload searchValue={search} method={handleSearch}/>

    <div className='flex flex-wrap justify-left items-center gap-4 font-bold uppercase ml-4'>
        {
          statusArr.length > 0 ? <p className='p-2 bg-purple-500 text-white rounded-sm'>Total : {tableData?.length} </p> : null
        }
        {
          statusArr?.map((name,i) =>{
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
        
          <button 
            onClick={toPDF}
            className=' outline-none flex border border-red-600 p-2 rounded-sm justify-center items-center gap-2'>
            <FaFilePdf/>
            PDF
          </button>    

          <button 
            onClick={()=>downloadExcel(tableData)}
            className=' outline-none flex border border-red-600 p-2 rounded-sm justify-center items-center gap-2'>
            <SiMicrosoftexcel/>
            EXCEL
          </button>   
        </div>
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
      <p className='text-slate-500'>--------- OR ---------</p>
      <button
      onClick={handleAddManually}
      className='bg-green-600 gap-2 flex justify-around items-center p-2 rounded-sm text-white hover:bg-blue-600'>
        <FaPlus className='text-xl'/> Add Manually</button>
      </div>:
      <TableContainer propsTable={targetRef}>
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
              }else if(dataField.subLocation.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.remarks.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }
            }).slice(0,page).map((dataField,index)=>{
              return(
                <TableBody
                style={ (dataField.age > 3 && dataField.status !=="Resolved" ? "bg-red-600 text-white" : ( dataField.status === "Resolved" ? "bg-green-600 text-white" : null)) }
                key={index}
                serialNumber={index+1}
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
                handleDelete={() =>deleteRowItem(dataField.ticketNo)}
                handleEdit={() =>editRowItem(dataField)} 
                handleContextMenu={(e) => {
                  e.preventDefault(); 
                  const {pageX, pageY} = e;
                  setContextMenu({show:true, x:pageX, y:pageY})
                  setContextTicket(dataField.ticketNo)
                  setContextEditTicket(dataField)
                }}
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