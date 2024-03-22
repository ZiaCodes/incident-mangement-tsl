import React,{ useEffect,Suspense, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Loader from './component/util/Loader';
import Login from './component/Auth/Login';
const Settings = React.lazy(()=> import('./container/Settings'));
const Home = React.lazy(()=> import('./container/Home'));
const Navigation = React.lazy(()=> import('./component/Navigation/Navigation'))
const Report = React.lazy(()=> import('./container/Report'))
import 'react-toastify/dist/ReactToastify.css';
import Vendor from './component/vendor/Vendor';
import TicketPage from './component/Tickets/TicketPage';
import NotFound from './component/util/NotFound';
import UserProfile from './component/User/UserProfile';
import AdminPage from './component/Auth/AdminPage';
import { ToastContainer } from 'react-toastify';
import WatchList from './container/WatchList';


function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(true);


  const checkForInactivity = () =>{
    const expireTime = localStorage.getItem('expireTime');

    if(expireTime < Date.now()){
      console.log("log out");
      setIsLoggedIn(false);
    }
  }

  const updateExpireTime = () =>{
    const expireTime = Date.now() + 50000;

    localStorage.setItem('expireTime',expireTime);
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      checkForInactivity();
    },50000);

    return () => clearInterval(interval);
  },[])

  useEffect(()=>{
    // set initial expireTime
    updateExpireTime();

    // set event listners
    window.addEventListener('click',updateExpireTime);
    window.addEventListener('keypress',updateExpireTime);
    window.addEventListener('scroll',updateExpireTime);
    window.addEventListener('mousemove',updateExpireTime);
    window.addEventListener('wheel',updateExpireTime);

    // clean up
    return () =>{
      window.addEventListener('click',updateExpireTime);
      window.addEventListener('keypress',updateExpireTime);
      window.addEventListener('scroll',updateExpireTime);
      window.addEventListener('mousemove',updateExpireTime);
      window.addEventListener('wheel',updateExpireTime);
    }
  },[])

  
  const getTheme = () =>{
    const localTheme = localStorage?.getItem('theme');
    if(localTheme){
      document.documentElement.classList.add(localTheme)
    }
  }

  useEffect(()=>{
    getTheme();
  })

  
  const navigate = useNavigate();
  
    useEffect(()=>{
      let Jwt = JSON.parse(localStorage.getItem('userProfile'));
      if(!Jwt?.jwtToken){
          navigate('/login');
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
    <Navigation/>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="ticket/:ticket" element={<TicketPage />} />
      <Route path='/watchlist' element={<WatchList/>} />
      <Route path="/report" element={<Report />} />
      <Route path='/:vendor' element={<Vendor />} />
      <Route path='/settings' element={<Settings/>} />
      <Route path='settings/:userId' element={<UserProfile/>} />
      <Route path='settings/admin-page' element={<AdminPage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </Suspense>
    </>
  )
}

export default App
