import React, { useEffect, useState } from 'react'
import MainContainer from '../component/MainContainer'
import VendorCard from '../component/vendor/VendorCard';

const Report = () => {
  const [callData, setCallData] = useState([]);
  const [vendorName, setVendorName] = useState([]);
  const [changeData, setChangeData] = useState(false)
  const [assignCalls,setAssignCalls] = useState([]);
  const [aboveLength, setAboveLength] = useState([7,9,3,1,19,1,0,0,2]);
  const [belowLength, setBelowLength] = useState([11,7,7,4,18,3,9,2,1]);
  const [openLength, setOpenLength] = useState([11,7,7,4,18,3,9,2,1]);
  const [closeLength, setCloseLength] = useState([11,7,7,4,18,3,9,2,1]);
  const [incidentLength, setIncidentLength] = useState([11,7,7,4,18,3,9,2,1]);
  const [alertLength, setAlertLength] = useState([11,7,7,4,18,3,9,2,1]);
  const [requestLength, setRequestLength] = useState([11,7,7,4,18,3,9,2,1]);

  function groupingVendor(){
    const vendorCallGroup = Object?.groupBy(callData, vData => vData.vendor);
    // setCallData(vendorCallGroup);
    // const ageSlab = Object?.groupBy(callData, vData => vData.slab);
    
    setVendorName(Object.keys(vendorCallGroup));
    let callArr = []
    callArr.push(vendorCallGroup.SKYLINK?.length);
    callArr.push(vendorCallGroup.EMBEE?.length);
    callArr.push(vendorCallGroup.TECHNET?.length);
    callArr.push(vendorCallGroup['NATH&SONS']?.length);
    callArr.push(vendorCallGroup.LASETEK?.length);
    callArr.push(vendorCallGroup.WIZER?.length);
    callArr.push(vendorCallGroup.DEBUG?.length);
    callArr.push(vendorCallGroup.ITSOL?.length);
    callArr.push(vendorCallGroup.MDSINHA?.length);
    setAssignCalls(callArr);
    
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
    <MainContainer>

      <div className='bg-lime-700 w-full h-96'>
      </div>
      <div className='h-screen w-screen flex justify-center items-center flex-wrap gap-14 p-10'>
        {
          vendorName.map((vendorDetails,i) =>{
            return(
              <VendorCard 
              key={i}
              liveStausStyle={vendorDetails !=="ITSOL" ? 'text-xl text-green-500 float-right animate-pulse' : "text-xl text-gray-500 float-right"}
              vendorName={vendorDetails}
              imgUrl={vendorDetails !=='TECHNET' ? "https://wizertech.com/wp-content/uploads/2020/09/Wizertech-Informatics-pvt-ltd-Logo.png" :
              "https://play-lh.googleusercontent.com/eQS5CYrK1oB4SSF3AuMO_wsVYwvR_NSM-rsvAwTXuc0mjaFC3fZYPRIPF2XJUehMtA=w240-h480-rw"}
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
  )
}

export default Report