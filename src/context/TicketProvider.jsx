import { createContext, useEffect, useState } from "react";
import { getAllTickets } from "../apis/tickets";

export const TicketContext = createContext();


const TicketProvider = ({children}) => {

    const getTicketDatas = async() =>{
        const data = await getAllTickets();
        return data.result;
    }
  return (
    <TicketContext.Provider value={{getTicketDatas}}>
        {children}
    </TicketContext.Provider>
  )
}

export default TicketProvider