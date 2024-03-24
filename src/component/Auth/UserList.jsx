import React from 'react'
import { GiElectric } from "react-icons/gi";
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { MdNotificationsActive } from 'react-icons/md';
// import { GiElectric } from "react-icons/gi";

const UserList = ({allUserData,onClick}) => {
    
  return (
    <section className="relative mt-20 ">
        <div className="box" id="box">
            <p className='text-center p-2'>All Users</p>
            {
                allUserData.length > 0 ? allUserData.map((userData) =>{
                    return(
                        <div key={userData._id} className="list">
                            <div className="imgbox">
                                <img 
                                    src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${userData.name}`}
                                    alt="img"
                                />
                            </div>
                                <div className="content">
                                    <h2 
                                        onClick={onClick}
                                        className="rank">
                                        <small>
                                            <MdNotificationsActive/>
                                        </small>
                                    </h2>
                                    <h4 className='flex gap-0.5 justify-center items-start'>
                                        {userData.name} { userData.isOnline ? <GiElectric className="text-red-600 text-xs animate-pulse"/> : null }
                                    </h4>
                                    <p className='supporting-text'>{userData.email}</p>
                                    <p className='supporting-text'>{userData.company}</p>
                                    <p className='supporting-text'>{userData.role}</p>
                                    
                                </div>
                        </div>
                    )
                }) : 
                <div  className='flex justify-center items-center gap-2 mt-10'>
                    <CgSpinnerTwoAlt className='animate-spin text-4xl'/> Please wait ..
                </div>
            }
        </div>
    </section>
  )
}

export default UserList