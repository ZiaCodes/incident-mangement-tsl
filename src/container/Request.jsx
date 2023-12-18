import * as XLSX from 'xlsx';
import React, { useEffect, useState } from 'react'
import TableContainer from '../component/Table/TableContainer';
import Loader from '../component/Loader';
import Pagination from '../component/Pagination';
import FloatingBtn from '../component/FloatingBtn';
import { FaFileUpload } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { CgSpinnerTwoAlt } from "react-icons/cg";


const Request = () => {
  const [tableData , setTableData] = useState([]);
  const [page,setPage] = useState(10);
  const pageSet = [10,50,100,150,300,500];
  const [isloading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [chooseFile, setChooseFile] = useState("Choose a new file");

  const fileReader =(oEvent) => {
       
    setIsLoading(true);
    var oFile = oEvent.target.files[0];
    // var sFilename = oFile.name;

    var reader = new FileReader();
    // var result = {};

    reader.onload = function (e) {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, {type: 'array'});
        // console.log(workbook);
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
            if (roa.length) result[sheetName] = roa;
        });
        // see the result, caution: it works after reader event is done.
        // console.log(result.SR);
        setTableData(result?.SR);
        setIsLoading(false);
       
    };
    reader.readAsArrayBuffer(oFile);
}

  const uploadDaataIntoTable = () =>{
    // setIsLoading(true);
    setIsDataLoaded(true);
  }


  return(
    <>

    <div 
    className='flex justify-center items-center 
    mt-28 ml-4 bg-white shadow-md w-80 p-2'>
      <input 
      type="file" 
      name="uploadRequest"
      accept=".xlsx, .xls"
      onInput={(e) => fileReader(e)}
      className='request_upload'
      />
      <button 
        type="submit"
        className='flex justify-center items-center gap-2 rounded-sm
        bg-blue-800 p-4 text-white hover:bg-blue-500'
        onClick={uploadDaataIntoTable}
        >
        {
            isloading ? <>
            <CgSpinnerTwoAlt className="animate-spin"/>
             wait..
             </> : (<>
                <FaFileUpload/> Upload
             </>)
        }
        </button>
    </div>
    {
      !tableData?.length < 0 ? 
      <p className='flex  justify-center items-center gap-2 mt-40 text-xl font-bold '>
        <FcInfo className='text-2xl'/>
        Upload an Excel Data to get insight and visualization.
      </p>: 
      <TableContainer>
      {
        isDataLoaded ?
        <>
          {
            tableData?.slice(0,page).map((val,i) =>{
              return(
                <tbody key={i}>
                  <tr className={i===0 ? 'bg-blue-600 text-white uppercase font-bold tracking-wide' : ((i>1 && i<5)  ? "bg-red-600 text-white" : (i>6 && i<9 ? 'bg-red-600 text-white' : (i>10 && i<14) ? 'bg-red-600 text-white' : (i===1 ? "bg-green-600 text-white" : (i>4 && i<7 ? "bg-green-600 text-white" : (i>8 && i<11 ? "bg-green-600 text-white" : (i>13 && i<23 ? "bg-green-600 text-white" : null))) )) )} >
                    {
                      val.map((data,j)=>{
                       return(
                        <td key={j} className="whitespace-nowrap px-6 py-4" >
                          {data}
                        </td>
                       ) 
                      })
                    }
                  </tr>
                </tbody>
              )
            })
          }
        </> : null
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

export default Request