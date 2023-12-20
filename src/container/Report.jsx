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
  PieChart, 
  Pie, 
  Legend, 
  Tooltip, 
  ResponsiveContainer,
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid } from 'recharts';

const data = [
  { name: 'Embee', value: 400 },
  { name: 'Wizer', value: 300 },
  { name: 'SkyLink', value: 300 },
  { name: 'LASETEK', value: 200 },
  { name: 'TECHNET', value: 278 },
  { name: 'DEBUG', value: 189 },
  { name: 'IT SoL', value: 189 },
  { name: 'MDSINHA', value: 189 },
  { name: 'NATH&SONS', value: 189 }
];


const dataBarChart = [
  {
    name: 'Pending',
    CallLogs: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Resolved',
    CallLogs: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Convert to SR',
    CallLogs: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'AP required',
    CallLogs: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Transfer',
    CallLogs: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'New Assignment',
    CallLogs: 2390,
    pv: 3800,
    amt: 2500,
  },
];


const getIntroOfPage = (label) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};


const Report = () => {
  const [callData, setCallData] = useState([]);
  const [vendorName, setVendorName] = useState([]);
  const [changeData, setChangeData] = useState(false)
  const [assignCalls,setAssignCalls] = useState([]);
  const [aboveLength, setAboveLength] = useState([]);
  const [belowLength, setBelowLength] = useState([]);
  const [openLength, setOpenLength] = useState([]);
  const [closeLength, setCloseLength] = useState([]);
  const [incidentLength, setIncidentLength] = useState([]);
  const [alertLength, setAlertLength] = useState([]);
  const [requestLength, setRequestLength] = useState([]);

  
  function groupingVendor(){
    const vendorCallGroup = Object?.groupBy(callData, vData => vData.vendor);
    // setCallData(vendorCallGroup);
    // const ageSlab = Object?.groupBy(callData, vData => vData.slab);
    
    setVendorName(Object.keys(vendorCallGroup));
    // console.log(vendorCallGroup)
    let callArr = []
    callArr.push(vendorCallGroup.SKYLINK?.length);
    callArr.push(vendorCallGroup.EMBEE?.length);
    callArr.push(vendorCallGroup.TECHNET?.length);
    callArr.push(vendorCallGroup['NATH&SONS']?.length);
    callArr.push(vendorCallGroup.LASETEK?.length);
    callArr.push(vendorCallGroup.WIZER?.length);
    callArr.push(vendorCallGroup.DEBUG?.length);
    callArr.push(vendorCallGroup?.ITSOL?.length);
    callArr.push(vendorCallGroup.MDSINHA?.length);
    setAssignCalls(callArr.filter(Boolean));
    
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
  },[changeData])


  return (
    <>
    <MainContainer>

      <div className=' w-full h-96 gap-8 flex p-12 justify-center items-center mb-4 '>
      <ResponsiveContainer  >
        <PieChart width={500} height={500}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill='#3d43ff'
            label
          />
          <Tooltip />
        </PieChart>
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
          <Bar dataKey="CallLogs" barSize={20} fill="#8884d8" />
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
              total={assignCalls[i]}
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