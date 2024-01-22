import TableContainer from './TableContainer'
import TableHead from './TableHead'
import TableBody from './TableBody'
import Instruction from '../util/Instruction'
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useCreateSingleTicket, useTicket } from '../../hooks'
import { useQuery } from '@tanstack/react-query'

const TableLayout = () => {

  const {getTicketDatas} = useTicket();
  const {createSingleTicket} = useCreateSingleTicket();

  const hanldeAddButton = async() =>{
    await createSingleTicket();

  }

  const { isPending, data, error } = useQuery({
    queryKey: ['myTableData'],
    queryFn: getTicketDatas,
    staleTime:10000
  })

  if(isPending){
    return <h1 style={{textAlign:'center'}}>Loading table.....</h1>
  }

  if(error){
    return <h1 style={{textAlign:'center'}}>Error Code : {error.message}</h1>
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
  
    {
      data?.length > 0 ?
      <>
      <div className='h-full flex justify-end mr-4'>
        <button 
        onClick={hanldeAddButton}
        className='flex justify-center items-center gap-1 bg-green-600 p-2 text-white rounded-sm cursor-pointer'>
        <MdAdd className='text-2xl'/> Add New Column
        </button>
      </div>
      <TableContainer>
        <TableHead/>
        {
          data.map((data)=>{
            return(
              <TableBody
                key={data._id}
                ticketNo={data.ticketNo}
                reportedDate={data.reportedOn} 
                age={data.age} 
                ageSlab={data.ageSlab} 
                type={data.ticketType} 
                userName={data.affectedUser} 
                location={data.baseLocation}
                subLocation={data.locationCode}
                vendor={data.team}
                status={data.myStatus}
                remarks={data.myRemarks}
              />
            )
          })
        }
      </TableContainer>
      </> :
      <Instruction handleAddManually={hanldeAddButton}/>
      
    }
    </>
  )
}


export default TableLayout