import React, { useEffect, useState } from 'react'
import MainContainer from '../Wrapper/MainContainer'
import { useParams } from 'react-router-dom'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
import TableContainer from '../Table/TableContainer';
import {VendorTableHead} from '../Table/TableHead';
import { VendorTableBody } from '../Table/TableBody';
import useDocumentTitle from '../../hooks/useDocumentTitle';

  
  const getIntroOfPage = (label) => {
    if (label === "Resolved") {
      return "Calls which are resolved";
    }
    if (label === "Pending") {
      return "Calls which are not resolved";
    }

    if (label === "Below 3") {
        return "Age Less than 3 days";
    }
    if (label === "Above 3") {
        return "Age greater than 3 days";
    }
    return "";
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
        </div>
      );
    }
  
    return null;
  };

const Vendor = () => {

    const [tickets,setTickets] = useState([]);
    const [aboveLength, setAboveLength] = useState(0);
    const [belowLength, setBelowLength] = useState(0);
    const [openLength, setOpenLength] = useState(0);
    const [closeLength, setCloseLength] = useState(0);
    const vendorParam = useParams()
    const {vendor} = vendorParam;

    useDocumentTitle(`Vendor Page : ${vendor}`)
    const StatusData = [
        {
          name: "Resolved",
          status: closeLength,
          fill:'#008000'
        },
        {
          name: "Pending",
          status: openLength,
          fill:'#ff0000'
        },
      ];

      const slabData = [
        {
          name: "Below 3",
          ageSlab: belowLength,
          fill:'#008000'
        },
        {
          name: "Above 3",
          ageSlab: aboveLength,
          fill:'#ff0000'
        },
      ];

    const getVendorData = () =>{
        const vendorData = JSON.parse(localStorage?.getItem(vendor))
        setTickets(vendorData);
    }
    useEffect(()=>{
        getVendorData();
    },[])


    const tciketStatusData = () =>{
      let open = 0;
      let close = 0;
      let abv =0;
      let blw = 0;

      for(let i=0;i<tickets?.length;i++){
        if(tickets[i].status != 'Resolved'){
          open++;
        }else{
          close++;
        }

        if(tickets[i].age > 3){
          abv++;
        }else{
          blw++;
        }
      }

      setOpenLength(open);
      setCloseLength(close);
      setAboveLength(abv);
      setBelowLength(blw)
      
    }

    useEffect(()=>{
      tciketStatusData();
    },[tickets])

  return (
    <>
    <MainContainer>
        <div className='flex justify-start font-bold items-left m-4'>
                <span className='font-bold text-white bg-red-600 p-2 rounded-sm'>
                    {vendor}
                </span>
                <span className='vendorToolTip'>
                    {tickets?.length}
                </span>

        </div>

        <div className='lg:flex-nowrap flex-wrap w-full h-96 gap-8 flex p-12 justify-center items-center '>
      <ResponsiveContainer  >
      <BarChart
          width={500}
          height={300}
          data={StatusData}
          key={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="status" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width='100%' height='100%'>
      <BarChart
          width={100}
          height={200}
          data={slabData}
          key={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="ageSlab" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </MainContainer>

    <div className='lg:mt-10 mt-80'>
    <TableContainer>
        <VendorTableHead/>
        {
            tickets?.map((dataField,index) =>{
                return (
                    <VendorTableBody
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
                status={dataField.status}
                remarks={dataField.remarks}
                
              />
              )
            })
          } 
 
    </TableContainer>
    </div>

    <div className='invisible mb-20'>
      Hello world
    </div>
    </>
  )
}

export default Vendor