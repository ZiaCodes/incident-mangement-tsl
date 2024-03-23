import { PiLockKeyOpenFill } from "react-icons/pi";
import { MdAssignment } from "react-icons/md";
import { TiLockClosed } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa6";
import { MdOutlineWatchOff } from "react-icons/md";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const VendorCard = (props) => {
  return (
    <div 
      className='bg-white border border-slate-100 shadow-md overflow-y-auto h-auto w-80 rounded-sm p-4 hover:shadow-lg '>
          <GoDotFill className={props.liveStausStyle}/>
          <div className='flex justify-center items-center flex-col mb-4'>
          {/* <img 
          src={props.imgUrl}
          className='object-fill w-20 h-20'
           alt="logo" /> */}
          <Link className="shadow-none" to={`/team/${props.vendorName}`}>
            <h1 className='text-xl font-bold text-center m-2 text-black'>{props.vendorName}</h1>
          </Link>
          </div>
          <div className='report_vendor_card'>
            <p  className='bg-orange-600 text-white'>
              <MdAssignment/>
              Total : {props.total}
            </p>
            <p  className='bg-red-600 text-white'>
                 <PiLockKeyOpenFill/> Open : {props.openCall}</p>
            <p  className='bg-green-600 text-white'>
              <TiLockClosed/>
              Closed: {props.closedCall}</p>
            {localStorage?.getItem('m_mode') === 'Incident' ? <p className='bg-pink-500 text-white'>
              <MdOutlinePendingActions/>
              Incident: {props.incidentCall}</p> : null
              }
            <p className='bg-yellow-600 text-white'>
              <MdOutlineWatchOff/>
              Alert : {props.alertCall}</p>
              <p className='bg-purple-600 text-white'>
              <FaNetworkWired/>
              Request: {props.requestCall}</p>
              <p className='bg-slate-900 text-white'>
            <FaAnglesUp className='animate-pulse'/>
            Above-3: {props.above}</p>
            <p className='bg-orange-500 text-white'>
              <FaAnglesDown className='animate-pulse'/>
              Below-3: {props.below}</p>
          </div>
        </div>
  )
}

export default VendorCard