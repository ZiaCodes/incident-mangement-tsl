import React, { useEffect, useState } from 'react'
import MainContainer from '../component/MainContainer'
import VendorCard from '../component/vendor/VendorCard';

import Skylink from '../assets/skylink.png'
import Wizer from '../assets/wizer.png'
import Lasetek from '../assets/lasetek.jpg'
import Technet from '../assets/technet.webp'
import Embee from '../assets/embee.png'
import Debug from '../assets/debug.png'
import Others from '../assets/others.png'

import { 
  Legend, 
  Tooltip, 
  ResponsiveContainer,
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid } from 'recharts';


const getIntroOfPage = (label) => {
  if (label === 'Above 3') {
    return "More than 3 days";
  }
  if (label === 'Below 3') {
    return "Less than 3 days";
  }
  if (label === 'Pending') {
    return "Calls which is not resolved";
  }
  if (label === 'Close') {
    return "Calls which are resolved";
  }
  if (label === 'AR') {
    return "Access point Requirement";
  }
  if (label === 'Transfer') {
    return "Need to transfer to another team";
  }
  if (label === 'WIP') {
    return "Work in progress";
  }
  if (label === 'New') {
    return "New Assignments";
  }
  if (label === 'Reopen') {
    return "Calls which are open again";
  }
  
  return '';
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


const Report = () => {
  const [callData, setCallData] = useState([]);
  const [vendorName, setVendorName] = useState([]);
  const [changeData, setChangeData] = useState(false)
  const [aboveLength, setAboveLength] = useState([]);
  const [belowLength, setBelowLength] = useState([]);
  const [openLength, setOpenLength] = useState([]);
  const [closeLength, setCloseLength] = useState([]);
  const [incidentLength, setIncidentLength] = useState([]);
  const [alertLength, setAlertLength] = useState([]);
  const [requestLength, setRequestLength] = useState([]);

  const dataBarChart = [
    {
      name: 'Above 3',
      'Age slab': aboveLength.reduce((partialSum, a) => partialSum + a, 0),
      pv: 2400,
      amt: 2400,
      fill:'#ff0000'
    },
    {
      name: 'Below 3',
      'Age slab': belowLength.reduce((partialSum, a) => partialSum + a, 0),
      pv: 1398,
      amt: 2210,
      fill:'#008000'
    }
  ];


  const statusBarChart = [
    {
      name: 'Pending',
      'Call status': openLength.reduce((partialSum, a) => partialSum + a, 0),
      pv: 2400,
      amt: 2400,
      fill:'#ff0000'
    },
    {
      name: 'Close',
      'Call status': closeLength.reduce((partialSum, a) => partialSum + a, 0),
      pv: 1398,
      amt: 2210,
      fill:'#008000'
    },
    {
      name: 'AR',
      'Call status': 5,
      pv: 1398,
      amt: 2210,
      fill:'#004cff'
    },
    {
      name: 'Transfer',
      'Call status': 3,
      pv: 1398,
      amt: 2210,
      fill:'#ff00d0'
    },
    {
      name: 'WIP',
      'Call status': 11,
      pv: 1398,
      amt: 2210,
      fill:'#00ff84'
    },
    {
      name: 'New',
      'Call status': 19,
      pv: 1398,
      amt: 2210,
      fill:'#ff001e'
    },
    {
      name: 'Reopen',
      'Call status': 1,
      pv: 1398,
      amt: 2210,
      fill:'#bb00ff'
    }
  ]
  const opneTicket = () =>{
    // console.log(callData)
    let open = [];
    let close = [];
    let incident = [];
    let alert = [];
    let request = [];
    let above = [];
    let below = [];
    let length = [];
    const vendors = Object?.groupBy(callData, vData => vData.vendor);
    const nwArr = Object.values(vendors);
    

    for(let i=0;i<nwArr?.length;i++){
      let opn =0;
      let cls=0;
      let inc =0;
      let alt=0;
      let req=0;
      let abv =0;
      let blw =0;
      let len =0;
      for(let j=0;j<nwArr[i]?.length;j++){
        if(nwArr[i][j]?.status !=='Resolved'){
          opn++;
        }else{
          cls++;
        }
        if(nwArr[i][j]?.type === 'Incident'){
          inc++;
        }else if(nwArr[i][j]?.type === 'Alert'){
          alt++;
        }else{
          req++;
        }

        if(nwArr[i][j]?.slab === 'Below 3'){
          blw++;
        }else{
          abv++;
        }

      }
      open.push(opn);
      close.push(cls);
      incident.push(inc);
      alert.push(alt);
      request.push(req);
      above.push(abv);
      below.push(blw);
      length.push(len);

    }
    setOpenLength(open);
    setCloseLength(close);
    setIncidentLength(incident);
    setAlertLength(alert);
    setAboveLength(above);
    setBelowLength(below);
    setRequestLength(request);

  }

  
  function groupingVendor(){
    const vendorCallGroup = Object?.groupBy(callData, vData => vData.vendor);
    setVendorName(Object.keys(vendorCallGroup));
    
  }
  useEffect(()=>{
    const localTableData = JSON.parse(localStorage.getItem('formateIncidentData'));
    if(localTableData){
      setCallData(localTableData);
      setChangeData(!changeData)
    }
  },[])

  useEffect(()=>{
    groupingVendor();
    opneTicket();
  },[changeData])


  return (
    <>
    <MainContainer>

      <div className=' bg-white w-full h-96 gap-8 flex p-12 justify-center items-center mb-4 '>
      <ResponsiveContainer  >
      <BarChart
          width={500}
          height={300}
          data={statusBarChart}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Call status" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer>
      <BarChart
          width={100}
          height={300}
          data={dataBarChart}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Age slab" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className='h-screen w-screen flex justify-center items-center flex-wrap gap-14 p-10'>
        {
          vendorName.map((vendorDetails,i) =>{
            return(
              <VendorCard 
              key={i}
              liveStausStyle={vendorDetails !=="ITSOL" ? 'text-xl text-green-500 float-right animate-pulse' : "text-xl text-gray-500 float-right"}
              vendorName={vendorDetails}
              imgUrl={vendorDetails ==='TECHNET' ? Technet :
              (vendorDetails==='WIZER' ? Wizer :
              (vendorDetails === 'EMBEE' ? Embee :
              (vendorDetails === 'SKYLINK' ? Skylink : (
                vendorDetails === 'LASETEK' ? Lasetek : (
                  vendorDetails === 'DEBUG' ? Debug : Others
                )
              ))) )}
              total={openLength[i]+closeLength[i]}
              openCall={openLength[i]}
              closedCall={closeLength[i]}
              incidentCall={incidentLength[i]}
              alertCall={alertLength[i]}
              requestCall={requestLength[i]}
              above={aboveLength[i]}
              below={belowLength[i]}
              />
            )
            
          })
        }
      </div>

    </MainContainer>
  </>
  )
}

export default Report