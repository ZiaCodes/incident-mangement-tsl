import TableContainer from './TableContainer'
import TableHead from './TableHead'
import TableBody from './TableBody'
import Instruction from '../util/Instruction'

import { ToastContainer, toast } from 'react-toastify';
import { useTicket } from '../../hooks'
import { useQuery } from '@tanstack/react-query'

const TableLayout = () => {

  const {getTicketDatas} = useTicket();

  const hanldeAddButton = () =>{
    alert("under developement")
  }

  const { isPending, data, error } = useQuery({
    queryKey: ['myTableData'],
    queryFn: getTicketDatas,
    staleTime:10000
  })

  if(isPending){
    return <h1>Loading table.....</h1>
  }

  if(error){
    return <h1>There is an error == {error.message}</h1>
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
      </TableContainer> :
      <Instruction handleAddManually={hanldeAddButton}/>
      
    }
    </>
  )
}


export default TableLayout