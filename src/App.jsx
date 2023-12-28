import React,{ useEffect,Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import Loader from './component/util/Loader';
const Settings = React.lazy(()=> import('./container/Settings'));
const Incident = React.lazy(()=> import('./container/Incident'));
const Alert = React.lazy(()=> import('./container/Alert'));
const Home = React.lazy(()=> import('./container/Home'));
const Navigation = React.lazy(()=> import('./component/Navigation/Navigation'))
const Report = React.lazy(()=> import('./container/Report'))
const Request = React.lazy(() => import('./container/Request'));


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
  

  return (
    <>
    <Suspense fallback={<Loader/>}>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/incident" element={<Incident />} />
      <Route path="/alert" element={<Alert />} />
      <Route path="/request" element={<Request />} />
      <Route path="/report" element={<Report />} />
      <Route path='/settings' element={<Settings/>} />

    </Routes>
    {/* <Author/> */}
    </Suspense>
    </>
  )
}

export default App
