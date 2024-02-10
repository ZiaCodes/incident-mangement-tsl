import React from 'react'
import MainContainer from '../Wrapper/MainContainer'
import { useParams } from 'react-router-dom';

const TicketPage = () => {
    const vendorParam = useParams()
    const {ticket} = vendorParam;
  return (
    <MainContainer>
        {ticket}
    </MainContainer>
  )
}

export default TicketPage