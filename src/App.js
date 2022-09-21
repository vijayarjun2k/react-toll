import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { AdminLogin } from './components/AdminLogin';
import { AddVehicle } from './components/AddVehicle';
import { AddNewtoll } from './components/AddNewtoll';
import { Home } from './components/Home';
import ErrorPage from './ErrorPage';
import { AboutPage } from './components/AboutPage';
import { ViewAlltolls } from './components/ViewAlltolls';
import PrivateRoutes from './PrivateRoutes';


function App() {
  return (
    
    <div className="App">
      <Router>
        <Routes>
          <Route path="/addentry" element={<AddVehicle/>} />
          
          <Route path="/admin" element={<AdminLogin/>} />
          <Route element={<PrivateRoutes/>}>
          <Route path="/addtoll" element={<AddNewtoll/>} />
          </Route>
          <Route exact path="/viewalltoll" element={<ViewAlltolls/>} />
          <Route exact path="/about" element={<AboutPage/>} />
          <Route exact path="/" element={<Home/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>  
      </Router>
    </div>
        
  );
}

export default App;
