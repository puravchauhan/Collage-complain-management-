import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './Component/Navbar.jsx'
import Home from './Page/Home.jsx'
import "bootstrap-icons/font/bootstrap-icons.css";


const router = createBrowserRouter([



  
      {
   path:"/",
   element:<><Navbar/><Home/></>
},
{
   path:"/home",
   element:<><Navbar/><Home/></>
},



]);
createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)









