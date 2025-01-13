import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BasicLayout from './Components/Layouts/BasicLayout';
import DashboardLayout from './Components/Layouts/DashboardLayout';
import Home from './Components/BasicLayoutComponents/HomePage/Home';
import DataProvider from './Components/ContexApi/DataProvider';
import { ToastContainer } from 'react-toastify';
import SignUp from './Components/SignIn&SignUp/SignUp';
import SignIn from './Components/SignIn&SignUp/SignIn';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: <SignUp/>
      },
      {
        path: "/login",
        element: <SignIn/>
      }
    ]
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {}
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
    <ToastContainer />
      <RouterProvider router={router} />
    </DataProvider>
  </StrictMode>,
)
