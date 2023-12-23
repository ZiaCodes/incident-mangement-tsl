import React,{Suspense} from 'react';
// import Upload from '../component/Upload';
import Loader from '../component/Loader';
import MainContainer from '../component/MainContainer';
const TableLayout = React.lazy(() => import('../component/Table/TableLayout'));


const Home = () => {
  return (
    <Suspense fallback={<Loader/>}>
    <MainContainer>
      <TableLayout/>
    </MainContainer>
    </Suspense>
  )
}

export default Home