import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './Component/Navbar.jsx'
import Home from './Page/Home.jsx'
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from './Component/Footer.jsx'
import Categories from './Page/Categories.jsx'
import Register from './Page/Register.jsx'
import Login from './Page/Login.jsx'
import Track from './Page/Track.jsx'
import About from './Page/About.jsx'

const router = createBrowserRouter([



  
      {
   path:"/",
   element:<><Navbar/><Home/></>
},
{
   path:"/home",
   element:<><Navbar/><Home/></>
},
 {
    path:"/categories",
    element:<> <Navbar/> <Categories/></> 
  },
  {
    path:"/register",
    element:<><Register/></> 
  },
{
    path:"/login",
    element:<><Login/></> 
  },
{
    path:"/track",
    element:<> <Navbar/> <Track/></> 
  },
{
    path:"/about",
    element:<> <Navbar/> <About/></> 
  },


]);
createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)









