import React,{Suspense} from 'react';
// import Upload from '../component/Upload';
import Loader from '../component/Loader';
import MainContainer from '../component/MainContainer';
const TableLayout = React.lazy(() => import('../component/Table/TableLayout'));


const Home = () => {
  return (
    <MainContainer>
      <Suspense fallback={<Loader/>}>
      <TableLayout/>
    </Suspense>
    </MainContainer>
  )
}

export default Home