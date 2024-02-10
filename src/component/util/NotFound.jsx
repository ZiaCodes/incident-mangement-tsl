import React from 'react'
import MainContainer from '../Wrapper/MainContainer'
import { MdError } from 'react-icons/md'

const NotFound = () => {
  return (
    <MainContainer>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',height:'100vh',gap:'10px'}}>
            <MdError/>
            <h4>Page Not Found</h4>
        </div>
    </MainContainer>
  )
}

export default NotFound