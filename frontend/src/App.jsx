import React from 'react'
import './App.css';

import { BrowserRouter, Route, Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Component/Navbar';
import Home from './Page/Home';


function App() {
  return(
 <>
 
 <Navbar/>
 <Home/>
    </>
  );
}

export default App
