import {Routes, Route} from 'react-router-dom'

import Home from "./modules/Home/pages/Home";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
