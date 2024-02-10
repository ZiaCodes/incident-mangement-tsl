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
import TableHead from '../Table/TableHead';
import TableBody from '../Table/TableBody';
  
  
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
    const vendorParam = useParams()
    const {vendor} = vendorParam;

    const StatusData = [
        {
          name: "Resolved",
          status: 17,
          fill:'#008000'
        },
        {
          name: "Pending",
          status: 5,
          fill:'#ff0000'
        },
      ];

      const slabData = [
        {
          name: "Below 3",
          ageSlab: 17,
          fill:'#008000'
        },
        {
          name: "Above 3",
          ageSlab: 5,
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

  return (
    <>
    <MainContainer>
        <div className='flex justify-start font-bold items-left m-4'>
                <span className='font-bold text-white bg-red-600 p-2 rounded-sm'>
                    {vendor}
                </span>
                <span className='vendorToolTip'>
                    {tickets.length}
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
        <TableHead/>
        {
            tickets.map((dataField,index) =>{
                return (
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
                
              />
              )
            })
          } 
 
    </TableContainer>
    </div>
    </>
  )
}

export default Vendor