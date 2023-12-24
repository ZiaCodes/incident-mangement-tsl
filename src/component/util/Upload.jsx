import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import * as XLSX from 'xlsx';
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoLogoTableau } from "react-icons/io5";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = (props) => {
    const [xlData , setXlData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            setXlData(result);
            setIsLoading(false);
           
        };
        reader.readAsArrayBuffer(oFile);
    }

    // loading data on click on local storage
    const UploadExcelData = () =>{
        setIsLoading(true);
        localStorage.setItem('XLDATA', JSON.stringify(xlData));
        setIsLoading(false);

        toast.success('Please refresh page!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });

        
       
    }

    

  return (
    <>
    <div className='flex flex-wrap justify-start items-center gap-2 m-4'>
        <input 
        className='bg-blue-800 h-10 text-white p-1 mt-4 rounded-sm '
        type="file" 
        accept=".xlsx,.xls"
        onInput={(e) => fileReader(e)}
        name="upload"
        />
        <button 
        type="submit"
        className='flex justify-center items-center gap-2 rounded-sm
        bg-blue-800 p-2 mt-4 h-10 text-white hover:bg-blue-500'
        onClick={UploadExcelData}
        >
        {
            isLoading ? <>
            <CgSpinnerTwoAlt className="animate-spin"/>
             Uploading ...
             </> : (<>
                <FaFileUpload/> Upload Data
             </>)
        }
        </button>



        <input 
        className="border border-blue-800 h-10 p-0.8 outline-none mt-4 p-2 rounded-sm" 
        placeholder='Type anything..'
        type="search" 
        name="search" 
        value={props.searchValue}
        onChange={props.method}
        />

    </div>
    {
        isLoading ? <div className="ml-4">
        <div className="flex gap-4 justify-start items-center text-blue-800">
        <SiMicrosoftexcel className="animate-pulse"/>
        <RiArrowRightDoubleFill className="animate-ping text-red-600"/>
        <IoLogoTableau className="animate-pulse text-blue-800"/>
        </div>
    </div> : null
    }

    </>
  )
}

export default Upload