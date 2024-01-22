import { createContext, useState } from "react";
import { createTicket } from "../apis/tickets"; 

export const CreateSingleTicketContext = createContext();


const CreateTicketProvider = ({children}) => {
  const [ticketInfo, setTicketInfo] = useState({
    ticketNo: 1232545,
    reportedOn: new Date(),
    age:"0",
    ageSlab:"Below 3",
    status:"In progress",
    ticketType:"Incident",
    affectedUser:"Itsnetworkteam",
    ticketDetails:"this is ticket details",
    ticketSummary:"this is ticket summary",
    workNotes:"this is workNotes",
    commentsWorkNotes:"This is commentsWorkNotes",
    baseLocation:"Jamshedpur",
    locationCode:"JSR",
    team:"TSL vendor",
    myStatus:"In progress",
    myRemarks:"Closer on 3rd Jan,24"
  })

    const createSingleTicket = async() =>{
        const data = await createTicket(ticketInfo);
        console.log(data)
    }
  return (
    <CreateSingleTicketContext.Provider value={{createSingleTicket}}>
        {children}
    </CreateSingleTicketContext.Provider>
  )
}

export default CreateTicketProvider