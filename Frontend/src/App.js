
import './App.css';

import {Route, Routes } from 'react-router-dom';

import Footer from './Componnent/Footer';
import Phone from './Componnent/Product';
import Phones from './Componnent/Products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Phones/>}></Route>
        <Route path='phone/:id' element={<Phone/>}></Route>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
