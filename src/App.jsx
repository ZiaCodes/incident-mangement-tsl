import React,{ useEffect,Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Loader from './component/util/Loader';
import Login from './component/Auth/Login';
const Settings = React.lazy(()=> import('./container/Settings'));
const Incident = React.lazy(()=> import('./container/Incident'));
const Alert = React.lazy(()=> import('./container/Alert'));
const Home = React.lazy(()=> import('./container/Home'));
const Navigation = React.lazy(()=> import('./component/Navigation/Navigation'))
const Report = React.lazy(()=> import('./container/Report'))
const Request = React.lazy(() => import('./container/Request'));
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const navigate = useNavigate();
  const getTheme = () =>{
      const localTheme = localStorage?.getItem('theme');
      if(localTheme){
        document.documentElement.classList.add(localTheme)
      }
    }

    useEffect(()=>{
      getTheme();
    })

    useEffect(()=>{
      let Jwt = JSON.parse(localStorage.getItem('userProfile'));
      if(!Jwt?.jwtToken){
          navigate('/login');
        }
    },[])
  

  return (
    <>
    <Navigation/>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/incident" element={<Incident />} />
      <Route path="/alert" element={<Alert />} />
      <Route path="/request" element={<Request />} />
      <Route path="/report" element={<Report />} />
      <Route path='/settings' element={<Settings/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </Suspense>
    </>
  )
}

export default App
