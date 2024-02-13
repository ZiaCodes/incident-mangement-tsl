import React,{ useEffect,Suspense } from 'react';
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


function App() {

  
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
      localStorage.setItem('navigationStyle','Menu');
    }
    if(!isModeExist){
      localStorage.setItem('m_mode','Incident');
    }
  },[])

  return (
    <>
    <Navigation/>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="ticket/:ticket" element={<TicketPage />} />
      <Route path="/report" element={<Report />} />
      <Route path='/:vendor' element={<Vendor />} />
      <Route path='/settings' element={<Settings/>} />
      <Route path='/login' element={<Login/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </Suspense>
    </>
  )
}

export default App
