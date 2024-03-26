import React,{ useEffect,Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Loader from './component/util/Loader';
import { useState } from 'react';
import Login from './component/Auth/Login';

const Settings = React.lazy(()=> import('./container/Settings'));
const Home = React.lazy(()=> import('./container/Home'));
const Navigation = React.lazy(()=> import('./component/Navigation/Navigation'))
const Report = React.lazy(()=> import('./container/Report'))
const Vendor  =  React.lazy(()=> import('./component/vendor/Vendor'));
const TicketPage = React.lazy(()=> import('./component/Tickets/TicketPage'));
const NotFound =  React.lazy(()=> import('./component/util/NotFound'));
const UserProfile =  React.lazy(()=> import('./component/User/UserProfile'));
const AdminPage = React.lazy(()=> import('./component/Auth/AdminPage'));
const WatchList = React.lazy(()=> import('./container/WatchList'));
const UserList = React.lazy(()=> import('./component/Auth/UserList'));

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage?.getItem('userProfile')));
  
  const getTheme = () =>{
    const localTheme = localStorage?.getItem('theme');
    if(localTheme){
      document.documentElement.classList.add(localTheme)
    }
  }

  useEffect(()=>{
    getTheme();
  },[])

  
  const navigate = useNavigate();
  
    useEffect(()=>{
      let Jwt = JSON.parse(localStorage?.getItem('userProfile'));
      if(Jwt?.user){
        setUser(Jwt.user);
      }

      if(!Jwt?.user?.jwtToken){
          navigate('/auth/login',{replace:true});
        }
    },[])


  useEffect(()=>{
    const isModeExist = localStorage?.getItem('m_mode');
    const localMenuStyle = localStorage?.getItem('navigationStyle');
    if(!localMenuStyle){
      localStorage.setItem('navigationStyle','Simple');
    }
    if(!isModeExist){
      localStorage.setItem('m_mode','Incident');
    }
  },[])



  return (
    <>
    <ToastContainer 
      position="top-right"
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
    <Navigation/>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="ticket/:ticket" element={<TicketPage />} />
      <Route path='/watchlist' element={<WatchList/>} />
      <Route path="/report" element={<Report />} />
      <Route path='team/:vendor' element={<Vendor />} />
      <Route path='/settings' element={<Settings/>} />
      <Route path='settings/:userId' element={<UserProfile/>} />
      <Route path='settings/admin-page' element={<AdminPage/>} />
      <Route path='/settings/admin-page/all-user' element={<UserList/>} />
      <Route path='auth/login' element={<Login/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </Suspense>
    </>
  )
}

export default App
