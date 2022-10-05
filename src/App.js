import Footer from 'component/Footer/Footer';
import Header from 'component/Header/Header';
import { Routes, Route, Outlet } from 'react-router-dom'

import Home from "./modules/Home/pages/Home";

function BasicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<BasicLayout />}>
          <Route index element = {<Home/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
